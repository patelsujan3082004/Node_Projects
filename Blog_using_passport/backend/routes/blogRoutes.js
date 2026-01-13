const express = require('express');
const router = express.Router();
const blogController = require('../controllers/blogController');

// ✅ Correct middleware import — matches filename exactly
const isAuthenticated = require('../middleware/isAuthenticated'); 

const multer = require('multer');
const path = require('path');

// Multer configuration for image upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Make sure uploads/ folder exists
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, 'blog-' + uniqueSuffix + path.extname(file.originalname));
  }
});

// File filter for images only
const fileFilter = (req, file, cb) => {
  const allowedTypes = /jpeg|jpg|png|gif|webp/;
  const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = allowedTypes.test(file.mimetype);

  if (mimetype && extname) {
    cb(null, true);
  } else {
    cb(new Error('Only image files are allowed (jpeg, jpg, png, gif, webp)'));
  }
};

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
  fileFilter
});

// ✅ Apply authentication per route (better than router.use globally)
router.get('/', blogController.getAllBlogs); // Public
router.get('/:id', blogController.getBlogById); // Public

router.post('/', isAuthenticated, upload.single('image'), blogController.createBlog); // Protected
router.put('/:id', isAuthenticated, upload.single('image'), blogController.updateBlog); // Protected
router.delete('/:id', isAuthenticated, blogController.deleteBlog); // Protected

module.exports = router;
