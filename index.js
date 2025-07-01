    const express = require('express');
    const cors = require('cors');
    const dotenv = require('dotenv');
    const db = require('./config/database.js');
    const Auth = require('./routes/auth.js');
    const Post = require('./routes/post.js');
    const swaggerJsdoc = require('swagger-jsdoc');
    const swaggerUi = require('swagger-ui-express');

    const app = express();
    dotenv.config();
    const swaggerOptions = {
        definition: {
            openapi: '3.0.0',
            info: {
                title: 'MongoDB Express API',
                version: '1.0.0',
                description: 'MongoDB ile Express API Dokümantasyonu',
            },
            servers: [
                {
                    url: `http://localhost:${process.env.PORT || 8000}`,
                    description: 'Geliştirme sunucusu',
                },
            ],
            components: {
                securitySchemes: {
                    bearerAuth: {
                        type: 'http',
                        scheme: 'bearer',
                        bearerFormat: 'JWT',
                    },
                },
            },
            security: [
                {
                    bearerAuth: [],
                },
            ],
        },
        apis: ['./routes/*.js'],
    };

    const swaggerDocs = swaggerJsdoc(swaggerOptions);
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));





    app.use(cors());
    app.use(express.json({ limit: '30mb', extended: true }))
    app.use(express.urlencoded({ limit: '30mb', extended: true }))
    app.use('/', Auth)
    app.use('/', Post)

    //api get isteği 
    app.get('/', (req, res) => {
        res.json({
            message: "Hello World"
        })
    })

    const Port = process.env.PORT || 8000;

    app.listen(Port, () => {
        console.log("Server 8000'nci portta çalışıyor")
    })
    db() 