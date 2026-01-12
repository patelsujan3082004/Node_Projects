# API Testing Guide

Complete guide for testing the Movie API using Thunder Client, Postman, or curl.

## Setup

1. Start the backend server:
```bash
cd backend
npm run dev
```

2. Ensure MongoDB is running

## Step-by-Step Testing

### 1. Login to Get Token

**Request:**
```http
POST http://localhost:5000/api/auth/login
Content-Type: application/json

{
  "email": "admin@movie.com",
  "password": "admin123"
}
```

**Expected Response:**
```json
{
  "success": true,
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "admin": {
    "id": "...",
    "email": "admin@movie.com",
    "name": "Admin"
  }
}
```

**Save the token** for subsequent requests!

---

### 2. Get All Movies (Public)

**Request:**
```http
GET http://localhost:5000/api/movies
```

**Expected Response:**
```json
{
  "success": true,
  "count": 0,
  "data": []
}
```

**With Query Parameters:**
```http
GET http://localhost:5000/api/movies?genre=Action&sortBy=rating&order=desc
```

---

### 3. Create a Movie (Requires Auth)

**Request:**
```http
POST http://localhost:5000/api/movies
Authorization: Bearer <your-token-here>
Content-Type: application/json

{
  "title": "The Dark Knight",
  "description": "When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.",
  "genre": "Action",
  "releaseDate": "2008-07-18",
  "duration": 152,
  "rating": 9.0,
  "posterImage": "https://m.media-amazon.com/images/M/MV5BMTMxNTMwODM0NF5BMl5BanBnXkFtZTcwODAyMTk2Mw@@._V1_.jpg",
  "trailerUrl": "https://www.youtube.com/watch?v=EXeTwQWrcwY"
}
```

**Expected Response:**
```json
{
  "success": true,
  "message": "Movie created successfully",
  "data": {
    "_id": "...",
    "title": "The Dark Knight",
    ...
  }
}
```

**Test Without Token (Should Fail):**
```http
POST http://localhost:5000/api/movies
Content-Type: application/json

{
  "title": "Test Movie",
  ...
}
```

Expected: `401 Unauthorized`

---

### 4. Get Single Movie

**Request:**
```http
GET http://localhost:5000/api/movies/<movie-id>
```

Replace `<movie-id>` with the `_id` from the created movie.

**Expected Response:**
```json
{
  "success": true,
  "data": {
    "_id": "...",
    "title": "The Dark Knight",
    ...
  }
}
```

---

### 5. Update Movie (Requires Auth)

**Request:**
```http
PUT http://localhost:5000/api/movies/<movie-id>
Authorization: Bearer <your-token-here>
Content-Type: application/json

{
  "rating": 9.5,
  "description": "Updated description"
}
```

**Expected Response:**
```json
{
  "success": true,
  "message": "Movie updated successfully",
  "data": {
    "_id": "...",
    "title": "The Dark Knight",
    "rating": 9.5,
    ...
  }
}
```

**Test Without Token (Should Fail):**
Expected: `401 Unauthorized`

---

### 6. Delete Movie (Requires Auth)

**Request:**
```http
DELETE http://localhost:5000/api/movies/<movie-id>
Authorization: Bearer <your-token-here>
```

**Expected Response:**
```json
{
  "success": true,
  "message": "Movie deleted successfully",
  "data": {}
}
```

**Test Without Token (Should Fail):**
Expected: `401 Unauthorized`

---

## Sample Movie Data

### Sample 1: Inception
```json
{
  "title": "Inception",
  "description": "A skilled thief is given a chance at redemption if he can perform the impossible task of inception: planting an idea in someone's mind.",
  "genre": "Sci-Fi",
  "releaseDate": "2010-07-16",
  "duration": 148,
  "rating": 8.8,
  "posterImage": "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_.jpg",
  "trailerUrl": "https://www.youtube.com/watch?v=YoHD9XEInc0"
}
```

### Sample 2: The Matrix
```json
{
  "title": "The Matrix",
  "description": "A computer hacker learns from mysterious rebels about the true nature of his reality and his role in the war against its controllers.",
  "genre": "Sci-Fi",
  "releaseDate": "1999-03-31",
  "duration": 136,
  "rating": 8.7,
  "posterImage": "https://m.media-amazon.com/images/M/MV5BNzQzOTk3OTAtNDQ0Zi00ZTVkLWI0MTEtMDllZjNkYzNjNTc4L2ltYWdlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_.jpg",
  "trailerUrl": "https://www.youtube.com/watch?v=vKQi3bBA1y8"
}
```

### Sample 3: Pulp Fiction
```json
{
  "title": "Pulp Fiction",
  "description": "The lives of two mob hitmen, a boxer, a gangster and his wife, and a pair of diner bandits intertwine in four tales of violence and redemption.",
  "genre": "Drama",
  "releaseDate": "1994-10-14",
  "duration": 154,
  "rating": 8.9,
  "posterImage": "https://m.media-amazon.com/images/M/MV5BNGNhMDIzZTUtNTBlZi00MTRlLWFjM2ItYzViMjE3Yz5WRjY4XkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_.jpg",
  "trailerUrl": "https://www.youtube.com/watch?v=s7EdQ4FqbhY"
}
```

## Testing with curl

### Login
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@movie.com","password":"admin123"}'
```

### Get All Movies
```bash
curl http://localhost:5000/api/movies
```

### Create Movie
```bash
curl -X POST http://localhost:5000/api/movies \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <your-token>" \
  -d '{
    "title": "Test Movie",
    "description": "Test description",
    "genre": "Action",
    "releaseDate": "2024-01-01",
    "duration": 120,
    "rating": 8.0,
    "posterImage": "https://example.com/poster.jpg"
  }'
```

## Common Errors

### 401 Unauthorized
- Token missing or invalid
- Token expired
- Solution: Login again to get new token

### 400 Bad Request
- Missing required fields
- Invalid data format
- Solution: Check request body

### 404 Not Found
- Invalid movie ID
- Route doesn't exist
- Solution: Verify URL and ID

### 500 Internal Server Error
- Server error
- Database connection issue
- Solution: Check server logs

## Testing Checklist

- [ ] Login and get token
- [ ] Get all movies (public)
- [ ] Create movie (with auth)
- [ ] Create movie (without auth) - should fail
- [ ] Get single movie
- [ ] Update movie (with auth)
- [ ] Update movie (without auth) - should fail
- [ ] Delete movie (with auth)
- [ ] Delete movie (without auth) - should fail
- [ ] Filter by genre
- [ ] Sort by rating
- [ ] Test validation errors (missing fields, invalid data)
