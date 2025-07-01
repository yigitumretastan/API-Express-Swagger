const express = require('express');
const { getPosts, createPosts, getUpdate, getDetail, deletePost, searchPost } = require('../controllers/post.js');
const auth = require('../middleware/auth.js');
const router = express.Router();


/**
 * @swagger
 * components:
 *   schemas:
 *     Post:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           description: Post ID
 *         name:
 *           type: string
 *           description: Post başlığı
 *         url:
 *           type: string
 *           description: Post içeriği       
 *         createdAt:
 *           type: string
 *           format: date
 *           description: Oluşturulma tarihi
 *       required:
 *         - name
 *         - description
 *   responses:
 *     UnauthorizedError:
 *       description: Kimlik doğrulama başarısız
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               message:
 *                 type: string
 *                 example: "Yetkilendirme hatası"
 *     NotFoundError:
 *       description: Kaynak bulunamadı
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               message:
 *                 type: string
 *                 example: "Post bulunamadı"
 *     ServerError:
 *       description: Sunucu hatası
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               message:
 *                 type: string
 *                 example: "Sunucu hatası oluştu"
 */

/**
 * @swagger
 * /api/Posts:
 *   get:
 *     summary: Tüm postları getir
 *     tags: [Posts]
 *     responses:
 *       200:
 *         description: Tüm postların listesi
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 getPosts:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Post'
 *       500:
 *         $ref: '#/components/responses/ServerError'
 */
router.get('/api/Posts', getPosts)

/**
 * @swagger
 * /api/Posts:
 *   post:
 *     summary: Yeni post oluştur
 *     tags: [Posts]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *             properties:
 *               name:
 *                 type: string
 *               url:
 *                 type: string
 *     responses:
 *       201:
 *         description: Post başarıyla oluşturuldu
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 newPost:
 *                   $ref: '#/components/schemas/Post'
 *       400:
 *         description: Geçersiz girdi
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Geçersiz veri formatı"
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 *       500:
 *         $ref: '#/components/responses/ServerError'
 */
router.post('/api/Posts', auth, createPosts)

/**
 * @swagger
 * /api/Detail/{id}:
 *   get:
 *     summary: ID'ye göre post detayını getir
 *     tags: [Posts]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Post ID
 *     responses:
 *       200:
 *         description: Post başarıyla bulundu
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 detailPost:
 *                   $ref: '#/components/schemas/Post'
 *       404:
 *         $ref: '#/components/responses/NotFoundError'
 *       500:
 *         $ref: '#/components/responses/ServerError'
 */
router.get('/api/Detail/:id', getDetail)


/**
 * @swagger
 * /api/Update/{id}:
 *   patch:
 *     summary: ID'ye göre post güncelle
 *     tags: [Posts]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Post ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               url:
 *                 type: string

 *     responses:
 *       200:
 *         description: Post başarıyla güncellendi
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 updatePost:
 *                   $ref: '#/components/schemas/Post'
 *       400:
 *         description: Geçersiz girdi
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Geçersiz veri formatı"
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 *       404:
 *         $ref: '#/components/responses/NotFoundError'
 *       500:
 *         $ref: '#/components/responses/ServerError'
 */
router.patch('/api/Update/:id', auth, getUpdate)

/**
 * @swagger
 * /api/Post/{id}:
 *   delete:
 *     summary: ID'ye göre post sil
 *     tags: [Posts]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Post ID
 *     responses:
 *       200:
 *         description: Post başarıyla silindi
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Silme İşlemi Tamamlandı"
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 *       404:
 *         $ref: '#/components/responses/NotFoundError'
 *       500:
 *         $ref: '#/components/responses/ServerError'
 */
router.delete('/api/Post/:id', auth, deletePost)

/**
 * @swagger
 * /api/searchPost/{id}:
 *   get:
 *     summary: Belirli bir ID'ye sahip postu getirir
 *     tags: [Posts]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Post ID
 *     responses:
 *       200:
 *         description: İstenen post bulundu
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Post'
 *       404:
 *         $ref: '#/components/responses/NotFoundError'
 *       500:
 *         $ref: '#/components/responses/ServerError'
 */
router.get('/api/searchPost/:id', searchPost)

module.exports = router