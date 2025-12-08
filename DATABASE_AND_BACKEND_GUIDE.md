# Database & Backend Setup Guide

## 📊 How to Access the Database

### Option 1: MongoDB Local Installation (Recommended for Development)

#### Step 1: Install MongoDB Community Edition
1. Download from: https://www.mongodb.com/try/download/community
2. Install using the default installer for Windows
3. MongoDB will be installed in `C:\Program Files\MongoDB\Server\<version>`

#### Step 2: Start MongoDB Service
```powershell
# Method 1: Start MongoDB as a Windows Service (Recommended)
# After installation, MongoDB runs automatically

# Method 2: Run MongoDB manually
mongod
# or
"C:\Program Files\MongoDB\Server\7.0\bin\mongod.exe"
```

#### Step 3: Connect to Your Database
```powershell
# Open a new terminal and use MongoDB CLI
mongo
# or 
mongosh  # (newer versions)
```

```javascript
// Once in MongoDB shell:
show dbs                           // Show all databases
use luna-health                    // Switch to luna-health database
db.profiles.find()                 // View all profiles
db.periodlogs.find()              // View all period logs
db.gynecologists.find()           // View all gynecologists
db.collections()                  // View all collections
```

---

### Option 2: MongoDB Atlas (Cloud-Based)

#### Step 1: Create MongoDB Atlas Account
1. Go to: https://www.mongodb.com/cloud/atlas
2. Sign up for a free account
3. Create a new project

#### Step 2: Create a Cluster
1. Click "Create Database"
2. Choose "M0 Free" tier (free)
3. Select your region
4. Click "Create Cluster"

#### Step 3: Get Connection String
1. Click "Connect" on your cluster
2. Choose "Drivers"
3. Copy the connection string
4. Update your `.env` file:

```env
MONGODB_URI=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/luna-health?retryWrites=true&w=majority
```

#### Step 4: Allow Network Access
1. Go to "Network Access"
2. Click "Add IP Address"
3. Click "Allow Access from Anywhere" (for development only)
4. Confirm

#### Step 5: Create Database User
1. Go to "Database Users"
2. Click "Add Database User"
3. Set username and password
4. Use these credentials in your connection string

---

## 🔧 Backend Setup & Error Fixes

### Current Backend Configuration

Your backend is configured with:
- **Server Port**: 5000
- **Database**: MongoDB (luna-health)
- **Environment**: Development
- **API Base**: `http://localhost:5000/api`

### Backend Files Structure
```
backend/
├── server.js                  # Express server setup
├── .env                       # Environment variables
├── .env.example              # Example env file
├── package.json              # Dependencies
├── seed.js                   # Database seeding script
├── controllers/              # Business logic
│   ├── chat.controller.js
│   ├── profile.controller.js
│   ├── periodLog.controller.js
│   ├── gynecologist.controller.js
│   └── hygiene.controller.js
├── models/                   # MongoDB schemas
│   ├── ChatMessage.model.js
│   ├── Profile.model.js
│   ├── PeriodLog.model.js
│   ├── Gynecologist.model.js
│   └── HygieneReminder.model.js
└── routes/                   # API endpoints
    ├── chat.routes.js
    ├── profile.routes.js
    ├── periodLog.routes.js
    ├── gynecologist.routes.js
    └── hygiene.routes.js
```

---

## ✅ Startup Checklist

### Before Starting Backend:

- [ ] Node.js v18+ installed (`node --version`)
- [ ] npm installed (`npm --version`)
- [ ] MongoDB running locally OR MongoDB Atlas account set up
- [ ] Backend dependencies installed (`cd backend && npm install`)
- [ ] `.env` file configured with correct `MONGODB_URI`

### Starting the Backend

**Terminal 1 - Start Backend Server:**
```powershell
cd backend
npm run dev          # Start with auto-reload (development)
# OR
npm start            # Start normally (production)
```

Expected output:
```
🚀 Server running on http://localhost:5000
📡 Environment: development
✅ MongoDB Connected Successfully
```

### If MongoDB Fails to Connect

If you see:
```
⚠️  MongoDB Connection Error: connect ECONNREFUSED
ℹ️  Running in memory mode - data will not persist
```

This means:
1. MongoDB is not running
2. OR the connection string in `.env` is wrong
3. The backend will still run but won't save data to database

**Solution**: Start MongoDB first!

---

## 🌱 Seeding the Database

To populate the database with sample gynecologists and other data:

```powershell
cd backend
node seed.js
```

This creates:
- 8 sample gynecologists in Jaipur
- Sample period logs
- Sample hygiene reminders

---

## 🧪 Testing the Backend

### 1. Check Server Health
```powershell
curl http://localhost:5000/api/health
```

Expected response:
```json
{
  "status": "ok",
  "message": "Luna Backend API is running",
  "timestamp": "2024-12-08T10:30:00.000Z"
}
```

### 2. Get Gynecologists
```powershell
curl http://localhost:5000/api/gynecologists
```

