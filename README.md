# Real-Time Chat Application

A modern real-time chat application built with React, Node.js, and Socket.IO. This project provides a WhatsApp-like experience with user authentication, real-time messaging, and user management features.

## 🚀 Features

### Core Functionality
- **Real-time messaging** with Socket.IO
- **User authentication** with JWT tokens
- **User registration and login** with email verification
- **User profile management** with avatar upload
- **Friend system** - add users to friends list
- **User search** functionality
- **Online/offline status** tracking
- **Typing indicators** in real-time
- **Emoji picker** for message composition
- **Responsive design** for desktop and mobile

### Technical Features
- **Secure authentication** with access and refresh tokens
- **File upload** for user avatars
- **Email verification** for new accounts
- **CORS configuration** for cross-origin requests
- **Error handling** with custom API errors
- **Input validation** with express-validator
- **State management** with Zustand

## 🛠️ Tech Stack

### Frontend
- **React 18** - UI framework
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **React Router DOM** - Client-side routing
- **Socket.IO Client** - Real-time communication
- **Axios** - HTTP client
- **Zustand** - State management
- **SCSS** - Styling with CSS modules
- **Emoji Picker React** - Emoji selection
- **React Icons** - Icon library

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **Socket.IO** - Real-time WebSocket server
- **MongoDB** - Database
- **Mongoose** - ODM for MongoDB
- **JWT** - Authentication tokens
- **bcryptjs** - Password hashing
- **Multer** - File upload handling
- **Nodemailer** - Email sending
- **Express Validator** - Input validation
- **CORS** - Cross-origin resource sharing

## 📁 Project Structure

```
chat/
├── client/                 # Frontend application
│   ├── src/
│   │   ├── components/     # React components
│   │   ├── store/         # Zustand stores
│   │   ├── services/      # API services
│   │   ├── models/        # TypeScript interfaces
│   │   ├── assets/        # Icons and images
│   │   └── UI/           # Reusable UI components
│   └── package.json
├── server/                # Backend application
│   ├── controllers/       # Route controllers
│   ├── routes/           # API routes
│   ├── models/           # Database models
│   ├── service/          # Business logic
│   ├── middlewares/      # Express middlewares
│   └── package.json
└── README.md
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- MongoDB database
- SMTP server for email verification

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd chat
   ```

2. **Install dependencies**
   ```bash
   # Install frontend dependencies
   cd client
   npm install
   
   # Install backend dependencies
   cd ../server
   npm install
   ```

3. **Environment Setup**

   **⚠️ SECURITY WARNING:** Never commit `.env` files to version control. Use `.env.example` files as templates.

   Create `.env` files in both `client/` and `server/` directories by copying the example files:

   ```bash
   # Copy example files
   cp server/.env.example server/.env
   cp client/.env.example client/.env
   ```

   **Server (.env)** - Update with your actual values:
   ```env
   NODE_ENV=development
   VITE_DB_URL=mongodb://localhost:27017/chat
   VITE_CLIENT_URL=http://localhost:5173
   VITE_PORT=5001
   VITE_SECRET_JWT_ACCESS_CODE=your_access_secret
   VITE_SECRET_JWT_REFRESH_CODE=your_refresh_secret
   VITE_SMTP_HOST=smtp.gmail.com
   VITE_SMTP_PORT=587
   VITE_SMTP_USER=your_email@gmail.com
   VITE_SMTP_PASSWORD=your_app_password
   ```

   **Client (.env)** - Update with your actual values:
   ```env
   VITE_API_URL=http://localhost:5001
   VITE_SOCKET_URL=http://localhost:5001
   ```

4. **Start the development servers**

   **Backend**
   ```bash
   cd server
   npm run dev
   ```

   **Frontend**
   ```bash
   cd client
   npm run dev
   ```

5. **Access the application**
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:5001

## 📚 API Documentation

### Authentication Endpoints

#### POST `/registration`
Register a new user
```json
{
  "username": "string",
  "email": "string",
  "password": "string"
}
```

#### POST `/login`
Login user
```json
{
  "email": "string",
  "password": "string"
}
```

#### POST `/logout`
Logout user (requires authentication)

#### GET `/refresh`
Refresh access token (requires refresh token in cookies)

#### GET `/activate/:link`
Activate user account via email link

### User Endpoints

#### GET `/users`
Get all users (requires authentication)

#### GET `/user/:username`
Find user by username (requires authentication)

#### PATCH `/user/:username`
Add user to friends list (requires authentication)

#### PUT `/user/:id`
Update user profile (requires authentication)

#### DELETE `/user/:id`
Delete user account (requires authentication)

### Message Endpoints

#### GET `/messages`
Get all messages (requires authentication)

#### POST `/messages`
Create new message (requires authentication)
```json
{
  "text": "string"
}
```

#### PUT `/messages/:id`
Update message (requires authentication)

#### DELETE `/messages/:id`
Delete message (requires authentication)

## 🔧 Development

### Available Scripts

**Frontend (client/)**
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

**Backend (server/)**
- `npm run dev` - Start development server with nodemon
- `npm run build` - Build TypeScript to JavaScript
- `npm start` - Start production server
- `npm run prod` - Build and start production

### Code Style
- TypeScript for type safety
- ESLint for code linting
- Prettier for code formatting
- SCSS modules for styling

## 🚀 Deployment

### Frontend Deployment
1. Build the project: `npm run build`
2. Deploy the `dist/` folder to your hosting service

### Backend Deployment
1. Set environment variables for production
2. Build the project: `npm run build`
3. Start the server: `npm start`

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the ISC License.

## 👨‍💻 Author

Created by [betterhell](https://github.com/betterhell)

---

**Note:** Make sure to configure your MongoDB database and SMTP settings before running the application in production.
