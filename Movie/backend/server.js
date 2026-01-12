/**
 * Express Server Entry Point
 * 
 * This is the main file that starts the Express server.
 * It sets up middleware, routes, and connects to the database.
 */

require('dotenv').config(); // Load environment variables from .env file
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/database');
const Admin = require('./models/Admin');

// Import routes
const movieRoutes = require('./routes/movieRoutes');
const authRoutes = require('./routes/authRoutes');

// Initialize Express app
const app = express();

// Connect to MongoDB
connectDB();

/**
 * Middleware Configuration
 * 
 * Middleware functions execute in order before reaching route handlers.
 */

// CORS (Cross-Origin Resource Sharing)
// Allows frontend (React) to make requests to backend (Express)
app.use(
  cors({
    origin: process.env.FRONTEND_URL || 'http://localhost:3000',
    credentials: true,
  })
);

// Body Parser Middleware
// Parses JSON data from request body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/**
 * Routes
 * 
 * Mount route handlers to specific URL paths.
 */
app.use('/api/movies', movieRoutes);
app.use('/api/auth', authRoutes);

/**
 * Root Route
 * Simple health check endpoint
 */
app.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'Movie API Server is running!',
    endpoints: {
      movies: '/api/movies',
      auth: '/api/auth',
    },
  });
});

/**
 * 404 Handler
 * Catches any requests to routes that don't exist
 */
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found',
  });
});

/**
 * Error Handling Middleware
 * Catches any errors thrown in routes/controllers
 */
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Internal Server Error',
    error: process.env.NODE_ENV === 'development' ? err : {},
  });
});

/**
 * Initialize Default Admin
 * Creates a default admin user if one doesn't exist
 */
const initializeDefaultAdmin = async () => {
  try {
    const adminExists = await Admin.findOne({
      email: process.env.DEFAULT_ADMIN_EMAIL,
    });

    if (!adminExists) {
      await Admin.create({
        email: process.env.DEFAULT_ADMIN_EMAIL,
        password: process.env.DEFAULT_ADMIN_PASSWORD,
        name: 'Default Admin',
      });
      console.log('✅ Default admin created');
      console.log(
        `   Email: ${process.env.DEFAULT_ADMIN_EMAIL}`,
        `\n   Password: ${process.env.DEFAULT_ADMIN_PASSWORD}`
      );
    }
  } catch (error) {
    console.error('Error initializing default admin:', error.message);
  }
};

// Start server
const PORT = process.env.PORT || 7000;

app.listen(PORT, async () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📍 Environment: ${process.env.NODE_ENV || 'development'}`);
  
  // Initialize default admin after server starts
  await initializeDefaultAdmin();
});
