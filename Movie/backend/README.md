# Backend API Documentation

## Quick Start

1. Install dependencies:
```bash
npm install
```

2. Create `.env` file:
```env
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/movieDB
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
DEFAULT_ADMIN_EMAIL=admin@movie.com
DEFAULT_ADMIN_PASSWORD=admin123
```

3. Start MongoDB

4. Run server:
```bash
npm run dev
```

## API Endpoints Summary

| Method | Endpoint | Auth Required | Description |
|--------|----------|---------------|-------------|
| POST | `/api/auth/login` | No | Admin login |
| POST | `/api/auth/register` | No | Register admin |
| GET | `/api/movies` | No | Get all movies |
| GET | `/api/movies/:id` | No | Get single movie |
| POST | `/api/movies` | Yes | Create movie |
| PUT | `/api/movies/:id` | Yes | Update movie |
| DELETE | `/api/movies/:id` | Yes | Delete movie |

## Folder Structure Explanation

### `config/database.js`
- Handles MongoDB connection
- Uses Mongoose to connect
- Exports `connectDB` function

### `models/`
- **Movie.js**: Defines movie schema with validation
- **Admin.js**: Defines admin schema with password hashing

### `controllers/`
- **authController.js**: Handles login/register logic
- **movieController.js**: Handles CRUD operations

### `routes/`
- **authRoutes.js**: Auth endpoints
- **movieRoutes.js**: Movie endpoints with protection

### `middleware/`
- **auth.js**: JWT verification middleware

### `server.js`
- Main entry point
- Sets up Express app
- Configures middleware
- Connects to database
- Initializes default admin

## Code Explanation

### MVC Pattern
- **Models**: Data structure (MongoDB schemas)
- **Views**: Not applicable (API only)
- **Controllers**: Business logic (handling requests)
- **Routes**: URL endpoints mapping

### Authentication Flow
1. User sends email/password to `/api/auth/login`
2. Server validates credentials
3. If valid, generates JWT token
4. Token sent to client
5. Client includes token in `Authorization` header for protected routes
6. Middleware verifies token before allowing access

### Password Security
- Passwords hashed with bcrypt before saving
- Never stored in plain text
- `comparePassword` method compares hashed passwords

### Error Handling
- Try-catch blocks in controllers
- Validation errors returned with 400 status
- Server errors returned with 500 status
- 404 for not found resources
- 401 for unauthorized access
