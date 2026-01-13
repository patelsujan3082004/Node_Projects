# Blog Admin Panel - Complete Full-Stack Project

A complete blog administration panel built with React.js frontend and Node.js/Express backend with MongoDB.

## 🚀 Features

- **Admin Authentication**: JWT-based secure login system
- **Blog Management**: Full CRUD operations (Create, Read, Update, Delete)
- **Category Management**: Create and manage blog categories
- **Image Upload**: Upload and manage blog images using Multer
- **Protected Routes**: Secure admin routes with JWT middleware
- **Responsive Design**: Modern, professional UI that works on all devices
- **Search & Filter**: Search blogs by title and filter by category

## 📁 Project Structure

```
blog-final_project/
├── backend/
│   ├── config/
│   │   └── multer.js          # Multer configuration for file uploads
│   ├── controllers/
│   │   ├── authController.js  # Authentication logic
│   │   ├── blogController.js  # Blog CRUD operations
│   │   └── categoryController.js # Category CRUD operations
│   ├── middleware/
│   │   └── authMiddleware.js  # JWT authentication middleware
│   ├── models/
│   │   ├── Admin.js           # Admin user model
│   │   ├── Blog.js             # Blog post model
│   │   └── Category.js         # Category model
│   ├── routes/
│   │   ├── authRoutes.js       # Authentication routes
│   │   ├── blogRoutes.js       # Blog routes
│   │   └── categoryRoutes.js   # Category routes
│   ├── scripts/
│   │   └── createAdmin.js      # Script to create initial admin
│   ├── uploads/                # Uploaded images folder (created automatically)
│   ├── .env                    # Environment variables
│   ├── .gitignore
│   ├── package.json
│   └── server.js               # Main server file
│
└── frontend/
    ├── public/
    │   └── index.html
    ├── src/
    │   ├── components/
    │   │   ├── Navbar.js       # Top navigation bar
    │   │   ├── ProtectedRoute.js # Route protection component
    │   │   └── Sidebar.js      # Sidebar navigation
    │   ├── pages/
    │   │   ├── Login.js        # Admin login page
    │   │   ├── Dashboard.js   # Dashboard with statistics
    │   │   ├── AddBlog.js     # Add new blog page
    │   │   ├── EditBlog.js    # Edit blog page
    │   │   ├── AllBlogs.js    # List all blogs
    │   │   └── Categories.js  # Category management
    │   ├── utils/
    │   │   └── api.js          # Axios API configuration
    │   ├── App.js              # Main app component with routing
    │   ├── App.css             # Main styles
    │   ├── index.js            # React entry point
    │   └── index.css           # Global styles
    ├── .gitignore
    └── package.json
```

## 🛠️ Technology Stack

### Backend
- **Node.js**: JavaScript runtime
- **Express.js**: Web framework
- **MongoDB**: Database
- **Mongoose**: MongoDB object modeling
- **JWT**: JSON Web Tokens for authentication
- **bcryptjs**: Password hashing
- **Multer**: File upload handling
- **CORS**: Cross-origin resource sharing

### Frontend
- **React.js**: UI library
- **React Router**: Routing
- **Axios**: HTTP client
- **Bootstrap 5**: CSS framework
- **React Bootstrap**: Bootstrap components for React

## 📦 Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local installation or MongoDB Atlas)
- npm or yarn

### Step 1: Clone or Download the Project

```bash
cd blog-final_project
```

### Step 2: Backend Setup

1. Navigate to backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file (already created, but verify):
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/blog_admin
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
JWT_EXPIRE=7d
```

4. Make sure MongoDB is running:
   - If using local MongoDB: Start MongoDB service
   - If using MongoDB Atlas: Update `MONGODB_URI` in `.env` with your connection string

5. Create initial admin user:
```bash
node scripts/createAdmin.js
```

This will create an admin with:
- **Email**: admin@blog.com
- **Password**: admin123

**⚠️ Important**: Change the password after first login!

6. Start the backend server:
```bash
npm start
```

Or for development with auto-reload:
```bash
npm run dev
```

The backend will run on `http://localhost:5000`

### Step 3: Frontend Setup

1. Open a new terminal and navigate to frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file (optional, defaults to localhost:5000):
```env
REACT_APP_API_URL=http://localhost:5000/api
```

4. Start the frontend development server:
```bash
npm start
```

The frontend will run on `http://localhost:3000`

## 🎯 Usage

### Accessing the Admin Panel

