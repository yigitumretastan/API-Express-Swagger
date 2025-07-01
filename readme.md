from docx import Document
import os

# README içeriği
readme_content = """
# 📦 API Backend Projesi

Bu proje, Express.js tabanlı modüler bir RESTful API altyapısı sunar. Kullanıcı kimlik doğrulama (JWT), gönderi yönetimi (CRUD işlemleri) gibi temel işlevleri içerir. MongoDB veritabanı kullanılarak veri saklama işlemleri gerçekleştirilir.

## 🚀 Özellikler

- ✅ JWT ile kullanıcı kimlik doğrulama
- 📝 Gönderi (Post) işlemleri: oluşturma, görüntüleme, güncelleme, silme
- 🧱 Katmanlı mimari (config, controller, middleware, model, route)
- 🔐 Middleware ile erişim denetimi
- 📁 Ortam değişkenleriyle yapılandırılabilirlik
- 🌐 RESTful API prensipleri

## 🗂️ Klasör Yapısı

API/
├── config/            # Veritabanı ayarları
│   └── database.js
├── controllers/       # İş mantığı
│   ├── auth.js
│   └── post.js
├── middleware/        # Ara yazılımlar
│   ├── auth.js
│   └── post.js
├── models/            # Veritabanı şemaları
│   ├── auth.js
│   └── post.js
├── routes/            # API endpoint tanımları
│   ├── auth.js
│   └── post.js
├── .env               # Ortam değişkenleri
├── index.js           # Giriş noktası
├── package.json       # Bağımlılıklar ve scriptler
└── readme.md          # Proje açıklamaları

## 🧪 Kullanılan Teknolojiler

- Node.js & Express.js – Sunucu tarafı uygulama çatısı
- MongoDB & Mongoose – NoSQL veritabanı ve ODM
- JWT (jsonwebtoken) – Kimlik doğrulama sistemi
- dotenv – Ortam değişkenleri yönetimi
- Nodemon – Geliştirme ortamında otomatik yeniden başlatma

## ⚙️ Kurulum

1. Projeyi klonlayın:
   git clone https://github.com/kullaniciAdi/proje-adi.git
   cd proje-adi

2. Bağımlılıkları yükleyin:
   npm install

3. .env dosyasını oluşturun ve şu değişkenleri tanımlayın:
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/veritabani_adi
   JWT_SECRET=guclu_bir_secret

4. Uygulamayı başlatın:
   npm run dev

## 📬 API Endpointleri

### 🔐 Auth

| Yöntem | Endpoint         | Açıklama            |
|--------|------------------|---------------------|
| POST   | /auth/register   | Yeni kullanıcı kaydı |
| POST   | /auth/login      | Kullanıcı girişi     |

### 📝 Post

| Yöntem | Endpoint       | Açıklama                      |
|--------|----------------|-------------------------------|
| POST   | /post/         | Yeni gönderi oluştur          |
| GET    | /post/         | Tüm gönderileri getir         |
| GET    | /post/:id      | Belirli gönderiyi getir       |
| PUT    | /post/:id      | Gönderiyi güncelle            |
| DELETE | /post/:id      | Gönderiyi sil                 |

## 🛡️ Middleware'lar

- auth.js – JWT ile giriş kontrolü
- post.js – Gönderi üzerinde yetki ve validasyon kontrolleri
