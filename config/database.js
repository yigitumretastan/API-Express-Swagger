const mongoose = require('mongoose');
require("dotenv").config();
//data base bağlanma
const db = () => {
    const uri = process.env.Url;

    mongoose.connect(uri)

        .then(() => {
            console.log("MangoDB Bağladı");
        }).catch((err) => {
            console.log("MangoDB Bağlanmadı" + err.message);
        });
};

module.exports = db;
