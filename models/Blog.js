const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  tags: [String],
  likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }], // Beğenileri kullanıcı ID'leriyle tutmak için
  likesCount: { type: Number, default: 0 },
}, { timestamps: true }); // createdAt ve updatedAt otomatik olarak eklenecek

module.exports = mongoose.model('Blog', blogSchema);
