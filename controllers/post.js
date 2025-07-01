const PostSchema = require('../models/post.js');

const getPosts = async (req, res) => {
    try {
        const getPosts = await PostSchema.find();
        res.status(200).json({
            getPosts
        });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

const createPosts = async (req, res) => {
    try {
        const newPost = await PostSchema.create(req.body);
        res.status(201).json({
            newPost
        });
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
};

const getDetail = async (req, res) => {
    try {
        const { id } = req.params;
        const detailPost = await PostSchema.findById(id);
        if (!detailPost) {
            return res.status(404).json({ message: 'Post bulunamadı!' });
        }
        res.status(200).json({
            detailPost
        });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

const getUpdate = async (req, res) => {
    try {
        const { id } = req.params;
        const updatePost = await PostSchema.findByIdAndUpdate(id, req.body, { new: true });
        if (!updatePost) {
            return res.status(404).json({ message: 'Post güncellenemedi!' });
        }
        res.status(200).json({
            updatePost
        });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

const deletePost = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedPost = await PostSchema.findByIdAndDelete(id);
        
        if (!deletedPost) {
            return res.status(404).json({ message: 'Post bulunamadı!' });
        }

        res.status(200).json({
            message: "Silme işlemi tamamlandı",
            deletedPost // opsiyonel
        });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};


const searchPost = async (req, res) => {
    try {
        const { id } = req.params;
        const post = await PostSchema.findById(id);
        
        if (!post) {
            return res.status(404).json({ message: 'Post bulunamadı!' });
        }
        
        return res.status(200).json({
            post
        });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

module.exports = { getPosts, createPosts, getDetail, getUpdate, deletePost, searchPost };
