# 🚀 Quick Start Guide

## ⚡ 5-Minute Setup

### 1. Backend (Terminal 1)

```bash
cd backend
npm install

# Create .env file with this content:
# PORT=5000
# MONGODB_URI=mongodb://localhost:27017/blog_admin
# JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
# JWT_EXPIRE=7d

node scripts/createAdmin.js
npm start
```

### 2. Frontend (Terminal 2)

```bash
cd frontend
npm install

# Optional: Create .env file with:
# REACT_APP_API_URL=http://localhost:5000/api

npm start
```

### 3. Login

- Open: http://localhost:3000
- Email: `admin@blog.com`
- Password: `admin123`

## ✅ That's It!

You now have a fully functional blog admin panel!

## 📋 What You Can Do

1. **Create Categories** - Go to Categories page
2. **Add Blogs** - Go to Add Blog page
3. **Manage Blogs** - View, edit, delete from All Blogs
4. **Dashboard** - See statistics and recent blogs

## 🔧 Troubleshooting

**MongoDB not running?**
- Windows: Start MongoDB service
- Mac/Linux: `mongod` in terminal
- Or use MongoDB Atlas (cloud)

**Port already in use?**
- Change PORT in backend `.env`
- Or kill the process using the port

**Can't login?**
- Make sure you ran `node scripts/createAdmin.js`
- Check backend is running
- Check MongoDB connection

## 📚 More Info

- See `README.md` for full documentation
- See `SETUP_GUIDE.md` for detailed setup
- See `PROJECT_STRUCTURE.md` for code structure

---

**Need help?** Check the console/terminal for error messages!

