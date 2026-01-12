/**
 * Admin Model (Schema)
 * 
 * This defines the structure of an Admin user document in MongoDB.
 * Used for authentication - only admins can add/edit/delete movies.
 */

const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

/**
 * Admin Schema Definition
 */
const adminSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true, // Ensures no duplicate emails
      lowercase: true, // Convert to lowercase
      trim: true,
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        'Please provide a valid email address',
      ],
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
      minlength: [6, 'Password must be at least 6 characters'],
      select: false, // Don't return password in queries by default
    },
    name: {
      type: String,
      trim: true,
      default: 'Admin',
    },
  },
  {
    timestamps: true,
  }
);

/**
 * Pre-save Middleware
 * 
 * This runs BEFORE saving a document to the database.
 * We hash the password using bcrypt before saving.
 */
adminSchema.pre('save', async function (next) {
  // Only hash password if it's been modified (or is new)
  if (!this.isModified('password')) {
    return next();
  }

  // Hash password with cost factor of 10
  // Higher cost = more secure but slower
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

/**
 * Instance Method: Compare Password
 * 
 * This method can be called on an admin instance to compare
 * a plain text password with the hashed password.
 */
adminSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const Admin = mongoose.model('Admin', adminSchema);

module.exports = Admin;
