const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Auth = require('../models/auth.js'); // Kullanıcı modeliniz

// Tüm Kullanıcıları Getirme (getUsers)
const getUser = async (req, res) => {
    try {
        // Tüm kullanıcıları şifre bilgisini hariç tutarak al
        const users = await Auth.find().select('-password');

        if (!users || users.length === 0) {
            return res.status(404).json({ message: 'Hiç kullanıcı bulunamadı!' });
        }

        res.status(200).json({
            status: 'OK',
            users
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Kullanıcılar getirilirken bir hata oluştu.' });
    }
};


// Kullanıcı Bilgisi Getirme id ile (getUserById)
const getUserById = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await Auth.findById(id);

        if (!user) {
            return res.status(404).json({ message: 'Kullanıcı bulunamadı!' });
        }

        res.status(200).json({
            status: 'OK',
            user
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Kullanıcı bilgileri getirilirken bir hata oluştu.' });
    }
};

// Kayıt Olma (register)
const registerUser = async (req, res) => {
    try {
        const { username, email, password, phone } = req.body;
        // E-posta kontrolü: Aynı e-posta adresi ile kayıt olup olmadığını kontrol et
        const userExist = await Auth.findOne({ email });
        if (userExist) {
            return res.status(400).json({ message: 'Bu e-posta adresi zaten kullanılıyor!' });
        }
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            return res.status(400).json({ message: 'Geçerli bir e-posta adresi giriniz!' });
        }
        if (!password || password.length < 6) {
            return res.status(400).json({ message: 'Parolanız 6 karakterden kısa olamaz!' });
        }
        if (!/[A-Z]/.test(password)) {
            return res.status(400).json({ message: 'Parolanız en az bir büyük harf içermelidir!' });
        }
        if (!/[!@#$%^&*-_(),.?":{}|<>]/.test(password)) {
            return res.status(400).json({ message: 'Parolanız en az bir özel karakter içermelidir!' });
        }
        //  Parolayı hash'leme
        const hashedPassword = await bcrypt.hash(password, 5);

        // Yeni kullanıcıyı veritabanına ekle
        const newUser = await Auth.create({ username, email, password: hashedPassword, phone });

        // Kullanıcıya token oluştur
        const token = jwt.sign({ id: newUser._id }, process.env.SECRET_TOKEN, { expiresIn: '1h' });

        // Kullanıcıyı başarılı bir şekilde kaydettiğimizde kullanıcı ve token döner
        res.status(201).json({
            status: 'OK',
            user: newUser,
            token
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Bir hata oluştu.' });
    }
};

// Giriş Yapma (Login)
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        // E-posta kontrolü: Kullanıcı var mı diye kontrol et
        const user = await Auth.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: 'Böyle bir kullanıcı bulunamadı!' });
        }

        // Parolayı kontrol et
        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if (!isPasswordCorrect) {
            return res.status(401).json({ message: 'Şifre yanlış!' });
        }

        // Kullanıcı doğrulandı, JWT token oluştur
        const token = jwt.sign({ id: user._id }, process.env.SECRET_TOKEN, { expiresIn: '1h' });

        // Başarılı giriş durumunda kullanıcı ve token ile cevap ver
        res.status(200).json({
            status: 'OK',
            user,
            token
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Bir hata oluştu.' });
    }
};
// Kullanıcı Silme (deleteUser) - Sadece ID ile silme
const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        
        // ID kontrolü
        if (!id || !id.match(/^[0-9a-fA-F]{24}$/)) {
            return res.status(400).json({
                status: 'error',
                message: 'Geçersiz kullanıcı ID formatı.'
            });
        }

        // Kullanıcıyı ara
        const user = await Auth.findById(id);
        if (!user) {
            return res.status(404).json({
                status: 'error',
                message: 'Böyle bir kullanıcı bulunamadı!'
            });
        }

        // Kullanıcıyı doğrudan sil
        const deletedUser = await Auth.findByIdAndDelete(id);
        
        if (!deletedUser) {
            return res.status(500).json({
                status: 'error',
                message: 'Kullanıcı silinemedi.'
            });
        }

        // Session kısmını hata kontrolü ile yapın (eğer gerekiyorsa)
        if (req.session) {
            try {
                req.session.destroy();
            } catch (sessionError) {
                console.log("Session işlemi yapılamadı:", sessionError);
            }
        }

        // Başarılı silme durumunda mesaj ver
        res.status(200).json({
            status: 'success',
            message: 'Kullanıcı başarıyla silindi.'
        });
    } catch (error) {
        console.error("Silme hatası:", error);
        res.status(500).json({
            status: 'error',
            message: 'Kullanıcı silinirken bir hata oluştu: ' + error.message
        });
    }
};
module.exports = { getUser, getUserById, registerUser, loginUser, deleteUser };