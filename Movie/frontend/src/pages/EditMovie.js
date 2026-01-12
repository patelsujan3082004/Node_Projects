/**
 * Edit Movie Page Component
 * 
 * Form to edit an existing movie.
 * Only accessible to authenticated admins.
 */

import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getMovieById, updateMovie } from '../services/api';
import './MovieForm.css';

const EditMovie = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    genre: '',
    releaseDate: '',
    duration: '',
    rating: '',
    posterImage: '',
    trailerUrl: '',
  });
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [error, setError] = useState(null);

  const genres = [
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
  ];

  useEffect(() => {
    fetchMovie();
  }, [id]);

  const fetchMovie = async () => {
    try {
      setFetching(true);
      const response = await getMovieById(id);
      const movie = response.data.data;

      // Format date for input field (YYYY-MM-DD)
      const releaseDate = new Date(movie.releaseDate)
        .toISOString()
        .split('T')[0];

      setFormData({
        title: movie.title,
        description: movie.description,
        genre: movie.genre,
        releaseDate: releaseDate,
        duration: movie.duration.toString(),
        rating: movie.rating.toString(),
        posterImage: movie.posterImage,
        trailerUrl: movie.trailerUrl || '',
      });
    } catch (err) {
      setError('Failed to load movie. Please try again.');
      console.error('Error fetching movie:', err);
    } finally {
      setFetching(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setError(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const movieData = {
        ...formData,
        duration: parseInt(formData.duration),
        rating: parseFloat(formData.rating),
        releaseDate: new Date(formData.releaseDate).toISOString(),
      };

      await updateMovie(id, movieData);
      navigate(`/movie/${id}`);
    } catch (err) {
      setError(
        err.response?.data?.message ||
          err.response?.data?.errors?.join(', ') ||
          'Failed to update movie. Please check all fields.'
      );
    } finally {
      setLoading(false);
    }
  };

  if (fetching) {
    return (
      <div className="page-container">
        <div className="loading-container">
          <div className="spinner"></div>
          <p>Loading movie...</p>
        </div>
      </div>
    );
  }

  if (error && !formData.title) {
    return (
      <div className="page-container">
        <div className="error-message">{error}</div>
        <button onClick={() => navigate('/')} className="back-button">
          ← Back to Home
        </button>
      </div>
    );
  }

  return (
    <div className="page-container">
      <div className="form-container">
        <h1>Edit Movie</h1>

        {error && <div className="error-message">{error}</div>}

        <form onSubmit={handleSubmit} className="movie-form">
          <div className="form-group">
            <label htmlFor="title">Title *</label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              placeholder="Enter movie title"
            />
          </div>

          <div className="form-group">
            <label htmlFor="description">Description *</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              rows="5"
              placeholder="Enter movie description"
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="genre">Genre *</label>
              <select
                id="genre"
                name="genre"
                value={formData.genre}
                onChange={handleChange}
                required
              >
                <option value="">Select genre</option>
                {genres.map((genre) => (
                  <option key={genre} value={genre}>
                    {genre}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="releaseDate">Release Date *</label>
              <input
                type="date"
                id="releaseDate"
                name="releaseDate"
                value={formData.releaseDate}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="duration">Duration (minutes) *</label>
              <input
                type="number"
                id="duration"
                name="duration"
                value={formData.duration}
                onChange={handleChange}
                required
                min="1"
                max="600"
                placeholder="e.g., 120"
              />
            </div>

            <div className="form-group">
              <label htmlFor="rating">Rating (0-10) *</label>
              <input
                type="number"
                id="rating"
                name="rating"
                value={formData.rating}
                onChange={handleChange}
                required
                min="0"
                max="10"
                step="0.1"
                placeholder="e.g., 8.5"
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="posterImage">Poster Image URL *</label>
            <input
              type="url"
              id="posterImage"
              name="posterImage"
              value={formData.posterImage}
              onChange={handleChange}
              required
              placeholder="https://example.com/poster.jpg"
            />
          </div>

          <div className="form-group">
            <label htmlFor="trailerUrl">Trailer URL (optional)</label>
            <input
              type="url"
              id="trailerUrl"
              name="trailerUrl"
              value={formData.trailerUrl}
              onChange={handleChange}
              placeholder="https://youtube.com/watch?v=..."
            />
          </div>

          <div className="form-actions">
            <button
              type="button"
              onClick={() => navigate(`/movie/${id}`)}
              className="cancel-button"
            >
              Cancel
            </button>
            <button type="submit" className="submit-button" disabled={loading}>
              {loading ? 'Updating...' : 'Update Movie'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditMovie;
