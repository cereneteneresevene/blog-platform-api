const express = require('express');
const { createBlog, getBlogs, updateBlog, deleteBlog, searchBlogs, likeBlog } = require('../controllers/blogController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/', authMiddleware, createBlog);

router.get('/', authMiddleware, getBlogs);

router.post('/:blogId/like', authMiddleware, likeBlog);

router.put('/:id', authMiddleware, updateBlog);

router.delete('/:id',authMiddleware, deleteBlog);

router.get('/search', searchBlogs);

module.exports = router;
