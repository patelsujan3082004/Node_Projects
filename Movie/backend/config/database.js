/**
 * Database Configuration
 * 
 * This file handles the MongoDB connection using Mongoose.
 * Mongoose is an ODM (Object Data Modeling) library for MongoDB.
 */

const mongoose = require('mongoose');

/**
 * Connect to MongoDB database
 * Uses the MONGODB_URI from environment variables
 */
const connectDB = async () => {
  try {
    // Use environment variable if provided, otherwise fall back to local MongoDB
    const mongoURI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/moviedb';

    // mongoose.connect() returns a promise
    const conn = await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log(`✅MongoDB Connected: ${conn.connection.host}`);

    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`❌ Error connecting to MongoDB: ${error.message}`);
    // Exit process if database connection fails
    process.exit(1);
  }
};

module.exports = connectDB;
