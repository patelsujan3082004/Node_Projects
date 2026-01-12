# 📖 Code Explanation - Step by Step

This document explains how the Movie Website code works, making it beginner-friendly.

## 🏗 Architecture Overview

The application follows the **MERN Stack**:
- **M**ongoDB - Database
- **E**xpress.js - Backend framework
- **R**eact.js - Frontend library
- **N**ode.js - Runtime environment

The architecture uses **MVC (Model-View-Controller)** pattern:

```
Request → Route → Controller → Model → Database
                ↓
            Response ← Controller
```

---

## 🔷 Backend Explanation

### 1. Server Entry Point (`backend/server.js`)

**What it does:**
- Starts the Express server
- Connects to MongoDB
- Sets up middleware (CORS, body parser)
- Defines routes
- Creates default admin user

**Key Concepts:**
```javascript
// Load environment variables from .env file
require('dotenv').config();

// Create Express app
const app = express();

// Middleware: Functions that run before routes
app.use(cors());           // Allow frontend to access API
app.use(express.json());   // Parse JSON request bodies

// Routes: Map URLs to controller functions
app.use('/api/movies', movieRoutes);
```

**Flow:**
1. Server starts on port 5000
2. Connects to MongoDB
3. Creates default admin if doesn't exist
4. Listens for HTTP requests

---

### 2. Database Connection (`backend/config/database.js`)

**What it does:**
- Establishes connection to MongoDB
- Handles connection errors

**Key Concepts:**
```javascript
// Mongoose connects to MongoDB
mongoose.connect(MONGODB_URI)

// Returns a promise, so we use async/await
const conn = await mongoose.connect(...)
```

**Why async/await?**
- Database operations take time
- `await` waits for the operation to complete
- Prevents code from continuing before connection is ready

---

### 3. Models (Schemas)

#### Movie Model (`backend/models/Movie.js`)

**What it does:**
- Defines the structure of a Movie document
- Validates data before saving

**Key Concepts:**
```javascript
const movieSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,        // Must be provided
    trim: true,            // Remove whitespace
    maxlength: 200         // Maximum characters
  },
  rating: {
    type: Number,
    min: 0,                // Minimum value
    max: 10                // Maximum value
  }
});
```

**Schema vs Model:**
- **Schema**: Blueprint (defines structure)
- **Model**: Constructor (creates documents)

**Example:**
```javascript
// Schema defines structure
const movieSchema = { title: String, rating: Number }

// Model creates documents
const Movie = mongoose.model('Movie', movieSchema);

// Create a movie document
const movie = new Movie({ title: "Inception", rating: 8.8 });
await movie.save(); // Saves to MongoDB
```

---

#### Admin Model (`backend/models/Admin.js`)

**What it does:**
- Defines admin user structure
- Hashes passwords before saving

**Key Concepts:**
```javascript
// Pre-save hook: Runs before saving
adminSchema.pre('save', async function (next) {
  // Hash password before saving
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next(); // Continue saving
});
```

**Password Security:**
- Passwords are **never** stored in plain text
- bcrypt hashes passwords (one-way encryption)
- Even if database is compromised, passwords are safe

**Method:**
```javascript
// Instance method: Can be called on admin objects
adminSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};
```

---

### 4. Controllers (Business Logic)

#### Movie Controller (`backend/controllers/movieController.js`)

**What it does:**
- Handles CRUD operations
- Validates data
- Returns responses

**CRUD Operations:**

**Create:**
```javascript
const createMovie = async (req, res) => {
  // req.body contains data from request
  const { title, description, ... } = req.body;
  
  // Create movie in database
  const movie = await Movie.create({ title, description, ... });
  
  // Send response
  res.status(201).json({ success: true, data: movie });
};
```

**Read (Get All):**
```javascript
const getAllMovies = async (req, res) => {
  // Find all movies
  const movies = await Movie.find();
  
  // Send response
  res.json({ success: true, data: movies });
};
```

**Read (Get One):**
```javascript
const getMovieById = async (req, res) => {
  // req.params contains URL parameters
  const movie = await Movie.findById(req.params.id);
  
  if (!movie) {
    return res.status(404).json({ message: 'Not found' });
  }
  
  res.json({ success: true, data: movie });
};
```

**Update:**
```javascript
const updateMovie = async (req, res) => {
  // Find movie
  let movie = await Movie.findById(req.params.id);
  
  // Update fields
  movie.title = req.body.title || movie.title;
  movie.rating = req.body.rating || movie.rating;
  
  // Save changes
  await movie.save();
  
  res.json({ success: true, data: movie });
};
```

**Delete:**
```javascript
const deleteMovie = async (req, res) => {
  const movie = await Movie.findById(req.params.id);
  await movie.deleteOne(); // Remove from database
  res.json({ success: true });
};
```

---

#### Auth Controller (`backend/controllers/authController.js`)

**What it does:**
- Handles admin login
- Generates JWT tokens

