# Complete Project Structure

```
blog-final_project/
│
├── README.md                    # Main documentation
├── SETUP_GUIDE.md              # Quick setup instructions
├── PROJECT_STRUCTURE.md        # This file
│
├── backend/                     # Backend Node.js/Express API
│   ├── config/
│   │   └── multer.js           # Multer configuration for file uploads
│   │
│   ├── controllers/            # Business logic
│   │   ├── authController.js  # Login, get current admin
│   │   ├── blogController.js   # Blog CRUD operations
│   │   └── categoryController.js # Category CRUD operations
│   │
│   ├── middleware/
│   │   └── authMiddleware.js   # JWT token verification
│   │
│   ├── models/                 # MongoDB Mongoose models
│   │   ├── Admin.js            # Admin user schema
│   │   ├── Blog.js             # Blog post schema
│   │   └── Category.js         # Category schema
│   │
│   ├── routes/                 # API routes
│   │   ├── authRoutes.js       # /api/auth routes
│   │   ├── blogRoutes.js       # /api/blogs routes
│   │   └── categoryRoutes.js   # /api/categories routes
│   │
│   ├── scripts/
│   │   └── createAdmin.js      # Script to create initial admin
│   │
│   ├── uploads/                # Uploaded images (auto-created)
│   │
│   ├── .env                    # Environment variables
│   ├── .gitignore
│   ├── package.json
│   └── server.js               # Main server entry point
│
└── frontend/                    # React.js frontend
    ├── public/
    │   └── index.html          # HTML template
    │
    ├── src/
    │   ├── components/         # Reusable components
    │   │   ├── Navbar.js       # Top navigation bar
    │   │   ├── ProtectedRoute.js # Route protection
    │   │   └── Sidebar.js      # Sidebar navigation
    │   │
    │   ├── pages/              # Page components
    │   │   ├── Login.js        # Admin login page
    │   │   ├── Dashboard.js    # Dashboard with stats
    │   │   ├── AddBlog.js      # Create new blog
    │   │   ├── EditBlog.js     # Edit existing blog
    │   │   ├── AllBlogs.js     # List all blogs
    │   │   └── Categories.js   # Category management
    │   │
    │   ├── utils/
    │   │   └── api.js          # Axios API configuration
    │   │
    │   ├── App.js              # Main app with routing
    │   ├── App.css             # Main styles
    │   ├── index.js            # React entry point
    │   └── index.css           # Global styles
    │
    ├── .env                    # Frontend environment variables
    ├── .gitignore
    └── package.json
```

## File Descriptions

### Backend Files

**server.js**
- Main Express server
- MongoDB connection
- Middleware setup
- Route registration
- Static file serving for uploads

**models/**
- **Admin.js**: Admin user schema with password hashing
- **Blog.js**: Blog post schema with category reference
- **Category.js**: Category schema with auto-slug generation

**controllers/**
- **authController.js**: Login logic, token generation, get current admin
- **blogController.js**: All blog CRUD operations with image handling
- **categoryController.js**: All category CRUD operations

**routes/**
- **authRoutes.js**: Public login, protected getMe
- **blogRoutes.js**: All blog routes (protected, with multer)
- **categoryRoutes.js**: All category routes (protected)

**middleware/**
- **authMiddleware.js**: JWT token verification for protected routes

**config/**
- **multer.js**: File upload configuration, image validation, storage setup

**scripts/**
- **createAdmin.js**: Initial admin user creation script

### Frontend Files

**App.js**
- React Router setup
- Route definitions
- Protected route wrapping

**pages/**
- **Login.js**: Admin authentication form
- **Dashboard.js**: Statistics and recent blogs
- **AddBlog.js**: Create blog form with image upload
- **EditBlog.js**: Edit blog form with image preview
- **AllBlogs.js**: Blog list with search and filter
- **Categories.js**: Category CRUD with modal

**components/**
- **Sidebar.js**: Navigation sidebar with active state
- **Navbar.js**: Top bar with admin info
- **ProtectedRoute.js**: Route guard for authentication

**utils/**
- **api.js**: Axios instance with token injection and error handling

## Data Flow

1. **Authentication Flow**
   - User submits login form → Frontend sends to `/api/auth/login`
   - Backend validates credentials → Returns JWT token
   - Frontend stores token in localStorage
   - Token sent in Authorization header for protected routes

2. **Blog Creation Flow**
   - User fills form → Frontend creates FormData
   - POST to `/api/blogs` with image file
   - Backend validates, saves image, creates blog in DB
   - Returns created blog → Frontend redirects to list

3. **Image Upload Flow**
   - User selects image → Frontend shows preview
   - FormData sent to backend → Multer saves to `uploads/`
   - Image path stored in MongoDB → Served via Express static

## Key Features Implementation

### JWT Authentication
- Token generated on login
- Stored in localStorage
- Sent in Authorization header
- Verified by middleware on protected routes

### Image Upload
- Multer handles file uploads
- Images saved to `uploads/` folder
- Unique filenames prevent conflicts
- Image paths stored in database
- Served as static files

### Protected Routes
- Frontend: ProtectedRoute component checks token
- Backend: authMiddleware verifies JWT
- Auto-redirect to login if unauthorized

### Search & Filter
- Client-side filtering
- Search by title (case-insensitive)
- Filter by category
- Real-time updates

## Environment Variables

### Backend (.env)
- `PORT`: Server port (default: 5000)
- `MONGODB_URI`: MongoDB connection string
- `JWT_SECRET`: Secret key for JWT signing
- `JWT_EXPIRE`: Token expiration time

### Frontend (.env)
- `REACT_APP_API_URL`: Backend API URL

## Dependencies Summary

### Backend
- express: Web framework
- mongoose: MongoDB ODM
- jsonwebtoken: JWT handling
- bcryptjs: Password hashing
- multer: File uploads
- cors: Cross-origin requests
- dotenv: Environment variables

### Frontend
- react: UI library
- react-dom: React DOM rendering
- react-router-dom: Routing
- axios: HTTP client
- bootstrap: CSS framework
- react-bootstrap: Bootstrap components
- react-scripts: Create React App tooling

