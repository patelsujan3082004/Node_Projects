/**
 * API Service
 * 
 * Centralized API configuration using Axios.
 * Handles all HTTP requests to the backend.
 */

import axios from 'axios';

// Base URL for API requests
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:7000/api';

// Create axios instance with default config
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

/**
 * Request Interceptor
 * 
 * Automatically adds JWT token to requests if available.
 * This runs before every API request.
 */
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

/**
 * Response Interceptor
 * 
 * Handles common errors (like 401 unauthorized).
 * This runs after every API response.
 */
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token expired or invalid
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

/**
 * Movie API Functions
 */

// Get all movies
export const getAllMovies = () => api.get('/movies');

// Get single movie by ID
export const getMovieById = (id) => api.get(`/movies/${id}`);

// Create new movie (requires authentication)
export const createMovie = (movieData) => api.post('/movies', movieData);

// Update movie (requires authentication)
export const updateMovie = (id, movieData) =>
  api.put(`/movies/${id}`, movieData);

// Delete movie (requires authentication)
export const deleteMovie = (id) => api.delete(`/movies/${id}`);

/**
 * Auth API Functions
 */

// Admin login
export const loginAdmin = (credentials) =>
  api.post('/auth/login', credentials);

// Admin register (optional)
export const registerAdmin = (adminData) =>
  api.post('/auth/register', adminData);

export default api;
