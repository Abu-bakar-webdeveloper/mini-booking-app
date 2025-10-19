# Mini Booking App

A full-stack service booking application built with React, Node.js, Express, and MongoDB. Users can create accounts, make service bookings, and admins can manage bookings and users.

## Features

- **User Authentication**: Login/Register with JWT tokens
- **Role-based Access**: Admin and User roles with different permissions
- **Service Booking**: Users can create and manage service bookings
- **Admin Panel**: Admins can view all bookings and manage users
- **Responsive Design**: Modern UI built with Tailwind CSS
- **Real-time Notifications**: Toast notifications for user feedback

## Tech Stack

### Frontend
- React 19.1.1
- Redux Toolkit (State Management)
- React Router DOM (Routing)
- Tailwind CSS (Styling)
- Axios (HTTP Client)
- React Toastify (Notifications)

### Backend
- Node.js
- Express.js
- MongoDB with Mongoose
- JWT Authentication
- bcryptjs (Password Hashing)
- CORS enabled

## Prerequisites

- Node.js (v16 or higher)
- MongoDB (local or cloud instance)
- npm or yarn

## Setup Instructions

### 1. Clone the Repository

```bash
git clone <your-repo-url>
cd mini-booking-app
```

### 2. Backend Setup

```bash
# Navigate to server directory
cd server

# Install dependencies
npm install

# Create environment file
cp .env.example .env
```

**Configure your `.env` file:**
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/mini-booking-app
JWT_SECRET=your-super-secret-jwt-key
NODE_ENV=development
```

**Start the server:**
```bash
# Development mode
npm run dev

# Or if you have nodemon installed
nodemon server.js
```

The server will run on `http://localhost:5000`

### 3. Frontend Setup

```bash
# Navigate to client directory (from project root)
cd client

# Install dependencies
npm install

# Create environment file
cp .env.example .env
```

**Configure your `.env` file:**
```env
VITE_API_URL=http://localhost:5000/api
```

**Start the development server:**
```bash
npm run dev
```

The client will run on `http://localhost:5173`

### 4. Database Setup

Make sure MongoDB is running on your system:

```bash
# Start MongoDB (if installed locally)
mongod

# Or use MongoDB Atlas (cloud)
# Update MONGODB_URI in your .env file
```

### 5. Seed Admin User (Optional)

To create an admin user for testing:

```bash
# From the server directory
node src/utils/seedAdmin.js
```

This will create an admin user with:
- Email: `admin@servicebooking.com`
- Password: `admin123`

## Usage

### For Users
1. **Register**: Create a new account at `/register`
2. **Login**: Sign in at `/login`
3. **Create Booking**: Navigate to "New Booking" to create a service booking
4. **View Bookings**: See all your bookings in the dashboard

### For Admins
1. **Login**: Use admin credentials to sign in
2. **Admin Panel**: Access `/admin` to manage all bookings and users
3. **User Management**: Create and manage user accounts
4. **Booking Management**: Update booking statuses

## API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/me` - Get current user
- `GET /api/auth/logout` - User logout

### Bookings
- `GET /api/bookings` - Get all bookings (admin) or user's bookings
- `POST /api/bookings` - Create new booking
- `GET /api/bookings/:id` - Get booking by ID
- `PUT /api/bookings/:id/status` - Update booking status (admin)

### Users
- `GET /api/users` - Get all users (admin)
- `POST /api/users/managers` - Create manager (admin)
- `DELETE /api/users/managers/:id` - Delete manager (admin)

## Project Structure

```
mini-booking-app/
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/     # Reusable components
│   │   │   ├── Auth/       # Login/Signup components
│   │   │   ├── Booking/    # Booking-related components
│   │   │   └── Layout/     # Layout components
│   │   ├── pages/          # Page components
│   │   ├── store/          # Redux store and slices
│   │   ├── hooks/          # Custom hooks
│   │   └── utils/          # Utility functions
│   └── package.json
├── server/                 # Node.js backend
│   ├── src/
│   │   ├── controllers/    # Route controllers
│   │   ├── models/         # MongoDB models
│   │   ├── routes/         # API routes
│   │   ├── middleware/     # Custom middleware
│   │   ├── config/         # Database configuration
│   │   └── utils/          # Utility functions
│   └── package.json
└── README.md
```

## Development

### Running in Development Mode

1. **Start MongoDB** (if using local instance)
2. **Start Backend**: `cd server && npm run dev`
3. **Start Frontend**: `cd client && npm run dev`

### Building for Production

```bash
# Build frontend
cd client
npm run build

# The built files will be in client/dist/
```

## Environment Variables

### Server (.env)
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/mini-booking-app
JWT_SECRET=your-super-secret-jwt-key
NODE_ENV=development
```

### Client (.env)
```env
VITE_API_URL=http://localhost:5000/api
```

## Troubleshooting

### Common Issues

1. **MongoDB Connection Error**
   - Ensure MongoDB is running
   - Check your MONGODB_URI in .env file

2. **CORS Issues**
   - Verify the VITE_API_URL in client .env file
   - Check server CORS configuration

3. **Authentication Issues**
   - Clear browser cookies/localStorage
   - Check JWT_SECRET in server .env file

4. **Port Already in Use**
   - Change PORT in server .env file
   - Update VITE_API_URL accordingly

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.
