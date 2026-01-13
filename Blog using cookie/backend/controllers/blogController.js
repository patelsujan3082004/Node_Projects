const Blog = require('../models/Blog');
const fs = require('fs');
const path = require('path');

// Get all blogs
exports.getAllBlogs = async (req, res) => {
  try {
    const { category, search } = req.query;
    let query = {};

    // Filter by category
    if (category && category !== 'all') {
      query.category = category;
    }

    // Search by title
    if (search) {
      query.title = { $regex: search, $options: 'i' };
    }

    const blogs = await Blog.find(query)
      .populate('category', 'name')
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: blogs.length,
      blogs
    });
  } catch (error) {
    console.error('Get blogs error:', error);
    res.status(500).json({ message: 'Server error while fetching blogs' });
  }
};

// Get single blog
exports.getBlog = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id).populate('category', 'name');
    
    if (!blog) {
      return res.status(404).json({ message: 'Blog not found' });
    }

    res.status(200).json({
      success: true,
      blog
    });
  } catch (error) {
    console.error('Get blog error:', error);
    res.status(500).json({ message: 'Server error while fetching blog' });
  }
};

// Create new blog
exports.createBlog = async (req, res) => {
  try {
    const { title, description, category, author } = req.body;

    // Validate required fields
    if (!title || !description || !category || !author) {
      return res.status(400).json({ message: 'Please provide all required fields' });
    }

    // Check if image is uploaded
    if (!req.file) {
      return res.status(400).json({ message: 'Please upload a blog image' });
    }

    const blog = new Blog({
      title,
      description,
      category,
      author,
      image: `/uploads/${req.file.filename}`
    });

    await blog.save();
    await blog.populate('category', 'name');

    res.status(201).json({
      success: true,
      message: 'Blog created successfully',
      blog
    });
  } catch (error) {
    console.error('Create blog error:', error);
    res.status(500).json({ message: 'Server error while creating blog' });
  }
};

// Update blog
exports.updateBlog = async (req, res) => {
  try {
    const { title, description, category, author } = req.body;
    const blog = await Blog.findById(req.params.id);

    if (!blog) {
      return res.status(404).json({ message: 'Blog not found' });
    }

    // Update fields
    if (title) blog.title = title;
    if (description) blog.description = description;
    if (category) blog.category = category;
    if (author) blog.author = author;

    // Update image if new one is uploaded
    if (req.file) {
      // Delete old image
      const oldImagePath = path.join(__dirname, '..', blog.image);
      if (fs.existsSync(oldImagePath)) {
        fs.unlinkSync(oldImagePath);
      }
      blog.image = `/uploads/${req.file.filename}`;
    }

    await blog.save();
    await blog.populate('category', 'name');

    res.status(200).json({
      success: true,
      message: 'Blog updated successfully',
      blog
    });
  } catch (error) {
    console.error('Update blog error:', error);
    res.status(500).json({ message: 'Server error while updating blog' });
  }
};

// Delete blog
exports.deleteBlog = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);

    if (!blog) {
      return res.status(404).json({ message: 'Blog not found' });
    }

    // Delete image file
    const imagePath = path.join(__dirname, '..', blog.image);
    if (fs.existsSync(imagePath)) {
      fs.unlinkSync(imagePath);
    }

    await blog.deleteOne();

    res.status(200).json({
      success: true,
      message: 'Blog deleted successfully'
    });
  } catch (error) {
    console.error('Delete blog error:', error);
    res.status(500).json({ message: 'Server error while deleting blog' });
  }
};

