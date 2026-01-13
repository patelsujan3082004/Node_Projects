# Quick Setup Guide

## Prerequisites Check
- [ ] Node.js installed (v14+)
- [ ] MongoDB installed and running
- [ ] npm or yarn installed

## Step-by-Step Setup

### 1. Backend Setup (Terminal 1)

```bash
# Navigate to backend
cd backend

# Install dependencies
npm install

# Create .env file (copy from .env.example)
# Edit .env and set your MongoDB URI and JWT_SECRET

# Create admin user
node scripts/createAdmin.js

# Start server
npm start
```

**Expected Output:**
```
MongoDB Connected Successfully
Server is running on port 5000
```

### 2. Frontend Setup (Terminal 2)

```bash
# Navigate to frontend
cd frontend

# Install dependencies
npm install

# Create .env file (optional)
# REACT_APP_API_URL=http://localhost:5000/api

# Start development server
npm start
```

**Expected Output:**
```
Compiled successfully!
You can now view blog-admin-frontend in the browser.
  Local:            http://localhost:3000
```

### 3. Access the Application

1. Open browser: `http://localhost:3000`
2. Login with:
   - Email: `admin@blog.com`
   - Password: `admin123`

## Common Issues & Solutions

### Issue: MongoDB Connection Failed
**Solution:**
- Check if MongoDB is running: `mongod --version`
- Verify MongoDB URI in `.env`
- For Windows: Check MongoDB service in Services

### Issue: Port 5000 Already in Use
**Solution:**
- Change PORT in backend `.env` file
- Or kill process: `npx kill-port 5000` (Windows: `netstat -ano | findstr :5000` then `taskkill /PID <pid> /F`)

### Issue: npm install fails
**Solution:**
- Clear npm cache: `npm cache clean --force`
- Delete `node_modules` and `package-lock.json`
- Run `npm install` again

### Issue: CORS Error
**Solution:**
- Ensure backend is running
- Check `REACT_APP_API_URL` in frontend `.env`
- Verify CORS is enabled in `backend/server.js`

### Issue: Image Upload Not Working
**Solution:**
- Check if `uploads` folder exists in backend
- Verify file size (max 5MB)
- Check file type (only images allowed)

## Testing the Application

1. **Login Test**
   - Go to login page
   - Enter credentials
   - Should redirect to dashboard

2. **Create Category**
   - Go to Categories
   - Click "Add Category"
   - Fill form and submit

3. **Create Blog**
   - Go to "Add Blog"
   - Fill all fields
   - Upload image
   - Submit

4. **View Blogs**
   - Go to "All Blogs"
   - See your created blogs
   - Test search and filter

5. **Edit/Delete**
   - Click Edit on any blog
   - Make changes and save
   - Test delete with confirmation

## Default Admin Credentials

- **Email**: admin@blog.com
- **Password**: admin123

**⚠️ IMPORTANT**: Change password after first login for security!

## Next Steps

1. Create categories for your blogs
2. Add your first blog post
3. Customize the UI (colors, branding)
4. Add more features as needed

## Need Help?

1. Check `README.md` for detailed documentation
2. Check browser console for frontend errors
3. Check terminal for backend errors
4. Verify all environment variables are set correctly