**Login Flow:**
```javascript
const loginAdmin = async (req, res) => {
  // 1. Get email and password from request
  const { email, password } = req.body;
  
  // 2. Find admin by email
  const admin = await Admin.findOne({ email });
  
  // 3. Check if admin exists
  if (!admin) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }
  
  // 4. Compare password
  const isMatch = await admin.comparePassword(password);
  
  // 5. If match, generate token
  if (isMatch) {
    const token = generateToken(admin._id);
    res.json({ success: true, token });
  }
};
```

**JWT Token:**
- Stands for JSON Web Token
- Contains admin ID (encrypted)
- Expires after 30 days
- Used to verify admin identity

---

### 5. Middleware (`backend/middleware/auth.js`)

**What it does:**
- Protects routes
- Verifies JWT tokens
- Attaches admin info to request

**How it works:**
```javascript
const protect = async (req, res, next) => {
  // 1. Get token from header
  const token = req.headers.authorization.split(' ')[1];
  
  // 2. Verify token
  const decoded = jwt.verify(token, JWT_SECRET);
  
  // 3. Find admin
  req.admin = await Admin.findById(decoded.id);
  
  // 4. Continue to next middleware/controller
  next();
};
```

**Usage:**
```javascript
// Without protection (public)
router.get('/', getAllMovies);

// With protection (admin only)
router.post('/', protect, createMovie);
```

**Request Flow:**
```
Request → protect middleware → Controller
           ↓ (if token valid)
        Attach admin to req
           ↓
        Continue to controller
```

---

### 6. Routes (`backend/routes/`)

**What it does:**
- Maps URLs to controller functions
- Defines HTTP methods (GET, POST, PUT, DELETE)

**Movie Routes:**
```javascript
// GET /api/movies - Get all movies (public)
router.get('/', getAllMovies);

// GET /api/movies/:id - Get one movie (public)
router.get('/:id', getMovieById);

// POST /api/movies - Create movie (protected)
router.post('/', protect, createMovie);

// PUT /api/movies/:id - Update movie (protected)
router.put('/:id', protect, updateMovie);

// DELETE /api/movies/:id - Delete movie (protected)
router.delete('/:id', protect, deleteMovie);
```

**Route Parameters:**
- `:id` is a dynamic parameter
- Example: `/api/movies/123` → `req.params.id = "123"`

---

## 🔷 Frontend Explanation

### 1. App Component (`frontend/src/App.js`)

**What it does:**
- Sets up React Router
- Manages authentication state
- Renders main layout

**Key Concepts:**
```javascript
// State: Tracks if user is logged in
const [isAuthenticated, setIsAuthenticated] = useState(false);

// Check localStorage on app load
useEffect(() => {
  const token = localStorage.getItem('token');
  setIsAuthenticated(!!token);
}, []);

// Routes: Define pages
<Routes>
  <Route path="/" element={<Home />} />
  <Route path="/movie/:id" element={<MovieDetails />} />
</Routes>
```

**Protected Routes:**
```javascript
<Route
  path="/add-movie"
  element={
    isAuthenticated ? <AddMovie /> : <Navigate to="/login" />
  }
/>
```

**If not authenticated → Redirect to login**

---

### 2. API Service (`frontend/src/services/api.js`)

**What it does:**
- Configures Axios
- Adds token to requests automatically
- Handles errors

**Key Concepts:**
```javascript
// Create Axios instance
const api = axios.create({
  baseURL: 'http://localhost:5000/api'
});

// Request Interceptor: Runs before every request
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Response Interceptor: Runs after every response
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token invalid, redirect to login
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
  }
);
```

**API Functions:**
```javascript
// Get all movies
export const getAllMovies = () => api.get('/movies');

// Create movie
export const createMovie = (movieData) => api.post('/movies', movieData);
```

---

### 3. Pages

#### Home Page (`frontend/src/pages/Home.js`)

**What it does:**
- Fetches all movies on load
- Displays movies in grid
- Filters by genre

**Key Concepts:**
```javascript
// State: Stores movies
const [movies, setMovies] = useState([]);
const [loading, setLoading] = useState(true);

// useEffect: Runs when component mounts
useEffect(() => {
  fetchMovies();
}, []);

// Fetch movies from API
const fetchMovies = async () => {
  setLoading(true);
  const response = await getAllMovies();
  setMovies(response.data.data);
  setLoading(false);
};
```

**Rendering:**
```javascript
// Show loading spinner
if (loading) return <Spinner />;

// Show movies
return (
  <div className="movies-grid">
    {movies.map(movie => <MovieCard key={movie._id} movie={movie} />)}
  </div>
);
```

---

#### Movie Details Page (`frontend/src/pages/MovieDetails.js`)

**What it does:**
- Fetches single movie by ID
- Displays full details
- Shows edit/delete buttons (if admin)

**Key Concepts:**
```javascript
// Get ID from URL
const { id } = useParams();

// Fetch movie
useEffect(() => {
  fetchMovie();
}, [id]);

// Delete handler
const handleDelete = async () => {
  if (confirm('Are you sure?')) {
    await deleteMovie(id);
    navigate('/'); // Redirect to home
  }
};
```

