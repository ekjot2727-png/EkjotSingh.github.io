# 🚀 Luna Quick Start Guide

## Installation & Setup (5 minutes)

### For Windows Users:
```powershell
# 1. Run the installation script
.\install.ps1

# 2. (Optional) Seed database with doctor data
cd backend
node seed.js
cd ..

# 3. Start development servers
.\start-dev.ps1
```

### For macOS/Linux Users:
```bash
# 1. Run the installation script
chmod +x install.sh
./install.sh

# 2. (Optional) Seed database with doctor data
cd backend
node seed.js
cd ..

# 3. Start servers in separate terminals
# Terminal 1:
cd backend && npm run dev

# Terminal 2:
npm run dev
```

### Manual Setup:

1. **Install Dependencies**
```bash
npm install
cd backend && npm install && cd ..
```

2. **Create .env files**

Frontend (.env):
```
VITE_API_URL=http://localhost:5000/api
```

Backend (backend/.env):
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/luna-health
JWT_SECRET=luna_secret_key_2024
NODE_ENV=development
```

3. **Start MongoDB**
```bash
mongod
```

4. **Start Servers**
```bash
# Terminal 1 - Backend
cd backend && npm run dev

# Terminal 2 - Frontend
npm run dev
```

5. **Access the App**
- Frontend: http://localhost:5173
- Backend API: http://localhost:5000/api

## 🧪 Testing the Application

### Test 1: Chat with Doctor Search
1. Navigate to "Ask Luna" tab
2. Type: "Find me a gynecologist in Jaipur"
3. You should see 5 gynecologists with:
   - ⭐ Rating (4.5-5.0)
   - 📍 Location & Area
   - 📞 Phone number
   - 💰 Consultation fee
   - 📋 Services offered

### Test 2: Period Tracking
1. Go to "Tracker" tab
2. Click on a date
3. Log details:
   - Select flow level
   - Set pain level (1-10)
   - Add mood & symptoms
4. Click Save
5. Data saved to MongoDB ✅

### Test 3: Profile Management
1. Go to Home page
2. Edit your profile:
   - Name, age
   - Cycle length (default 28)
   - Period length (default 5)
3. Save changes
4. Data persists in database ✅

### Test 4: API Health Check
Open in browser: http://localhost:5000/api/health

Should return:
```json
{
  "status": "ok",
  "message": "Luna Backend API is running",
  "timestamp": "2024-12-08T..."
}
```

## 📱 Features Overview

### Chat (AI Health Assistant)
- Answer menstrual health questions
- Search for gynecologists in Jaipur
- Provide health tips and information

### Period Tracker
- Log period start/end dates
- Track flow, pain, mood, symptoms
- View cycle calendar
- Get next period predictions

### Gynecologist Directory
- Browse doctors in Jaipur
- View ratings, experience, fees
- See services and availability
- Get contact information

### Education
- Learn about periods, hygiene
- Read health myths vs facts
- Understand cycle phases

### Reminders
- Set hygiene reminders
- Get notifications
- Customize intervals

## 🎯 Key Endpoints

**Test these in your browser or API client:**

```
GET http://localhost:5000/api/health
GET http://localhost:5000/api/gynecologists
GET http://localhost:5000/api/profile?userId=default-user
GET http://localhost:5000/api/period-logs?userId=default-user
GET http://localhost:5000/api/chat/history?userId=default-user
```

## 🐛 Troubleshooting

### MongoDB not running?
```bash
# Make sure MongoDB service is active
# Windows: Services app > MongoDB Server
# macOS: brew services list
# Linux: sudo systemctl status mongod
```

### Backend not connecting?
- Check if backend is running on port 5000
- Check browser console for CORS errors
- Verify `.env` API URL matches

### Port already in use?
```bash
# Windows
netstat -ano | findstr :5000
taskkill /PID <PID> /F

# macOS/Linux
lsof -i :5000
kill -9 <PID>
```

### Still having issues?
See `SETUP.md` for detailed troubleshooting guide.

## 📚 Project Structure

```
luna-insight-guide/
├── backend/
│   ├── controllers/      ← Business logic
│   ├── models/          ← MongoDB schemas
│   ├── routes/          ← API endpoints
│   ├── server.js        ← Express app
│   ├── seed.js          ← Database seeder
│   └── package.json
├── src/
│   ├── components/      ← React components
│   ├── pages/          ← Page components
│   ├── lib/
│   │   └── api.ts      ← API service
│   └── types/          ← TypeScript types
└── public/             ← Static files
```

## 🚀 Ready to Deploy?

### Frontend (Vercel/Netlify)
```bash
npm run build
# Upload 'dist' folder to hosting
```

### Backend (Heroku/Railway/Render)
```bash
# Push to Git
git push origin main

# Set environment variables on hosting platform:
MONGODB_URI=your_atlas_uri
JWT_SECRET=strong_secret
NODE_ENV=production
```

## 💡 Tips

- Keep MongoDB running while developing
- Check browser console for frontend errors
- Check terminal for backend logs
- Seed database after fresh installation
- Use API endpoints directly to test backend

## 🎉 You're All Set!

Start building amazing menstrual health features! 

For questions: Check SETUP.md or review API documentation in backend/README.md
