# Setup Guide - ZoomRide Platform

## Prerequisites Installation

### 1. Install Node.js
- Download Node.js 18+ from [https://nodejs.org/](https://nodejs.org/)
- Choose the LTS version for Windows
- Run the installer and follow the setup wizard
- Verify installation:
  ```bash
  node --version
  npm --version
  ```

### 2. Install MongoDB
**Option A: MongoDB Atlas (Cloud - Recommended)**
- Sign up at [https://www.mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)
- Create a free cluster
- Get your connection string (e.g., `mongodb+srv://username:password@cluster.mongodb.net/zoomride`)

**Option B: Local MongoDB**
- Download from [https://www.mongodb.com/try/download/community](https://www.mongodb.com/try/download/community)
- Install and start MongoDB service
- Default connection: `mongodb://localhost:27017/zoomride`

## Backend Setup

1. Navigate to backend directory:
   ```bash
   cd backend
   ```

2. Create environment file:
   ```bash
   copy env.example .env
   ```
   (On PowerShell: `Copy-Item env.example .env`)

3. Edit `.env` file with your MongoDB connection:
   ```
   PORT=5000
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your-super-secret-key-change-this
   JWT_EXPIRES_IN=1d
   SENDGRID_API_KEY=optional-for-now
   EMAIL_FROM=no-reply@zoomride.local
   ```

4. Install dependencies:
   ```bash
   npm install
   ```

5. Seed the database (optional - creates demo data):
   ```bash
   npm run seed
   ```
   This creates:
   - Admin user: `admin@zoomride.com` / `admin123`
   - Test user: `user@test.com` / `user123`
   - Sample cars in various cities

6. Start the backend server:
   ```bash
   npm run dev
   ```
   Server will run on `http://localhost:5000`

## Frontend Setup

1. Open a new terminal and navigate to frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```
   Frontend will run on `http://localhost:3000` (or next available port)

## Accessing the Application

1. **Frontend**: Open browser to `http://localhost:3000`
2. **Backend API**: Available at `http://localhost:5000/api`

## Testing the Application

### As a Regular User:
1. Register a new account at `/register`
2. Login at `/login`
3. Search for cars at `/search`
4. View car details and make a reservation
5. Complete payment (mocked)
6. View bookings at `/bookings`

### As an Admin:
1. Login with: `admin@zoomride.com` / `admin123`
2. Access admin dashboard at `/admin`
3. Add/edit/delete cars
4. View all bookings

## Troubleshooting

### Port Already in Use
- Backend: Change `PORT` in `.env` file
- Frontend: Vite will automatically use next available port

### MongoDB Connection Error
- Verify MongoDB is running (if local)
- Check connection string in `.env`
- Ensure network access is enabled (if using Atlas)

### CORS Errors
- Backend CORS is configured for `http://localhost:3000`
- If using different port, update `cors` settings in `backend/src/app.js`

### Module Not Found Errors
- Delete `node_modules` folders
- Run `npm install` again in both directories

## Project Structure Overview

```
.
├── backend/
│   ├── src/
│   │   ├── controllers/    # Request handlers
│   │   ├── models/         # MongoDB schemas
│   │   ├── routes/         # API endpoints
│   │   ├── middleware/     # Auth, error handling
│   │   ├── services/       # Business logic (notifications)
│   │   └── scripts/        # Database seeding
│   └── package.json
│
└── frontend/
    ├── src/
    │   ├── pages/          # Route pages
    │   ├── components/     # Reusable UI components
    │   ├── context/        # React context (Auth)
    │   ├── services/       # API client
    │   └── styles/         # Global styles
    └── package.json
```

## Next Steps After Setup

1. ✅ Both servers running
2. ✅ Database seeded with sample data
3. ✅ Test user registration and login
4. ✅ Explore car search and booking flow
5. ✅ Test admin dashboard features

Happy coding! 🚀

