const Comment = require('../models/Comment');
const Blog = require('../models/Blog');

exports.addComment = async (req, res) => {
    try {
        const { content } = req.body;
        const blogId = req.params.blogId;

        const newComment = new Comment({
            content,
            author: req.user.id,
            blog: blogId,
        });

        await newComment.save();

        res.status(201).json(newComment);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.addReply = async (req, res) => {
    try {
        const { content } = req.body;
        const commentId = req.params.commentId;

        const replyComment = new Comment({
            content,
            author: req.user.id,
            blog: req.body.blogId,
        });

        await replyComment.save();

        const parentComment = await Comment.findById(commentId);
        if (!parentComment) {
            return res.status(404).json({ error: 'Yorum bulunamadı' });
        }
        parentComment.replies.push(replyComment._id);
        await parentComment.save();

        res.status(201).json(replyComment);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getComments = async (req, res) => {
    try {
        const blogId = req.params.blogId;
        const comments = await Comment.find({ blog: blogId, replies: { $exists: true } })
            .populate('author', 'username')
            .populate({
                path: 'replies',
                populate: { path: 'author', select: 'username' }
            });

        res.status(200).json(comments);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.likeComment = async (req, res) => {
    try {
        const commentId = req.params.commentId;

        const comment = await Comment.findById(commentId);
        if (!comment) {
            return res.status(404).json({ error: 'Yorum bulunamadı' });
        }

        if (comment.likes.includes(req.user.id)) {
            comment.likes.pull(req.user.id);
        } else {
            comment.likes.push(req.user.id);
        }

        await comment.save();

        res.status(200).json(comment);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.deleteComment = async (req, res) => {
  try {
      const commentId = req.params.commentId;

      const comment = await Comment.findById(commentId);
      if (!comment) {
          return res.status(404).json({ error: 'Yorum bulunamadı' });
      }

      if (comment.author.toString() !== req.user.id && !req.user.isAdmin) {
          return res.status(403).json({ error: 'Yorumu silme yetkiniz yok' });
      }

      await comment.deleteOne(); 

      res.status(200).json({ message: 'Yorum başarıyla silindi' });
  } catch (error) {
      res.status(500).json({ error: error.message });
  }
};

