/**
 * Authentication Routes
 * 
 * Routes define the endpoints (URLs) that clients can access.
 * Each route maps a URL pattern to a controller function.
 */

const express = require('express');
const router = express.Router();
const { loginAdmin, registerAdmin } = require('../controllers/authController');

/**
 * POST /api/auth/login
 * Admin login endpoint
 */
router.post('/login', loginAdmin);

/**
 * POST /api/auth/register
 * Register new admin endpoint
 */
router.post('/register', registerAdmin);

module.exports = router;
