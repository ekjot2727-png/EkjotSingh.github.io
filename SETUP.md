# 🚀 Luna Setup & Deployment Guide

## Complete Setup Instructions

### Step 1: Install Dependencies

```bash
# Install frontend dependencies
npm install

# Install backend dependencies
cd backend
npm install
cd ..
```

### Step 2: Configure Environment Variables

**Frontend** - Create/Update `.env` in root directory:
```
VITE_API_URL=http://localhost:5000/api
```

**Backend** - Create/Update `backend/.env`:
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/luna-health
JWT_SECRET=luna_secret_key_2024_change_me_in_production
NODE_ENV=development
```

### Step 3: Setup MongoDB

**Option A: Local MongoDB**
```bash
# Install MongoDB Community Edition (if not already installed)
# macOS: brew install mongodb-community
# Windows: Download from https://www.mongodb.com/try/download/community
# Linux: Follow official docs

# Start MongoDB service
mongod
```

**Option B: MongoDB Atlas (Cloud)**
1. Create account at https://www.mongodb.com/cloud/atlas
2. Create a cluster
3. Copy connection string
4. Update `MONGODB_URI` in `backend/.env` with your connection string

### Step 4: Seed Database

Populate with sample gynecologist data:

```bash
cd backend
node seed.js
cd ..
```

Expected output:
```
✅ Connected to MongoDB
🗑️  Cleared existing gynecologists
✅ Inserted 8 gynecologists
🎉 Database seeded successfully!
```

### Step 5: Start the Application

**Option A: Separate Terminals (Recommended)**

Terminal 1 - Backend:
```bash
cd backend
npm run dev
# Output: 🚀 Server running on http://localhost:5000
```

Terminal 2 - Frontend:
```bash
npm run dev
# Output: ➜  Local:   http://localhost:5173/
```

**Option B: Single Terminal (Windows PowerShell)**

```powershell
# Create a script file and run both concurrently
# Or run them manually in the same terminal with & operator
```

### Step 6: Verify Installation

1. **Backend Health Check**
   - Visit: http://localhost:5000/api/health
   - Should return: `{"status":"ok","message":"Luna Backend API is running"}`

2. **Frontend App**
   - Visit: http://localhost:5173
   - Should see Luna home page

3. **Gynecologist API**
   - Visit: http://localhost:5000/api/gynecologists
   - Should return list of 8 gynecologists in Jaipur

## Troubleshooting

### MongoDB Connection Error
```
Error: connect ECONNREFUSED 127.0.0.1:27017
```
**Solution**: Make sure MongoDB is running
```bash
# Check if MongoDB is running
mongosh

# Or start MongoDB
mongod
```

### CORS Error in Console
```
Access to XMLHttpRequest blocked by CORS policy
```
**Solution**: 
1. Make sure backend is running on port 5000
2. Check `VITE_API_URL` in `.env` matches backend URL
3. Backend has CORS enabled in server.js

### Port Already in Use
```
Error: listen EADDRINUSE: address already in use :::5000
```
**Solution**: Kill process on port 5000
```bash
# Windows
netstat -ano | findstr :5000
taskkill /PID <PID> /F

# macOS/Linux
lsof -i :5000
kill -9 <PID>
```

### Database Already Exists
Run seed.js will clear and repopulate:
```bash
cd backend
node seed.js
```

## Project Features Implementation

### ✅ Completed Features
- [x] Backend API with Express.js
- [x] MongoDB integration
- [x] Profile management API
- [x] Period tracking with logging
- [x] Chat API with knowledge base
- [x] Gynecologist directory (Jaipur)
- [x] Hygiene reminders system
- [x] Chatbot with doctor search
- [x] Frontend API service
- [x] Custom Luna favicon
- [x] Doctor recommendation feature

### 🔧 Backend Endpoints Status

| Method | Endpoint | Status |
|--------|----------|--------|
| GET | /api/health | ✅ Working |
| GET | /api/profile | ✅ Working |
| POST | /api/profile | ✅ Working |
| GET | /api/period-logs | ✅ Working |
| POST | /api/period-logs | ✅ Working |
| PUT | /api/period-logs/:id | ✅ Working |
| DELETE | /api/period-logs/:id | ✅ Working |
| GET | /api/chat/history | ✅ Working |
| POST | /api/chat/message | ✅ Working |
| DELETE | /api/chat/history | ✅ Working |
| GET | /api/gynecologists | ✅ Working |
| GET | /api/gynecologists/search | ✅ Working |
| GET | /api/gynecologists/:id | ✅ Working |
| GET | /api/hygiene | ✅ Working |
| POST | /api/hygiene | ✅ Working |
| PUT | /api/hygiene/:id | ✅ Working |
| DELETE | /api/hygiene/:id | ✅ Working |

## Testing the Application

### Test Chat with Doctor Search
1. Go to http://localhost:5173/chat
2. Type: "Find me a gynecologist in Jaipur"
3. Should display doctors with:
   - Name, specialty, rating
   - Area, phone number
   - Experience, fees
   - Services available

### Test Period Tracker
1. Go to http://localhost:5173/tracker
2. Click on a date
3. Log period details:
   - Flow level (light, medium, heavy)
   - Pain level (0-10)
   - Mood, symptoms
   - Notes
4. Data saved to MongoDB

### Test Profile
1. Go to http://localhost:5173 (Home)
2. Edit profile information
3. Save changes
4. Data persisted in database

## Deployment (Production)

### Frontend Deployment (Vercel/Netlify)
```bash
npm run build
# Upload dist/ folder to hosting service
```

Update `VITE_API_URL` to production backend URL

### Backend Deployment (Heroku/Railway)
1. Create account on hosting platform
2. Connect GitHub repository
3. Set environment variables:
   - `MONGODB_URI` (production Atlas URI)
   - `JWT_SECRET` (strong random key)
   - `NODE_ENV=production`

## Additional Resources

- [MongoDB Documentation](https://docs.mongodb.com/)
- [Express.js Guide](https://expressjs.com/)
- [React Documentation](https://react.dev/)
- [Vite Documentation](https://vitejs.dev/)

## Support

For issues or questions:
1. Check troubleshooting section above
2. Review backend logs: `npm run dev` output
3. Check browser console for frontend errors
4. Open GitHub issue with error details
