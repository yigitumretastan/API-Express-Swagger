const mongoose = require('mongoose');
// const { v4: uuidv4 } = require('uuid');

const PostSchema = new mongoose.Schema({
    // id: {
    //     type: String,
    //     default: () => uuidv4(),  // Fonksiyonu çağırarak UUID oluşturulmasını sağlıyoruz
    //     unique: true
    // },
    name: {
        type: String,
        required: true,
        trim: true
    },
    url: {
        type: String,
        required: true,
        trim: true
    },
    date: {
        type: Date,
        default: new Date()
    }
});

module.exports = mongoose.model('post', PostSchema);
