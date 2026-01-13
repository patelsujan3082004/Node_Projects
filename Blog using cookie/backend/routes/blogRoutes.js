const express = require('express');
const router = express.Router();
const {
  getAllBlogs,
  getBlog,
  createBlog,
  updateBlog,
  deleteBlog
} = require('../controllers/blogController');
const authMiddleware = require('../middleware/authMiddleware');
const upload = require('../config/multer');

// All blog routes are protected
router.use(authMiddleware);

// Routes
router.get('/', getAllBlogs);
router.get('/:id', getBlog);
router.post('/', upload.single('image'), createBlog);
router.put('/:id', upload.single('image'), updateBlog);
router.delete('/:id', deleteBlog);

module.exports = router;

