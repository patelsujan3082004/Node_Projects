/**
 * Add Movie Page Component
 * 
 * Form to add a new movie.
 * Only accessible to authenticated admins.
 */

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createMovie } from '../services/api';
import './MovieForm.css';

const AddMovie = () => {
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
      // Convert string values to appropriate types
      const movieData = {
        ...formData,
        duration: parseInt(formData.duration),
        rating: parseFloat(formData.rating),
        releaseDate: new Date(formData.releaseDate).toISOString(),
      };

      await createMovie(movieData);
      navigate('/');
    } catch (err) {
      setError(
        err.response?.data?.message ||
          err.response?.data?.errors?.join(', ') ||
          'Failed to create movie. Please check all fields.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-container">
      <div className="form-container">
        <h1>Add New Movie</h1>

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
              onClick={() => navigate('/')}
              className="cancel-button"
            >
              Cancel
            </button>
            <button type="submit" className="submit-button" disabled={loading}>
              {loading ? 'Adding...' : 'Add Movie'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddMovie;
