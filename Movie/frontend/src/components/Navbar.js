/**
 * Navbar Component
 * 
 * Navigation bar with links to different pages.
 * Shows login/logout based on authentication status.
 */

import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';

const Navbar = ({ isAuthenticated, onLogout }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    onLogout();
    navigate('/');
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          <span className="logo-icon">🎬</span>
         Pro Movie
        </Link>
        <div className="navbar-menu">
          <div className="search-inline">
            <input
              type="search"
              placeholder="Search titles..."
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  // quick client-side navigation to home with search param
                  window.location.href = `/?q=${encodeURIComponent(e.target.value)}`;
                }
              }}
            />
          </div>
          <Link to="/" className="navbar-link">
            Home
          </Link>

          {isAuthenticated ? (
            <>
              <Link to="/add-movie" className="navbar-link">
                Add Movie
              </Link>
              <button onClick={handleLogout} className="navbar-button">
                Logout
              </button>
            </>
          ) : (
            <Link to="/login" className="navbar-link">
              Admin Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
