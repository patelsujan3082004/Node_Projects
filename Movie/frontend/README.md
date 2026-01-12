# Frontend Documentation

## Quick Start

1. Install dependencies:
```bash
npm install
```

2. (Optional) Create `.env` file:
```env
REACT_APP_API_URL=http://localhost:5000/api
```

3. Start development server:
```bash
npm start
```

## Component Structure

### Pages (`src/pages/`)
- **Home.js**: Displays all movies in grid
- **MovieDetails.js**: Shows single movie details
- **AddMovie.js**: Form to add new movie
- **EditMovie.js**: Form to edit existing movie
- **Login.js**: Admin login page

### Components (`src/components/`)
- **Navbar.js**: Navigation bar with links
- **MovieCard.js**: Reusable movie card component

### Services (`src/services/`)
- **api.js**: Axios configuration and API functions

## Key Features

### React Router
- Client-side routing
- Protected routes (redirect to login if not authenticated)
- Dynamic routes for movie details

### State Management
- React hooks (useState, useEffect)
- Local storage for token persistence
- Loading and error states

### API Integration
- Centralized API service
- Automatic token injection
- Error handling with interceptors

## Code Explanation

### Protected Routes
```javascript
<Route
  path="/add-movie"
  element={
    isAuthenticated ? <AddMovie /> : <Navigate to="/login" />
  }
/>
```

### API Calls
```javascript
// Get all movies
const response = await getAllMovies();
const movies = response.data.data;

// Create movie (requires auth)
await createMovie(movieData);
```

### Token Management
- Stored in `localStorage`
- Automatically added to requests via interceptor
- Removed on logout or 401 error

### Responsive Design
- CSS Grid for movie grid
- Flexbox for layouts
- Media queries for mobile devices

## Styling

### CSS Variables
- Defined in `index.css`
- Used throughout components
- Easy theme customization

### Component Styles
- Each component has its own CSS file
- BEM-like naming convention
- Consistent color scheme

## Environment Variables

- `REACT_APP_API_URL`: Backend API URL (default: http://localhost:5000/api)