---

#### Add/Edit Movie Pages

**What it does:**
- Form to add/edit movies
- Validates input
- Submits to API

**Key Concepts:**
```javascript
// Form state
const [formData, setFormData] = useState({
  title: '',
  description: '',
  ...
});

// Handle input change
const handleChange = (e) => {
  setFormData({
    ...formData,
    [e.target.name]: e.target.value
  });
};

// Submit form
const handleSubmit = async (e) => {
  e.preventDefault();
  await createMovie(formData);
  navigate('/');
};
```

---

### 4. Components

#### Movie Card (`frontend/src/components/MovieCard.js`)

**What it does:**
- Displays movie preview
- Links to details page

**Key Concepts:**
```javascript
// Receives movie as prop
const MovieCard = ({ movie }) => {
  return (
    <Link to={`/movie/${movie._id}`}>
      <img src={movie.posterImage} />
      <h3>{movie.title}</h3>
    </Link>
  );
};
```

**Props:**
- Data passed from parent to child
- `{ movie }` is destructuring
- Equivalent to `props.movie`

---

#### Navbar (`frontend/src/components/Navbar.js`)

**What it does:**
- Navigation menu
- Shows login/logout based on auth state

**Key Concepts:**
```javascript
const Navbar = ({ isAuthenticated, onLogout }) => {
  return (
    <nav>
      <Link to="/">Home</Link>
      {isAuthenticated ? (
        <>
          <Link to="/add-movie">Add Movie</Link>
          <button onClick={onLogout}>Logout</button>
        </>
      ) : (
        <Link to="/login">Login</Link>
      )}
    </nav>
  );
};
```

**Conditional Rendering:**
- `{condition ? <A /> : <B />}` - If condition true, render A, else B

---

## 🔄 Complete Request Flow

### Example: Adding a Movie

1. **User fills form** → `AddMovie.js`
2. **Clicks submit** → `handleSubmit()` called
3. **API call** → `createMovie(movieData)` from `api.js`
4. **Axios adds token** → Request interceptor adds `Authorization` header
5. **Request sent** → `POST http://localhost:5000/api/movies`
6. **Backend receives** → `server.js` routes to `movieRoutes.js`
7. **Middleware checks** → `protect` middleware verifies token
8. **Controller executes** → `createMovie()` in `movieController.js`
9. **Database saves** → `Movie.create()` saves to MongoDB
10. **Response sent** → `{ success: true, data: movie }`
11. **Frontend receives** → Response in `AddMovie.js`
12. **Redirect** → `navigate('/')` goes to home page

---

## 🎨 Styling Approach

**CSS Variables:**
```css
:root {
  --primary-color: #e50914;
  --bg-dark: #000000;
}
```

**Usage:**
```css
.button {
  background-color: var(--primary-color);
}
```

**Benefits:**
- Easy theme changes
- Consistent colors
- One place to update

---

## 🔐 Authentication Flow

1. **Login:**
   - User enters email/password
   - Frontend sends to `/api/auth/login`
   - Backend validates credentials
   - Returns JWT token
   - Frontend saves token to `localStorage`

2. **Protected Request:**
   - Frontend makes request
   - Axios interceptor adds token to header
   - Backend middleware verifies token
   - If valid → Continue
   - If invalid → Return 401

3. **Logout:**
   - Remove token from `localStorage`
   - Set `isAuthenticated` to false
   - Redirect to home

---

## 📝 Key JavaScript Concepts Used

### Async/Await
```javascript
// Handles asynchronous operations
const fetchMovies = async () => {
  const response = await getAllMovies(); // Wait for API call
  setMovies(response.data.data);
};
```

### Destructuring
```javascript
// Extract values from objects/arrays
const { title, rating } = movie;
const [first, second] = array;
```

### Spread Operator
```javascript
// Copy object/array
const newData = { ...formData, title: 'New Title' };
```

### Optional Chaining
```javascript
// Safe property access
error.response?.data?.message
```

### Template Literals
```javascript
// String interpolation
const url = `/movie/${movieId}`;
```

---

## 🎯 Best Practices Implemented

1. **Separation of Concerns**
   - Models handle data
   - Controllers handle logic
   - Routes handle routing

2. **Error Handling**
   - Try-catch blocks
   - User-friendly error messages
   - Proper HTTP status codes

3. **Security**
   - Password hashing
   - JWT tokens
   - Protected routes

4. **Code Organization**
   - MVC structure
   - Reusable components
   - Centralized API service

5. **User Experience**
   - Loading states
   - Error messages
   - Responsive design

---

## 🚀 Next Steps to Learn

1. **Add more features:**
   - Search functionality
   - Pagination
   - User reviews

2. **Improve security:**
   - Rate limiting
   - Input sanitization
   - HTTPS

3. **Enhance UI:**
   - Animations
   - Dark/light theme toggle
   - Better mobile experience

4. **Testing:**
   - Unit tests
   - Integration tests
   - E2E tests

---

**Happy Learning! 🎉**
