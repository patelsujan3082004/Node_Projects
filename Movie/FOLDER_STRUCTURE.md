# 📁 Complete Folder Structure

```
Movie/
│
├── 📄 README.md                    # Main documentation
├── 📄 QUICK_START.md               # Quick setup guide
├── 📄 CODE_EXPLANATION.md          # Detailed code explanation
├── 📄 API_TESTING_GUIDE.md         # API testing examples
├── 📄 FOLDER_STRUCTURE.md          # This file
├── 📄 .gitignore                   # Git ignore rules
│
├── 📂 backend/                     # Backend (Node.js + Express)
│   ├── 📄 package.json            # Backend dependencies
│   ├── 📄 server.js               # Express server entry point
│   ├── 📄 .env.example            # Environment variables template
│   ├── 📄 README.md               # Backend documentation
│   │
│   ├── 📂 config/                 # Configuration files
│   │   └── 📄 database.js         # MongoDB connection
│   │
│   ├── 📂 models/                 # MongoDB schemas
│   │   ├── 📄 Movie.js            # Movie schema
│   │   └── 📄 Admin.js            # Admin schema
│   │
│   ├── 📂 controllers/            # Business logic
│   │   ├── 📄 movieController.js  # Movie CRUD operations
│   │   └── 📄 authController.js   # Authentication logic
│   │
│   ├── 📂 routes/                 # API routes
│   │   ├── 📄 movieRoutes.js      # Movie endpoints
│   │   └── 📄 authRoutes.js       # Auth endpoints
│   │
│   └── 📂 middleware/             # Middleware functions
│       └── 📄 auth.js             # JWT authentication
│
└── 📂 frontend/                    # Frontend (React)
    ├── 📄 package.json            # Frontend dependencies
    ├── 📄 README.md               # Frontend documentation
    │
    ├── 📂 public/                 # Static files
    │   └── 📄 index.html          # HTML template
    │
    └── 📂 src/                    # React source code
        ├── 📄 index.js            # React entry point
        ├── 📄 index.css           # Global styles
        ├── 📄 App.js              # Main app component
        ├── 📄 App.css             # App styles
        │
        ├── 📂 components/         # Reusable components
        │   ├── 📄 Navbar.js       # Navigation bar
        │   ├── 📄 Navbar.css
        │   ├── 📄 MovieCard.js    # Movie card component
        │   └── 📄 MovieCard.css
        │
        ├── 📂 pages/              # Page components
        │   ├── 📄 Home.js         # Home page (all movies)
        │   ├── 📄 Home.css
        │   ├── 📄 MovieDetails.js # Movie details page
        │   ├── 📄 MovieDetails.css
        │   ├── 📄 AddMovie.js     # Add movie form
        │   ├── 📄 EditMovie.js    # Edit movie form
        │   ├── 📄 MovieForm.css   # Shared form styles
        │   ├── 📄 Login.js        # Admin login page
        │   └── 📄 Login.css
        │
        └── 📂 services/           # API services
            └── 📄 api.js          # Axios configuration
```

## 📊 File Count Summary

- **Backend:** 11 files
- **Frontend:** 18 files
- **Documentation:** 5 files
- **Total:** 34+ files

## 🗂 Directory Purposes

### Backend Structure

**`config/`**
- Database connection configuration
- Other app-wide settings

**`models/`**
- Mongoose schemas
- Define data structure and validation

**`controllers/`**
- Business logic
- Handle request/response
- Interact with models

**`routes/`**
- Define API endpoints
- Map URLs to controllers
- Apply middleware

**`middleware/`**
- Functions that run before controllers
- Authentication, validation, etc.

### Frontend Structure

**`components/`**
- Reusable UI components
- Can be used in multiple pages

**`pages/`**
- Full page components
- Route destinations

**`services/`**
- API communication
- External service integrations

**`public/`**
- Static assets
- HTML template

## 🔍 File Naming Conventions

- **Components:** PascalCase (e.g., `MovieCard.js`)
- **Utilities:** camelCase (e.g., `api.js`)
- **CSS:** Same as component (e.g., `MovieCard.css`)
- **Config:** lowercase (e.g., `database.js`)

## 📝 Key Files Explained

### Backend

**`server.js`**
- Entry point
- Starts Express server
- Connects to database
- Sets up routes

**`models/Movie.js`**
- Defines movie data structure
- Validation rules
- Schema definition

**`controllers/movieController.js`**
- CRUD operations
- Request handling
- Response formatting

**`middleware/auth.js`**
- JWT verification
- Route protection
- Admin authentication

### Frontend

**`App.js`**
- Main component
- Router setup
- Auth state management

**`services/api.js`**
- Axios configuration
- API functions
- Token management

**`pages/Home.js`**
- Movie listing
- Genre filtering
- Grid layout

**`components/MovieCard.js`**
- Movie preview
- Reusable card component

## 🎯 MVC Pattern

```
Model (models/)      → Data structure
View (pages/)        → User interface
Controller (controllers/) → Business logic
```

## 🔄 Data Flow

```
Frontend (React)
    ↓ HTTP Request
Backend Routes
    ↓
Middleware (Auth)
    ↓
Controllers
    ↓
Models
    ↓
MongoDB
    ↓ Response
Backend
    ↓ JSON
Frontend
```

## 📦 Dependencies Overview

### Backend (`backend/package.json`)
- `express` - Web framework
- `mongoose` - MongoDB ODM
- `jsonwebtoken` - JWT tokens
- `bcryptjs` - Password hashing
- `cors` - Cross-origin requests
- `dotenv` - Environment variables

### Frontend (`frontend/package.json`)
- `react` - UI library
- `react-router-dom` - Routing
- `axios` - HTTP client
- `react-scripts` - Build tools

## 🚀 Getting Started

1. Navigate to `backend/` → Install dependencies
2. Create `.env` file in `backend/`
3. Navigate to `frontend/` → Install dependencies
4. Start backend server
5. Start frontend server
6. Open browser → `http://localhost:3000`

See `QUICK_START.md` for detailed instructions.

---

**This structure follows industry best practices and is scalable for future enhancements!** 🎉
