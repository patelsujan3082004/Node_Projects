/**
 * Movie Routes
 * 
 * Defines all movie-related API endpoints.
 * Protected routes use the 'protect' middleware to ensure only
 * authenticated admins can add/edit/delete movies.
 */

const express = require('express');
const router = express.Router();
const {
  createMovie,
  getAllMovies,
  getMovieById,
  updateMovie,
  deleteMovie,
} = require('../controllers/movieController');
const { protect } = require('../middleware/auth');

/**
 * Public Routes (No authentication required)
 */
router.get('/', getAllMovies); // GET /api/movies
router.get('/:id', getMovieById); // GET /api/movies/:id

/**
 * Protected Routes (Admin authentication required)
 * The 'protect' middleware runs before the controller function.
 */
router.post('/', protect, createMovie); // POST /api/movies
router.put('/:id', protect, updateMovie); // PUT /api/movies/:id
router.delete('/:id', protect, deleteMovie); // DELETE /api/movies/:id

module.exports = router;
