# 🛠️ Tech Stack - Food Delivery Application

Complete list of technologies, frameworks, libraries, and services used in this project.

---

## 📱 Frontend Technologies

### Core Framework
- **React** `^18.2.0` - UI library for building user interfaces
- **React DOM** `^18.2.0` - React renderer for web browsers
- **React Router DOM** `^7.9.6` - Client-side routing and navigation

### Build Tools & Development
- **Vite** `^7.2.4` - Fast build tool and development server
- **@vitejs/plugin-react** `^4.2.0` - Vite plugin for React support
- **TypeScript Types** - Type definitions for React (`@types/react`, `@types/react-dom`)

### Styling
- **Tailwind CSS** `^3.4.18` - Utility-first CSS framework
- **PostCSS** `^8.5.6` - CSS post-processor
- **Autoprefixer** `^10.4.22` - Automatically adds vendor prefixes to CSS

### Production Server
- **Serve** `^14.2.1` - Static file server for production builds

---

## 🔧 Backend Technologies

### Core Framework
- **Node.js** - JavaScript runtime environment
- **Express** `^4.18.2` - Web application framework for Node.js

### Database & Backend Services
- **Supabase** `@supabase/supabase-js ^2.84.0`
  - PostgreSQL database (hosted on Supabase)
  - Supabase Auth (authentication service)
  - Row Level Security (RLS) for data protection
  - RESTful API client

### Middleware & Utilities
- **CORS** `^2.8.5` - Cross-Origin Resource Sharing middleware
- **dotenv** `^16.4.5` - Environment variable management

### Development Tools
- **Nodemon** `^3.1.0` - Auto-restart server during development

---

## 🗄️ Database & Storage

### Database
- **PostgreSQL** (via Supabase)
  - Hosted on Supabase cloud infrastructure
  - Tables: `User`, `vendors`
  - UUID primary keys
  - Row Level Security (RLS) enabled

### Authentication
- **Supabase Auth**
  - Email/password authentication
  - Session management
  - Password hashing (handled by Supabase)
  - JWT tokens for API authentication

---

## ☁️ Cloud Services & Deployment

### Hosting Platform
- **Render** - Cloud hosting platform
  - Backend service: `29-team-rocket` (Node.js)
  - Frontend service: `food-delivery-frontend` (Static site)
  - Auto-deployment on Git push
  - Free tier available

### Database Hosting
- **Supabase Cloud**
  - PostgreSQL database hosting
  - Authentication service
  - API endpoints
  - Real-time capabilities (available but not currently used)

---

## 🔐 Security & Authentication

### Authentication Flow
- **Supabase Auth** for user authentication
- **JWT Tokens** (Supabase session tokens)
- **Bearer Token** authentication for API routes
- **Role-Based Access Control (RBAC)**
  - Roles: `CUSTOMER`, `RESTAURANT_OWNER`, `ADMIN`, `DELIVERY_PARTNER`

### Security Features
- Password hashing (handled by Supabase)
- Environment variable protection (`.env` in `.gitignore`)
- CORS configuration
- Row Level Security (RLS) in database

---

## 📦 Package Management

- **npm** - Node Package Manager
- **package.json** - Dependency management
- **package-lock.json** - Locked dependency versions

---

## 🛠️ Development Tools

### Code Quality
- **ESLint** (implicit via Vite/React setup)
- **Git** - Version control
- **GitHub** - Code repository hosting

### Build Process
- **Vite Build** - Production build tool
- **PostCSS Processing** - CSS transformation
- **Autoprefixer** - Browser compatibility

---

## 📁 Project Structure

```
29-team-rocket/
├── src/                    # Frontend React code
│   ├── api/               # API service layer
│   ├── components/        # React components
│   ├── context/           # React Context (Auth)
│   └── contexts/           # Additional contexts
├── server/                  # Backend Express code
│   └── src/
│       ├── controllers/   # Request handlers
│       ├── middleware/    # Express middleware
│       ├── routes/        # API routes
│       └── utils/         # Utility functions
├── package.json           # Frontend dependencies
├── server/package.json    # Backend dependencies
├── vite.config.js         # Vite configuration
├── tailwind.config.js     # Tailwind CSS configuration
└── render.yaml            # Render deployment config
```

---

## 🔄 API Architecture

