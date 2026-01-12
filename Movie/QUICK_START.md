# 🚀 Quick Start Guide

Get your Movie Website up and running in 5 minutes!

## Prerequisites Checklist

- [ ] Node.js installed (v14+)
- [ ] MongoDB installed and running
- [ ] Code editor (VS Code recommended)

## Step-by-Step Setup

### 1️⃣ Install Backend Dependencies

```bash
cd backend
npm install
```

### 2️⃣ Configure Backend

Create `.env` file in `backend` folder:

```bash
# Copy the example file
cp .env.example .env
```

Or manually create `backend/.env`:
```env
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/movieDB
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
DEFAULT_ADMIN_EMAIL=admin@movie.com
DEFAULT_ADMIN_PASSWORD=admin123
```

### 3️⃣ Start MongoDB

**Windows:**
```bash
mongod
```

**macOS/Linux:**
```bash
sudo systemctl start mongod
# or
mongod
```

**Using MongoDB Atlas (Cloud):**
- Update `MONGODB_URI` in `.env` with your Atlas connection string

### 4️⃣ Start Backend Server

```bash
cd backend
npm run dev
```

✅ You should see:
```
✅ MongoDB Connected: ...
🚀 Server running on port 5000
✅ Default admin created
```

### 5️⃣ Install Frontend Dependencies

Open a **new terminal**:

```bash
cd frontend
npm install
```

### 6️⃣ Start Frontend

```bash
npm start
```

✅ React app opens at `http://localhost:3000`

## 🎉 You're Ready!

1. **Visit:** http://localhost:3000
2. **Login:** Click "Admin Login"
   - Email: `admin@movie.com`
   - Password: `admin123`
3. **Add Movies:** Click "Add Movie" after logging in
4. **Browse:** View all movies on the home page

## 🧪 Test the API

Use Thunder Client or Postman:

1. **Login:**
   ```
   POST http://localhost:5000/api/auth/login
   Body: {"email": "admin@movie.com", "password": "admin123"}
   ```

2. **Copy the token** from response

3. **Create Movie:**
   ```
   POST http://localhost:5000/api/movies
   Headers: Authorization: Bearer <your-token>
   Body: { ... movie data ... }
   ```

See `API_TESTING_GUIDE.md` for complete examples.

## 🐛 Troubleshooting

### MongoDB Connection Error
- Check if MongoDB is running: `mongod --version`
- Verify connection string in `.env`
- Try: `mongodb://127.0.0.1:27017/movieDB`

### Port Already in Use
- Change `PORT` in backend `.env`
- Or kill process: `netstat -ano | findstr :5000` (Windows)

### CORS Error
- Ensure backend is running on port 5000
- Check `FRONTEND_URL` in backend `.env`

### Module Not Found
- Delete `node_modules` and `package-lock.json`
- Run `npm install` again

## 📚 Next Steps

- Read `README.md` for full documentation
- Check `API_TESTING_GUIDE.md` for API examples
- Explore the code structure
- Customize the UI colors in `frontend/src/index.css`

## 🎬 Sample Movie Data

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

---

**Happy Coding! 🎉**
