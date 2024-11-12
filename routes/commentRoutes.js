const express = require('express');
const { addComment, getComments, likeComment, addReply, deleteComment } = require('../controllers/commentController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/:blogId/comments', authMiddleware, addComment);

router.get('/:blogId/comments', getComments);

router.post('/comments/:commentId/like', authMiddleware, likeComment);

router.post('/comments/:commentId/reply', authMiddleware, addReply);

router.delete('/comments/:commentId', authMiddleware, deleteComment);

module.exports = router;
