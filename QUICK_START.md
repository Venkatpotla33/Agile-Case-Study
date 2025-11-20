# Quick Start Guide

## 🎯 Preview the Application

### Option 1: Static Preview (No Installation Required)
Open `PREVIEW.html` in your web browser to see a visual preview of the application UI.

**Windows:**
```powershell
start PREVIEW.html
```

**Or simply double-click `PREVIEW.html` in File Explorer**

### Option 2: Run the Full Application

#### Step 1: Install Node.js
- Download from: https://nodejs.org/
- Install Node.js 18+ (LTS version recommended)

#### Step 2: Install MongoDB
**Cloud (Recommended):**
- Sign up at: https://www.mongodb.com/cloud/atlas
- Create free cluster
- Get connection string

**Local:**
- Download from: https://www.mongodb.com/try/download/community
- Install and start service

#### Step 3: Setup Backend
```bash
cd backend
copy env.example .env
# Edit .env with your MongoDB connection string
npm install
npm run seed    # Creates demo data
npm run dev     # Starts on http://localhost:5000
```

#### Step 4: Setup Frontend (New Terminal)
```bash
cd frontend
npm install
npm run dev     # Starts on http://localhost:3000
```

#### Step 5: Access Application
- Open browser: http://localhost:3000
- Register a new account or login with:
  - Admin: `admin@zoomride.com` / `admin123`
  - User: `user@test.com` / `user123`

## 📋 Default Test Accounts (After Seeding)

**Admin Account:**
- Email: `admin@zoomride.com`
- Password: `admin123`
- Access: Full admin dashboard

**Regular User:**
- Email: `user@test.com`
- Password: `user123`
- Access: Search, book, view bookings

## 🎨 Application Features

### User Features
- ✅ Register/Login with email & password
- ✅ Search cars by city and date/time
- ✅ View detailed car information
- ✅ Create reservations
- ✅ Make payments (mocked)
- ✅ View booking history
- ✅ Responsive mobile/desktop UI

### Admin Features
- ✅ Dashboard with metrics
- ✅ Add/Edit/Delete cars
- ✅ View all bookings
- ✅ Monitor platform activity

## 🐛 Troubleshooting

**Port Already in Use:**
- Backend: Change `PORT` in `.env`
- Frontend: Vite auto-selects next port

**MongoDB Connection Failed:**
- Check connection string in `.env`
- Ensure MongoDB is running (if local)
- Verify network access (if Atlas)

**Module Not Found:**
- Delete `node_modules` folders
- Run `npm install` again

## 📚 Full Documentation
See `SETUP.md` for detailed setup instructions.
See `README.md` for project overview and architecture.

