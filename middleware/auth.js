require('dotenv').config();
const jwt = require('jsonwebtoken');

const auth = async (req, res, next) => {
    try {
        // Authorization header'dan token'ı alıyoruz
        const token = req.headers.authorization && req.headers.authorization.split(" ")[1];

        if (!token) {
            return res.status(403).json({ message: 'Token gereklidir!' });
        }

        // Token'ı doğruluyoruz
        const decodedData = jwt.verify(token, process.env.Secret_Token);
        req.userId = decodedData?.id; // Kullanıcının ID'sini request'e ekliyoruz

        next(); // Middleware'in bir sonraki aşamaya geçmesini sağlıyoruz
    } catch (error) {
        console.log(error);
        return res.status(401).json({ message: 'Geçersiz veya süresi dolmuş token.' });
    }
};

module.exports = auth;