### RESTful API Design
- **Express.js** routes
- **REST conventions** (GET, POST, PUT, DELETE)
- **JSON** request/response format

### API Endpoints

#### Authentication
- `POST /api/auth/signup` - User registration
- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout
- `GET /api/auth/me` - Get current user

#### Vendors
- `POST /api/vendors` - Create vendor
- `GET /api/vendors` - List vendors
- `GET /api/vendors/:id` - Get vendor by ID
- `PUT /api/vendors/:id` - Update vendor
- `DELETE /api/vendors/:id` - Delete vendor

#### Health Check
- `GET /api/health` - Server health status

---

## 🎨 Frontend Architecture

### State Management
- **React Context API** - Global state (authentication)
- **Local State** - Component-level state with `useState`
- **Local Storage** - Token persistence

### Routing
- **React Router DOM** - Client-side routing
- **Protected Routes** - Authentication-based access control
- **Role-Based Routes** - Vendor vs Customer routes

### Component Structure
- Functional components with React Hooks
- Component composition
- Reusable UI components

---

## 🚀 Deployment

### Backend Deployment
- **Platform**: Render
- **Service Type**: Web Service (Node.js)
- **Region**: Singapore
- **Auto-deploy**: On Git push
- **URL**: `https://two9-team-rocket.onrender.com`

### Frontend Deployment
- **Platform**: Render
- **Service Type**: Web Service (Static Site)
- **Build Tool**: Vite
- **Server**: Serve (static file server)
- **Auto-deploy**: On Git push

### Environment Variables
- **Local**: `.env` files (not in Git)
- **Production**: Render Dashboard environment variables

---

## 📊 Technology Summary Table

| Category | Technology | Version | Purpose |
|----------|-----------|---------|---------|
| **Frontend Framework** | React | 18.2.0 | UI library |
| **Routing** | React Router DOM | 7.9.6 | Client-side routing |
| **Build Tool** | Vite | 7.2.4 | Build & dev server |
| **Styling** | Tailwind CSS | 3.4.18 | CSS framework |
| **Backend Framework** | Express | 4.18.2 | Web server |
| **Runtime** | Node.js | Latest | JavaScript runtime |
| **Database** | PostgreSQL | (via Supabase) | Data storage |
| **Auth Service** | Supabase Auth | 2.84.0 | Authentication |
| **Hosting** | Render | - | Cloud hosting |
| **Database Host** | Supabase | - | Database hosting |

---

## 🔮 Previously Used (Now Removed)

### Migration History
- **Prisma** - Previously used ORM (migrated to Supabase)
- **Firebase** - Briefly considered (not implemented)
- **SQLite** - Initial local database (migrated to PostgreSQL)
- **bcrypt** - Password hashing (now handled by Supabase)
- **jsonwebtoken** - JWT creation (now handled by Supabase)

---

## 📝 Configuration Files

- `package.json` - Frontend dependencies
- `server/package.json` - Backend dependencies
- `vite.config.js` - Vite build configuration
- `tailwind.config.js` - Tailwind CSS configuration
- `postcss.config.js` - PostCSS configuration
- `render.yaml` - Render deployment blueprint
- `.env` - Environment variables (local, not in Git)
- `.gitignore` - Git ignore rules

---

## 🎯 Key Features Enabled

✅ **User Authentication** - Signup, login, logout  
✅ **Role-Based Access** - Customer, Vendor, Admin roles  
✅ **Protected Routes** - Authentication-based routing  
✅ **Vendor Management** - CRUD operations for vendors  
✅ **Responsive Design** - Tailwind CSS for mobile/tablet/desktop  
✅ **API Integration** - RESTful API with Express  
✅ **Cloud Database** - Supabase PostgreSQL  
✅ **Auto-Deployment** - Git push triggers Render deployment  
✅ **Environment Management** - Secure env variable handling  

---

## 📚 Learning Resources

- [React Documentation](https://react.dev/)
- [Vite Documentation](https://vitejs.dev/)
- [Tailwind CSS Documentation](https://tailwindcss.com/)
- [Express.js Documentation](https://expressjs.com/)
- [Supabase Documentation](https://supabase.com/docs)
- [Render Documentation](https://render.com/docs)

---

**Last Updated**: November 2024  
**Project**: Food Delivery Application  
**Team**: 29-team-rocket

