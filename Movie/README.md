# 🎬 Full-Stack Movie Website

A complete MERN stack application for managing and browsing movies with admin authentication.

## 📋 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Installation](#installation)
- [Configuration](#configuration)
- [Running the Application](#running-the-application)
- [API Documentation](#api-documentation)
- [MongoDB Schema](#mongodb-schema)
- [Testing APIs](#testing-apis)

## ✨ Features

### Backend
- ✅ RESTful API with Express.js
- ✅ MongoDB database with Mongoose
- ✅ Admin authentication with JWT
- ✅ Protected routes (only admins can add/edit/delete)
- ✅ Input validation and error handling
- ✅ CORS enabled for frontend communication

### Frontend
- ✅ React.js with modern UI
- ✅ Movie browsing with genre filtering
- ✅ Movie details page
- ✅ Add/Edit/Delete movies (admin only)
- ✅ Responsive design
- ✅ Loading and error states
- ✅ React Router for navigation

## 🛠 Tech Stack

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM for MongoDB
- **JWT** - Authentication tokens
- **bcryptjs** - Password hashing
- **CORS** - Cross-origin resource sharing

### Frontend
- **React.js** - UI library
- **React Router** - Routing
- **Axios** - HTTP client
- **CSS3** - Styling

## 📁 Project Structure

```
Movie/
├── backend/
│   ├── config/
│   │   └── database.js          # MongoDB connection
│   ├── controllers/
│   │   ├── authController.js    # Admin login/register
│   │   └── movieController.js   # Movie CRUD operations
│   ├── middleware/
│   │   └── auth.js              # JWT authentication middleware
│   ├── models/
│   │   ├── Admin.js             # Admin schema
│   │   └── Movie.js             # Movie schema
│   ├── routes/
│   │   ├── authRoutes.js        # Auth endpoints
│   │   └── movieRoutes.js      # Movie endpoints
│   ├── server.js                # Express server entry point
│   └── package.json
│
├── frontend/
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.js        # Navigation component
│   │   │   └── MovieCard.js     # Movie card component
│   │   ├── pages/
│   │   │   ├── Home.js          # Home page (all movies)
│   │   │   ├── MovieDetails.js  # Movie details page
│   │   │   ├── AddMovie.js      # Add movie form
│   │   │   ├── EditMovie.js     # Edit movie form
│   │   │   └── Login.js         # Admin login
│   │   ├── services/
│   │   │   └── api.js           # API service (Axios)
│   │   ├── App.js               # Main app component
│   │   ├── App.css
│   │   ├── index.js             # React entry point
│   │   └── index.css            # Global styles
│   └── package.json
│
└── README.md
```

## 🚀 Installation

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local installation or MongoDB Atlas account)
- npm or yarn

### Step 1: Clone the Repository
```bash
git clone <repository-url>
cd Movie
```

### Step 2: Install Backend Dependencies
```bash
cd backend
npm install
```

### Step 3: Install Frontend Dependencies
```bash
cd ../frontend
npm install
```

## ⚙️ Configuration

### Backend Configuration

1. Create a `.env` file in the `backend` directory:
```bash
cd backend
cp .env.example .env
```

2. Edit `.env` with your configuration:
```env
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/movieDB
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
DEFAULT_ADMIN_EMAIL=admin@movie.com
DEFAULT_ADMIN_PASSWORD=admin123
```

**Important Notes:**
- Change `JWT_SECRET` to a random string in production
- Update `MONGODB_URI` if using MongoDB Atlas
- Change default admin credentials after first login

### Frontend Configuration

1. Create a `.env` file in the `frontend` directory (optional):
```env
REACT_APP_API_URL=http://localhost:5000/api
```

If not set, it defaults to `http://localhost:5000/api`

## 🏃 Running the Application

### Start MongoDB
Make sure MongoDB is running on your system:
```bash
# Windows
mongod

# macOS/Linux
sudo systemctl start mongod
# or
mongod
```

### Start Backend Server
```bash
cd backend
npm run dev
```
Server will run on `http://localhost:5000`

### Start Frontend Development Server
```bash
cd frontend
npm start
```
Frontend will run on `http://localhost:3000`

## 📚 API Documentation

### Base URL
```
http://localhost:5000/api
```

### Authentication Endpoints

#### Login Admin
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "admin@movie.com",
  "password": "admin123"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "admin": {
    "id": "507f1f77bcf86cd799439011",
    "email": "admin@movie.com",
    "name": "Admin"
  }
}
```

#### Register Admin (Optional)
```http
POST /api/auth/register
Content-Type: application/json

{
  "email": "newadmin@movie.com",
  "password": "password123",
  "name": "New Admin"
}
```

### Movie Endpoints

#### Get All Movies
```http
GET /api/movies
```

**Query Parameters:**
- `genre` - Filter by genre (optional)
- `sortBy` - Sort field (default: createdAt)
- `order` - Sort order: asc or desc (default: desc)

**Example:**
```http
GET /api/movies?genre=Action&sortBy=rating&order=desc
```

**Response:**
```json
{
  "success": true,
  "count": 10,
  "data": [
    {
      "_id": "507f1f77bcf86cd799439011",
      "title": "Inception",
      "description": "A mind-bending thriller...",
      "genre": "Sci-Fi",
      "releaseDate": "2010-07-16T00:00:00.000Z",
      "duration": 148,
      "rating": 8.8,
      "posterImage": "https://example.com/poster.jpg",
      "trailerUrl": "https://youtube.com/watch?v=...",
      "createdAt": "2024-01-01T00:00:00.000Z",
      "updatedAt": "2024-01-01T00:00:00.000Z"
    }
  ]
}
```

#### Get Single Movie
```http
GET /api/movies/:id
```

**Response:**
```json
{
  "success": true,
  "data": {
    "_id": "507f1f77bcf86cd799439011",
    "title": "Inception",
    ...
  }
}
```

#### Create Movie (Admin Only)
```http
POST /api/movies
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "The Matrix",
  "description": "A computer hacker learns about the true nature of reality...",
  "genre": "Sci-Fi",
  "releaseDate": "1999-03-31",
  "duration": 136,
  "rating": 8.7,
  "posterImage": "https://example.com/matrix-poster.jpg",
  "trailerUrl": "https://youtube.com/watch?v=..."
}
```

#### Update Movie (Admin Only)
```http
PUT /api/movies/:id
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "The Matrix Reloaded",
  "rating": 7.2
}
```

#### Delete Movie (Admin Only)
```http
DELETE /api/movies/:id
Authorization: Bearer <token>
```

## 🗄 MongoDB Schema

### Movie Schema
```javascript
{
  title: String (required, max 200 chars)
  description: String (required, max 2000 chars)
  genre: String (required, enum: Action, Comedy, Drama, Horror, etc.)
  releaseDate: Date (required)
  duration: Number (required, 1-600 minutes)
  rating: Number (required, 0-10)
  posterImage: String (required, valid URL)
  trailerUrl: String (optional, valid URL)
  createdAt: Date (auto-generated)
  updatedAt: Date (auto-generated)
}
```

### Admin Schema
```javascript
{
  email: String (required, unique, valid email)
  password: String (required, min 6 chars, hashed)
  name: String (optional, default: "Admin")
  createdAt: Date (auto-generated)
  updatedAt: Date (auto-generated)
}
```

## 🧪 Testing APIs

### Using Thunder Client / Postman

#### 1. Test Login
1. Create new request: `POST http://localhost:5000/api/auth/login`
2. Headers: `Content-Type: application/json`
3. Body (JSON):
```json
{
  "email": "admin@movie.com",
  "password": "admin123"
}
```
4. Copy the `token` from response

#### 2. Test Get All Movies
1. Create new request: `GET http://localhost:5000/api/movies`
2. No authentication required
3. Send request

#### 3. Test Create Movie
1. Create new request: `POST http://localhost:5000/api/movies`
2. Headers:
   - `Content-Type: application/json`
   - `Authorization: Bearer <your-token>`
3. Body (JSON):
```json
{
  "title": "The Dark Knight",
  "description": "Batman faces the Joker...",
  "genre": "Action",
  "releaseDate": "2008-07-18",
  "duration": 152,
  "rating": 9.0,
  "posterImage": "https://example.com/dark-knight.jpg",
  "trailerUrl": "https://youtube.com/watch?v=..."
}
```

#### 4. Test Update Movie
1. Create new request: `PUT http://localhost:5000/api/movies/<movie-id>`
2. Headers:
   - `Content-Type: application/json`
   - `Authorization: Bearer <your-token>`
3. Body (JSON) - only include fields to update:
```json
{
  "rating": 9.5
}
```

#### 5. Test Delete Movie
1. Create new request: `DELETE http://localhost:5000/api/movies/<movie-id>`
2. Headers: `Authorization: Bearer <your-token>`
3. Send request

### Sample Movie Data
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

## 🔐 Authentication Flow

1. Admin logs in via `/api/auth/login`
2. Server returns JWT token
3. Frontend stores token in `localStorage`
4. For protected routes, frontend sends token in `Authorization` header:
   ```
   Authorization: Bearer <token>
   ```
5. Backend middleware verifies token
6. If valid, request proceeds; if invalid, returns 401

## 🎨 UI Features

- **Dark Theme**: Movie-theater style dark UI
- **Responsive Design**: Works on desktop, tablet, and mobile
- **Movie Cards**: Beautiful card layout with posters
- **Genre Filtering**: Filter movies by genre
- **Rating Display**: Visual rating indicators
- **Loading States**: Spinner animations during API calls
- **Error Handling**: User-friendly error messages

## 📝 Notes

- Default admin credentials are created automatically on server start
- Change default credentials in production
- JWT tokens expire after 30 days
- All passwords are hashed using bcrypt
- CORS is configured to allow frontend origin

## 🐛 Troubleshooting

### MongoDB Connection Error
- Ensure MongoDB is running
- Check `MONGODB_URI` in `.env`
- Verify MongoDB port (default: 27017)

### CORS Error
- Check `FRONTEND_URL` in backend `.env`
- Ensure frontend URL matches React app URL

### Authentication Error
- Verify token is included in Authorization header
- Check token hasn't expired
- Ensure JWT_SECRET matches

### Port Already in Use
- Change `PORT` in backend `.env`
- Or kill process using the port

## 📄 License

This project is open source and available for educational purposes.

---

**Built with ❤️ using MERN Stack**