1. Open your browser and go to `http://localhost:3000`
2. You will be redirected to the login page
3. Login with:
   - **Email**: admin@blog.com
   - **Password**: admin123

### Features Overview

#### Dashboard
- View statistics (total blogs, categories)
- See recent blogs
- Quick navigation to all features

#### Add Blog
- Create new blog posts
- Upload blog images
- Select category
- Add title, description, and author

#### All Blogs
- View all blog posts in a table
- Search blogs by title
- Filter by category
- Edit or delete blogs

#### Categories
- Create new categories
- Edit existing categories
- Delete categories
- Categories are used to organize blogs

## 🔐 API Endpoints

### Authentication
- `POST /api/auth/login` - Admin login
- `GET /api/auth/me` - Get current admin (protected)

### Blogs
- `GET /api/blogs` - Get all blogs (protected)
- `GET /api/blogs/:id` - Get single blog (protected)
- `POST /api/blogs` - Create blog (protected)
- `PUT /api/blogs/:id` - Update blog (protected)
- `DELETE /api/blogs/:id` - Delete blog (protected)

### Categories
- `GET /api/categories` - Get all categories (protected)
- `GET /api/categories/:id` - Get single category (protected)
- `POST /api/categories` - Create category (protected)
- `PUT /api/categories/:id` - Update category (protected)
- `DELETE /api/categories/:id` - Delete category (protected)

**Note**: All routes except `/api/auth/login` require JWT token in Authorization header:
```
Authorization: Bearer <token>
```

## 📝 Database Models

### Admin Model
```javascript
{
  username: String (unique, required)
  email: String (unique, required)
  password: String (hashed, required)
  name: String (required)
  timestamps: true
}
```

### Blog Model
```javascript
{
  title: String (required)
  description: String (required)
  category: ObjectId (ref: Category, required)
  image: String (required)
  author: String (required)
  views: Number (default: 0)
  status: String (enum: ['published', 'draft'])
  timestamps: true
}
```

### Category Model
```javascript
{
  name: String (unique, required)
  description: String
  slug: String (auto-generated)
  timestamps: true
}
```

## 🎨 Customization

### Changing Colors
Edit `frontend/src/App.css` to customize the color scheme:
- Primary color: `#3498db`
- Secondary color: `#2c3e50`
- Success color: `#27ae60`
- Danger color: `#e74c3c`

### Adding More Fields
To add more fields to blogs:
1. Update `backend/models/Blog.js` schema
2. Update `frontend/src/pages/AddBlog.js` and `EditBlog.js` forms
3. Update `backend/controllers/blogController.js` if needed

## 🐛 Troubleshooting

### Backend Issues

**MongoDB Connection Error**
- Ensure MongoDB is running
- Check `MONGODB_URI` in `.env` file
- Verify MongoDB connection string format

**Port Already in Use**
- Change `PORT` in `.env` file
- Or stop the process using port 5000

**Image Upload Not Working**
- Ensure `uploads` folder exists (created automatically)
- Check file size limits (5MB default)
- Verify Multer configuration

### Frontend Issues

**API Connection Error**
- Ensure backend is running on port 5000
- Check `REACT_APP_API_URL` in frontend `.env`
- Verify CORS is enabled in backend

**Login Not Working**
- Check if admin user exists (run `createAdmin.js`)
- Verify JWT_SECRET in backend `.env`
- Check browser console for errors

## 📄 License

This project is created for educational purposes.

## 👨‍💻 Development Notes

### Code Structure
- **MVC Pattern**: Backend follows Model-View-Controller architecture
- **Component-Based**: Frontend uses React component architecture
- **RESTful API**: Backend follows REST API conventions
- **Protected Routes**: Frontend routes protected with authentication check

### Security Features
- Password hashing with bcrypt
- JWT token-based authentication
- Protected API routes
- Secure file upload validation

### Best Practices
- Environment variables for configuration
- Error handling in all API endpoints
- Input validation
- Clean code structure
- Responsive design

## 🚀 Production Deployment

### Backend
1. Set strong `JWT_SECRET` in production
2. Use MongoDB Atlas or secure MongoDB instance
3. Set proper CORS origins
4. Use environment variables for all sensitive data
5. Enable HTTPS

### Frontend
1. Build production version: `npm run build`
2. Serve `build` folder with a web server
3. Update API URL for production
4. Enable HTTPS

## 📞 Support

For issues or questions:
1. Check the troubleshooting section
2. Verify all setup steps
3. Check console/terminal for error messages
4. Ensure all dependencies are installed

---

**Happy Coding! 🎉**

