const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/categoryController');

// Correct import — match file name and no { }
const isAuthenticated = require('../middleware/isAuthenticated'); 

// Apply authentication only to protected routes
router.post('/', isAuthenticated, categoryController.createCategory);
router.put('/:id', isAuthenticated, categoryController.updateCategory);
router.delete('/:id', isAuthenticated, categoryController.deleteCategory);

// Public routes
router.get('/', categoryController.getAllCategories);
router.get('/:id', categoryController.getCategoryById);

module.exports = router;
