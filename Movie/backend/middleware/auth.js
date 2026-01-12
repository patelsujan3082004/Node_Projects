/**
 * Authentication Middleware
 * 
 * Middleware functions are functions that have access to the request (req),
 * response (res), and next middleware function in the application's request-response cycle.
 * 
 * This middleware verifies JWT tokens to protect routes.
 */

const jwt = require('jsonwebtoken');
const Admin = require('../models/Admin');

/**
 * Protect Routes - Verify JWT Token
 * 
 * This middleware:
 * 1. Extracts token from Authorization header
 * 2. Verifies the token using JWT_SECRET
 * 3. Finds the admin user
 * 4. Attaches admin to req object for use in controllers
 */
const protect = async (req, res, next) => {
  try {
    let token;

    // Check if Authorization header exists and starts with "Bearer"
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith('Bearer')
    ) {
      // Extract token from "Bearer <token>"
      token = req.headers.authorization.split(' ')[1];
    }

    // If no token, return error
    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'Not authorized to access this route. Please provide a token.',
      });
    }

    try {
      // Verify token using JWT_SECRET
      // jwt.verify() decodes and verifies the token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Find admin by ID from token (without password)
      // select('-password') excludes password field
      req.admin = await Admin.findById(decoded.id).select('-password');

      if (!req.admin) {
        return res.status(401).json({
          success: false,
          message: 'Admin not found with this token.',
        });
      }

      // Call next() to proceed to the next middleware/controller
      next();
    } catch (error) {
      return res.status(401).json({
        success: false,
        message: 'Not authorized to access this route. Invalid token.',
      });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Server error during authentication.',
      error: error.message,
    });
  }
};

module.exports = { protect };
