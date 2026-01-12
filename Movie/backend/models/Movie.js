/**
 * Movie Model (Schema)
 * 
 * This defines the structure of a Movie document in MongoDB.
 * Mongoose schemas define the shape of documents within a collection.
 */

const mongoose = require('mongoose');

/**
 * Movie Schema Definition
 * 
 * Each field has:
 * - type: Data type (String, Number, Date, etc.)
 * - required: Whether the field is mandatory
 * - trim: Remove whitespace from strings
 * - default: Default value if not provided
 */
const movieSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Movie title is required'],
      trim: true,
      maxlength: [200, 'Title cannot exceed 200 characters'],
    },
    description: {
      type: String,
      required: [true, 'Movie description is required'],
      trim: true,
      maxlength: [2000, 'Description cannot exceed 2000 characters'],
    },
    genre: {
      type: String,
      required: [true, 'Movie genre is required'],
      trim: true,
      enum: [
        'Action',
        'Comedy',
        'Drama',
        'Horror',
        'Sci-Fi',
        'Thriller',
        'Romance',
        'Adventure',
        'Fantasy',
        'Animation',
        'Documentary',
        'Other',
      ],
    },
    releaseDate: {
      type: Date,
      required: [true, 'Release date is required'],
    },
    duration: {
      type: Number, // Duration in minutes
      required: [true, 'Movie duration is required'],
      min: [1, 'Duration must be at least 1 minute'],
      max: [600, 'Duration cannot exceed 600 minutes'],
    },
    rating: {
      type: Number,
      required: [true, 'Movie rating is required'],
      min: [0, 'Rating cannot be less than 0'],
      max: [10, 'Rating cannot exceed 10'],
    },
    posterImage: {
      type: String,
      required: [true, 'Poster image URL is required'],
      trim: true,
      // Basic URL validation
      validate: {
        validator: function (v) {
          return /^https?:\/\/.+/.test(v);
        },
        message: 'Poster image must be a valid URL',
      },
    },
    trailerUrl: {
      type: String,
      trim: true,
      // Optional field, but if provided, must be valid URL
      validate: {
        validator: function (v) {
          return !v || /^https?:\/\/.+/.test(v);
        },
        message: 'Trailer URL must be a valid URL',
      },
    },
    createdAt: {
      type: Date,
      default: Date.now, // Automatically set when document is created
    },
  },
  {
    // Options object
    timestamps: true, // Automatically adds createdAt and updatedAt fields
  }
);

/**
 * Create and export the Movie model
 * 
 * mongoose.model() creates a model from the schema.
 * The first argument is the singular name of the collection.
 * MongoDB will create a collection named "movies" (pluralized).
 */
const Movie = mongoose.model('Movie', movieSchema);

module.exports = Movie;
