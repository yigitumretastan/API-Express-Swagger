# 📦 API Backend Projesi

Bu proje, **Express.js** tabanlı modüler bir **RESTful API** altyapısı sunar. Kullanıcı kimlik doğrulama (JWT), gönderi yönetimi (CRUD işlemleri) gibi temel işlevleri içerir. Veri saklama işlemleri **MongoDB** veritabanı kullanılarak gerçekleştirilir.

---

## 🚀 Temel Özellikler

- ✅ JWT ile kimlik doğrulama sistemi
- 📝 Gönderi (Post) işlemleri: oluşturma, okuma, güncelleme, silme (CRUD)
- 🧱 Katmanlı mimari: `config`, `controller`, `middleware`, `model`, `route`
- 🔐 Middleware ile erişim kontrolü
- 📁 `.env` ile yapılandırılabilir ortam değişkenleri
- 🌐 RESTful API prensiplerine uygun yapı

---

## 🗂️ Klasör Yapısı
```
API/
├── config/ # Veritabanı ayarları
│ └── database.js
├── controllers/ # İş mantığı (business logic)
│ ├── auth.js
│ └── post.js
├── middleware/ # Ara yazılımlar (middleware)
│ ├── auth.js
│ └── post.js
├── models/ # Mongoose veri modelleri
│ ├── auth.js
│ └── post.js
├── routes/ # API endpoint tanımları
│ ├── auth.js
│ └── post.js
├── .env # Ortam değişkenleri
├── index.js # Uygulama giriş noktası
├── package.json # Bağımlılıklar ve scriptler
└── readme.md # Proje açıklamaları

```
---

## 🧪 Kullanılan Teknolojiler

- **Node.js & Express.js** – Sunucu uygulama çatısı
- **MongoDB & Mongoose** – NoSQL veritabanı ve ODM katmanı
- **JWT (jsonwebtoken)** – Kullanıcı kimlik doğrulama
- **dotenv** – Ortam değişkenleri yönetimi
- **Nodemon** – Geliştirme ortamı için otomatik yeniden başlatma

---

## ⚙️ Kurulum ve Başlatma

### 1. Projeyi Klonlayın

```bash
git clone https://github.com/kullaniciAdi/proje-adi.git
cd proje-adi

2. Bağımlılıkları Yükleyin

npm install

3. .env Dosyasını Oluşturun

Aşağıdaki değişkenleri içeren bir .env dosyası oluşturun:

PORT=5000
MONGODB_URI=mongodb://localhost:27017/veritabani_adi
JWT_SECRET=guclu_bir_secret

4. Geliştirme Ortamında Başlatın

npm run dev

📬 API Endpointleri
🔐 Auth (Kimlik Doğrulama)
Yöntem	Endpoint	Açıklama
POST	/auth/register	Yeni kullanıcı kaydı
POST	/auth/login	Kullanıcı girişi
📝 Post (Gönderi İşlemleri)
Yöntem	Endpoint	Açıklama
POST	/post/	Yeni gönderi oluştur
GET	/post/	Tüm gönderileri getir
GET	/post/:id	Belirli gönderiyi getir
PUT	/post/:id	Gönderiyi güncelle
DELETE	/post/:id	Gönderiyi sil
🛡️ Middleware'lar

    auth.js – JWT doğrulama işlemleri

    post.js – Gönderi üzerinde yetki ve validasyon kontrolleri

📝 Lisans

Bu proje MIT lisansı ile açık kaynak olarak sunulmaktadır.
