const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const passport = require('passport');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

// Import Passport configuration
require('./config/passport')(passport);

// Import Routes
const authRoutes = require('./routes/authRoutes');
const blogRoutes = require('./routes/blogRoutes');
const categoryRoutes = require('./routes/categoryRoutes');

// Initialize Express app
const app = express();

// Connect to MongoDB
require('./config/db');

app.use(cors({
  origin: 'http://localhost:3000', // React app URL
  credentials: true // Allow cookies/sessions
}));

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// Serve static files (uploaded images)
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Express Session Configuration
app.use(
  session({
    secret: process.env.SESSION_SECRET || 'your-secret-session-key',
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: false, // Set to true if using HTTPS
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000 // 24 hours
    }
  })
);

// Passport Middleware
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/blogs', blogRoutes);
app.use('/api/categories', categoryRoutes);

// Test Route
app.get('/api/test', (req, res) => {
  res.json({ message: 'Server is running!' });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!', error: err.message });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

