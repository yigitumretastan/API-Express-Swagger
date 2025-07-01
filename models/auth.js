const mongoose = require('mongoose')

// Veri tabanına saklanacak veri yapıları oluşturuluyor
const AuthSchema = new mongoose.Schema({
    username: {
        type: String,

    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    phone: {
        type: String
    },
    date: {
        type: Date,
        default: new Date()
    }
});

module.exports = mongoose.model('auth', AuthSchema);
