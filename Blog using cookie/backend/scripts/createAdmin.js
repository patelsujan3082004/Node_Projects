/**
 * Script to create initial admin user
 * Run this once: node scripts/createAdmin.js
 */

const mongoose = require('mongoose');
const Admin = require('../models/Admin');
require('dotenv').config();

const createAdmin = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/blog_admin', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    // Check if admin already exists
    const existingAdmin = await Admin.findOne({ email: 'admin@blog.com' });
    if (existingAdmin) {
      console.log('Admin already exists!');
      process.exit(0);
    }

    // Create admin
    const admin = new Admin({
      username: 'admin',
      email: 'admin@blog.com',
      password: 'admin123', // Will be hashed automatically
      name: 'Admin User'
    });

    await admin.save();
    console.log('Admin created successfully!');
    console.log('Email: admin@blog.com');
    console.log('Password: admin123');
    console.log('\nPlease change the password after first login!');
    
    process.exit(0);
  } catch (error) {
    console.error('Error creating admin:', error);
    process.exit(1);
  }
};

createAdmin();

