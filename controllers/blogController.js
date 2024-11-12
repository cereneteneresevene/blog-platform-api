const Blog = require('../models/Blog');

exports.searchBlogs = async (req, res) => {
  try {
      const { title, content, author, tags, startDate, endDate, popularity } = req.query;

      let filter = {};

      if (title) {
          filter.title = { $regex: title, $options: 'i' }; 
      }
      if (content) {
          filter.content = { $regex: content, $options: 'i' };
      }

      if (author) {
          filter.author = author;
      }

      if (tags) {
          filter.tags = { $in: tags.split(',') }; 
      }

      if (startDate || endDate) {
          filter.updatedAt = {};
          if (startDate) {
              filter.updatedAt.$gte = new Date(startDate); 
          }
          if (endDate) {
              filter.updatedAt.$lte = new Date(endDate); 
          }
      }

      let sort = {};
      if (popularity === 'asc') {
          sort.likes = 1; 
      } else if (popularity === 'desc') {
          sort.likes = -1; 
      }

      const blogs = await Blog.find(filter).sort(sort).populate('author', 'username');

      res.status(200).json(blogs);
  } catch (error) {
      res.status(500).json({ error: error.message });
  }
};

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

exports.likeBlog = async (req, res) => {
  try {
      const blogId = req.params.blogId;
      const blog = await Blog.findById(blogId);
      
      if (!blog) {
          return res.status(404).json({ error: 'Blog yazısı bulunamadı' });
      }

      if (blog.likes.includes(req.user.id)) {
          blog.likes.pull(req.user.id);
          blog.likesCount -= 1; 
      } else {
          blog.likes.push(req.user.id);
          blog.likesCount += 1; 
      }

      await blog.save();

      res.status(200).json(blog);
  } catch (error) {
      res.status(500).json({ error: error.message });
  }
};

exports.updateBlog = async (req, res) => {
    try {
      const { id } = req.params;
      const { title, content, tags } = req.body;
  
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
  