### 3. Get Chat History
```powershell
curl http://localhost:5000/api/chat/history
```

### 4. Create a Period Log
```powershell
$body = @{
    date = "2024-12-08"
    flowIntensity = "moderate"
    symptoms = @("cramps", "fatigue")
    mood = "stressed"
} | ConvertTo-Json

Invoke-WebRequest -Uri "http://localhost:5000/api/period-logs" `
    -Method Post `
    -ContentType "application/json" `
    -Body $body
```

---

## 🐛 Common Backend Errors & Fixes

### Error 1: MongoDB Connection Refused
**Symptom**: `ECONNREFUSED ::1:27017`
**Cause**: MongoDB not running
**Fix**:
```powershell
# Start MongoDB
mongod
# OR if installed as service:
net start MongoDB
```

### Error 2: Port 5000 Already in Use
**Symptom**: `EADDRINUSE: address already in use :::5000`
**Cause**: Another process using port 5000
**Fix**:
```powershell
# Kill process on port 5000
Get-Process node | Stop-Process -Force
# OR change port in .env:
PORT=5001
```

### Error 3: Module Not Found
**Symptom**: `Cannot find module 'express'`
**Cause**: Dependencies not installed
**Fix**:
```powershell
cd backend
npm install
```

### Error 4: Syntax Errors in Controllers
**Symptom**: `SyntaxError: Unexpected token`
**Cause**: JavaScript syntax error in a file
**Fix**:
1. Check the error line number
2. Open that file and look for missing brackets, semicolons, quotes
3. All export statements must be: `export const functionName = ...`

---

## 📝 Environment Variables

Create or update `backend/.env`:

```env
# Server Configuration
PORT=5000
NODE_ENV=development

# MongoDB Configuration
# Option A: Local MongoDB
MONGODB_URI=mongodb://localhost:27017/luna-health

# Option B: MongoDB Atlas (uncomment to use)
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/luna-health?retryWrites=true&w=majority

# JWT Configuration
JWT_SECRET=luna_secret_key_2024_change_me_in_production
```

---

## 📡 API Endpoints Reference

### Profile Endpoints
```
GET    /api/profile              - Get user profile
POST   /api/profile              - Create/update profile
DELETE /api/profile              - Delete profile
```

### Period Log Endpoints
```
GET    /api/period-logs          - Get all period logs
POST   /api/period-logs          - Create new period log
PUT    /api/period-logs/:id      - Update period log
DELETE /api/period-logs/:id      - Delete period log
```

### Chat Endpoints
```
GET    /api/chat/history         - Get chat history
POST   /api/chat/message         - Send message to chatbot
DELETE /api/chat/history         - Clear chat history
```

### Gynecologist Endpoints
```
GET    /api/gynecologists        - Get all gynecologists
GET    /api/gynecologists/:id    - Get gynecologist by ID
GET    /api/gynecologists/search?q=name - Search gynecologists
```

### Hygiene Reminder Endpoints
```
GET    /api/hygiene              - Get all reminders
POST   /api/hygiene              - Create reminder
PUT    /api/hygiene/:id          - Update reminder
DELETE /api/hygiene/:id          - Delete reminder
```

---

## 🚀 Complete Startup Process

**Step 1: Terminal 1 - Start MongoDB**
```powershell
mongod
# Output should show: [initandlisten] waiting for connections on port 27017
```

**Step 2: Terminal 2 - Start Backend**
```powershell
cd c:\Users\Ekjot singh\Desktop\website-keerti\luna-insight-guide\backend
npm run dev
# Output should show: 🚀 Server running on http://localhost:5000
```

**Step 3: Terminal 3 - Start Frontend**
```powershell
cd c:\Users\Ekjot singh\Desktop\website-keerti\luna-insight-guide
npm run dev
# Output should show: ✓ built in Xs, ready to preview at http://localhost:5173
```

**Step 4: Open Browser**
```
http://localhost:5173
```

---

## 💡 Tips for Development

1. **Keep MongoDB running** in a separate terminal
2. **Use `npm run dev`** for backend (auto-reload with nodemon)
3. **Check console logs** - they show errors clearly
4. **Test endpoints with Postman or curl** before using in frontend
5. **Seed database regularly** to reset to clean data: `node seed.js`

---

## 📞 Troubleshooting

If backend still has issues:

1. **Check backend logs** - they show the exact error
2. **Verify .env file** - make sure MONGODB_URI is correct
3. **Restart MongoDB** - sometimes connection issues need a fresh start
4. **Clear node_modules** - if installation was corrupted:
   ```powershell
   cd backend
   rm -r node_modules
   npm install
   ```
5. **Check Node version** - must be v18+:
   ```powershell
   node --version
   ```

---

## ✨ Database Views

Once connected to MongoDB, you can view data using MongoDB Compass (free GUI):
1. Download: https://www.mongodb.com/products/compass
2. Connect to: `mongodb://localhost:27017`
3. Browse collections visually

Or using the MongoDB shell commands above.
