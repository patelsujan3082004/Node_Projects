import React, { useState, useEffect } from 'react';
import { getAllMovies } from '../services/api';
import MovieCard from '../components/MovieCard';
import logo from '../assests/Stranger-Things.png'
import './Home.css';

const Home = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filterGenre, setFilterGenre] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchMovies();
  }, []);

  const fetchMovies = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await getAllMovies();
      const moviesData = response?.data?.data || [];
      setMovies(Array.isArray(moviesData) ? moviesData : []);
    } catch (err) {
      setError('Failed to load movies. Please try again later.');
      setMovies([]);
    } finally {
      setLoading(false);
    }
  };

  const genres = [...new Set(movies.map(m => m.genre).filter(Boolean))];

  const filteredMovies = filterGenre
    ? movies.filter(m => m.genre === filterGenre)
    : movies;

  const searchedMovies = filteredMovies.filter(movie => {
    const q = searchTerm.toLowerCase();
    return (
      movie.title?.toLowerCase().includes(q) ||
      movie.description?.toLowerCase().includes(q)
    );
  });

  if (loading) {
    return (
      <div className="page-container loading-container">
        <div className="spinner"></div>
        <p>Loading movies...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="page-container">
        <div className="error-message">{error}</div>
      </div>
    );
  }

  return (
    <div className="page-container">

      {/* 🎬 CINEMATIC HERO */}
      <section className="cinema-hero">
        <div className="cinema-overlay">
          <div className="cinema-content">
            <span className="cinema-badge">NETFLIX ORIGINAL</span>

            {/* <img
              src={logo}
              alt="Stranger Things"
              className="cinema-logo"
            /> */}

            <p className="cinema-desc">
              A love letter to the 80s classics that captivated a generation.
              When a young boy disappears, a small town uncovers a supernatural mystery.
            </p>

            <div className="cinema-actions">
              <button className="btn-primary">Explore Movies</button>
              <button className="btn-ghost">More Info</button>
            </div>
          </div>
        </div>
      </section>

      {/* CONTROLS */}
      <div className="controls-row">
        {genres.length > 0 && (
          <div className="genre-filter">
            <label>Filter by Genre:</label>
            <select value={filterGenre} onChange={(e) => setFilterGenre(e.target.value)}>
              <option value="">All Genres</option>
              {genres.map(g => (
                <option key={g} value={g}>{g}</option>
              ))}
            </select>
          </div>
        )}

        <div className="search-box">
          <input
            type="search"
            placeholder="Search movies by title or description..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* MOVIES GRID */}
      {searchedMovies.length === 0 ? (
        <div className="no-movies">No movies found.</div>
      ) : (
        <div className="movies-grid">
          {searchedMovies.map(movie => (
            <MovieCard key={movie._id} movie={movie} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;
