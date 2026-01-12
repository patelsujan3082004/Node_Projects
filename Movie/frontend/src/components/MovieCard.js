/**
 * Movie Card Component
 * 
 * Displays a single movie in a card format.
 * Used on the home page to show all movies.
 */

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './MovieCard.css';

const MovieCard = ({ movie }) => {
  const placeholder = 'https://via.placeholder.com/500x750?text=No+Image';
  const [imgSrc, setImgSrc] = useState(movie.posterImage || placeholder);

  return (
    <Link to={`/movie/${movie._id}`} className="movie-card">
      <div className="movie-card-poster">
        <img
          src={imgSrc}
          alt={movie.title}
          onError={() => setImgSrc(placeholder)}
        />
        <div className="movie-card-overlay">
          <span className="movie-rating">⭐ {movie.rating}/10</span>
          <div className="movie-overlay-title">{movie.title}</div>
        </div>
      </div>
      <div className="movie-card-info">
        <h3 className="movie-card-title">{movie.title}</h3>
        <div className="movie-card-meta">
          <span className="badge genre">{movie.genre}</span>
          <span className="badge duration">{movie.duration}m</span>
          <span className="year">{new Date(movie.releaseDate).getFullYear()}</span>
        </div>
        <p className="movie-card-desc">{movie.description?.slice(0, 120)}{movie.description && movie.description.length > 120 ? '...' : ''}</p>
      </div>
    </Link>
  );
};

export default MovieCard;
