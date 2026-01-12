/**
 * Movie Controller
 * 
 * Handles all business logic for movie CRUD operations.
 * All routes are protected by admin authentication middleware.
 */

const Movie = require('../models/Movie');

/**
 * @route   POST /api/movies
 * @desc    Create a new movie
 * @access  Private (Admin only)
 */
const createMovie = async (req, res) => {
  try {
    const {
      title,
      description,
      genre,
      releaseDate,
      duration,
      rating,
      posterImage,
      trailerUrl,
    } = req.body;

    // Create movie document
    const movie = await Movie.create({
      title,
      description,
      genre,
      releaseDate,
      duration,
      rating,
      posterImage,
      trailerUrl,
    });

    res.status(201).json({
      success: true,
      message: 'Movie created successfully',
      data: movie,
    });
  } catch (error) {
    // Handle validation errors
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map((err) => err.message);
      return res.status(400).json({
        success: false,
        message: 'Validation error',
        errors: messages,
      });
    }

    res.status(500).json({
      success: false,
      message: 'Server error while creating movie',
      error: error.message,
    });
  }
};

/**
 * @route   GET /api/movies
 * @desc    Get all movies
 * @access  Public (Everyone can view movies)
 */
const getAllMovies = async (req, res) => {
  try {
    // Query parameters for filtering/sorting
    const { genre, sortBy = 'createdAt', order = 'desc' } = req.query;

    // Build query object
    let query = {};
    if (genre) {
      query.genre = genre;
    }

    // Build sort object
    const sortOptions = {};
    sortOptions[sortBy] = order === 'asc' ? 1 : -1;

    // Find movies with query and sort
    const movies = await Movie.find(query).sort(sortOptions);

    res.status(200).json({
      success: true,
      count: movies.length,
      data: movies,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error while fetching movies',
      error: error.message,
    });
  }
};

/**
 * @route   GET /api/movies/:id
 * @desc    Get single movie by ID
 * @access  Public
 */
const getMovieById = async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id);

    if (!movie) {
      return res.status(404).json({
        success: false,
        message: 'Movie not found',
      });
    }

    res.status(200).json({
      success: true,
      data: movie,
    });
  } catch (error) {
    // Handle invalid ObjectId format
    if (error.name === 'CastError') {
      return res.status(400).json({
        success: false,
        message: 'Invalid movie ID format',
      });
    }

    res.status(500).json({
      success: false,
      message: 'Server error while fetching movie',
      error: error.message,
    });
  }
};

/**
 * @route   PUT /api/movies/:id
 * @desc    Update a movie
 * @access  Private (Admin only)
 */
const updateMovie = async (req, res) => {
  try {
    const {
      title,
      description,
      genre,
      releaseDate,
      duration,
      rating,
      posterImage,
      trailerUrl,
    } = req.body;

    // Find movie by ID
    let movie = await Movie.findById(req.params.id);

    if (!movie) {
      return res.status(404).json({
        success: false,
        message: 'Movie not found',
      });
    }

    // Update movie fields
    movie.title = title || movie.title;
    movie.description = description || movie.description;
    movie.genre = genre || movie.genre;
    movie.releaseDate = releaseDate || movie.releaseDate;
    movie.duration = duration || movie.duration;
    movie.rating = rating || movie.rating;
    movie.posterImage = posterImage || movie.posterImage;
    movie.trailerUrl = trailerUrl !== undefined ? trailerUrl : movie.trailerUrl;

    // Save updated movie
    await movie.save();

    res.status(200).json({
      success: true,
      message: 'Movie updated successfully',
      data: movie,
    });
  } catch (error) {
    // Handle validation errors
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map((err) => err.message);
      return res.status(400).json({
        success: false,
        message: 'Validation error',
        errors: messages,
      });
    }

    if (error.name === 'CastError') {
      return res.status(400).json({
        success: false,
        message: 'Invalid movie ID format',
      });
    }

    res.status(500).json({
      success: false,
      message: 'Server error while updating movie',
      error: error.message,
    });
  }
};

/**
 * @route   DELETE /api/movies/:id
 * @desc    Delete a movie
 * @access  Private (Admin only)
 */
const deleteMovie = async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id);

    if (!movie) {
      return res.status(404).json({
        success: false,
        message: 'Movie not found',
      });
    }

    await movie.deleteOne();

    res.status(200).json({
      success: true,
      message: 'Movie deleted successfully',
      data: {},
    });
  } catch (error) {
    if (error.name === 'CastError') {
      return res.status(400).json({
        success: false,
        message: 'Invalid movie ID format',
      });
    }

    res.status(500).json({
      success: false,
      message: 'Server error while deleting movie',
      error: error.message,
    });
  }
};

module.exports = {
  createMovie,
  getAllMovies,
  getMovieById,
  updateMovie,
  deleteMovie,
};
