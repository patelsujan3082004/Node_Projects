/**
 * Movie Details Page Component
 * 
 * Displays detailed information about a single movie.
 * Includes edit and delete buttons for authenticated admins.
 */

import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { getMovieById, deleteMovie } from '../services/api';
import './MovieDetails.css';

const MovieDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsAuthenticated(!!token);
    fetchMovie();
  }, [id]);

  const fetchMovie = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await getMovieById(id);
      setMovie(response.data.data);
    } catch (err) {
      setError('Movie not found or failed to load.');
      console.error('Error fetching movie:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete this movie?')) {
      return;
    }

    try {
      await deleteMovie(id);
      navigate('/');
    } catch (err) {
      alert('Failed to delete movie. Please try again.');
      console.error('Error deleting movie:', err);
    }
  };

  if (loading) {
    return (
      <div className="page-container">
        <div className="loading-container">
          <div className="spinner"></div>
          <p>Loading movie details...</p>
        </div>
      </div>
    );
  }

  if (error || !movie) {
    return (
      <div className="page-container">
        <div className="error-message">{error || 'Movie not found'}</div>
        <Link to="/" className="back-button">
          ← Back to Home
        </Link>
      </div>
    );
  }

  return (
    <div className="page-container">
      <Link to="/" className="back-button">
        ← Back to Home
      </Link>

      <div className="movie-details">
        <div className="movie-details-poster">
          <img src={movie.posterImage} alt={movie.title} />
        </div>

        <div className="movie-details-content">
          <div className="movie-details-header">
            <h1>{movie.title}</h1>
            {isAuthenticated && (
              <div className="movie-actions">
                <Link
                  to={`/edit-movie/${movie._id}`}
                  className="edit-button"
                >
                  Edit
                </Link>
                <button onClick={handleDelete} className="delete-button">
                  Delete
                </button>
              </div>
            )}
          </div>

          <div className="movie-meta">
            <span className="movie-rating-badge">
              ⭐ {movie.rating}/10
            </span>
            <span className="movie-genre-badge">{movie.genre}</span>
            <span className="movie-year">
              {new Date(movie.releaseDate).getFullYear()}
            </span>
            <span className="movie-duration">{movie.duration} min</span>
          </div>

          <div className="movie-description">
            <h2>Description</h2>
            <p>{movie.description}</p>
          </div>

          {movie.trailerUrl && (
            <div className="movie-trailer">
              <h2>Trailer</h2>
              <a
                href={movie.trailerUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="trailer-link"
              >
                Watch Trailer →
              </a>
            </div>
          )}

          <div className="movie-info">
            <p>
              <strong>Release Date:</strong>{' '}
              {new Date(movie.releaseDate).toLocaleDateString()}
            </p>
            <p>
              <strong>Added:</strong>{' '}
              {new Date(movie.createdAt).toLocaleDateString()}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;
