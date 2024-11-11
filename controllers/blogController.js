const Blog = require('../models/Blog');

exports.createBlog = async (req, res) => {
  try {
    const blog = new Blog({ ...req.body, author: req.user.id });
    await blog.save();
    res.status(201).json(blog);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find().populate('author', 'username');
    res.status(200).json(blogs);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.updateBlog = async (req, res) => {
    try {
      const { id } = req.params;
      const { title, content, tags } = req.body;
  
      // Blog yazısını bul ve güncelle
      const blog = await Blog.findByIdAndUpdate(
        id,
        { title, content, tags },
        { new: true }
      );
  
      if (!blog) {
        return res.status(404).json({ message: 'Blog not found' });
      }
  
      res.status(200).json(blog);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
};

exports.deleteBlog = async (req, res) => {
    try {
      const { id } = req.params;
  
      const blog = await Blog.findByIdAndDelete(id);
  
      if (!blog) {
        return res.status(404).json({ message: 'Blog not found' });
      }
  
      res.status(200).json({ message: 'Blog deleted successfully' });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };
  