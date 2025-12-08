# Quick Start - Database & Backend Access

## ✅ Your Backend is Running!

Backend Status: **🟢 RUNNING on http://localhost:5000**

---

## 📊 How to Access Your Database

### Option 1: Using MongoDB Compass (Visual GUI) - EASIEST
1. Download MongoDB Compass: https://www.mongodb.com/products/compass
2. Install it
3. Open Compass
4. Click "New Connection"
5. Connection string: `mongodb://localhost:27017`
6. Click "Connect"
7. You'll see all your databases and collections

---

### Option 2: MongoDB Shell (Command Line)

**Start MongoDB first** (if not running):
```powershell
mongod
```

**In a new terminal, open MongoDB CLI**:
```powershell
mongosh
```

**View your data**:
```javascript
// Switch to luna-health database
use luna-health

// View all gynecologists
db.gynecologists.find().pretty()

// View all profiles
db.profiles.find().pretty()

// View all period logs
db.periodlogs.find().pretty()

// View chat messages
db.chatmessages.find().pretty()

// Count documents
db.gynecologists.countDocuments()

// Search for something
db.gynecologists.findOne({ name: "Dr. Kavita Rajput" })
```

---

### Option 3: Using Your Frontend

Once both backend and frontend are running:
1. Open http://localhost:5173
2. Use the application to view and manage data
3. The frontend will call your backend API

---

## 🚀 Complete Startup (All Services)

### Terminal 1 - MongoDB
```powershell
mongod
```
Wait for: `[initandlisten] waiting for connections on port 27017`

### Terminal 2 - Backend (Already Running)
```powershell
cd backend
npm run dev
```
Backend is running on **http://localhost:5000**

### Terminal 3 - Frontend
```powershell
npm run dev
```
Frontend will run on **http://localhost:5173**

---

## 📊 Database Info

**Database Name**: `luna-health`

**Collections** (Tables):
- `gynecologists` - 8 doctors in Jaipur
- `profiles` - User profiles
- `periodlogs` - Period tracking logs
- `chatmessages` - Chat history
- `hygienereminders` - Reminder data

**Connection String**: `mongodb://localhost:27017/luna-health`

---

## 🧪 Test Your Backend

### Health Check (Verify it's working)
```powershell
curl http://localhost:5000/api/health
```

### Get All Gynecologists
```powershell
curl http://localhost:5000/api/gynecologists
```

### Send Chat Message
```powershell
$body = @{
    message = "Find me a gynecologist in Jaipur"
    userId = "test-user"
} | ConvertTo-Json

Invoke-WebRequest -Uri "http://localhost:5000/api/chat/message" `
    -Method Post `
    -ContentType "application/json" `
    -Body $body
```

---

## 🌱 Seed Sample Data

To populate database with sample gynecologists:
```powershell
cd backend
node seed.js
```

This creates 8 gynecologists and sample data automatically.

---

## ⚙️ Environment Variables

Your backend uses these settings (in `backend/.env`):

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/luna-health
NODE_ENV=development
```

**To use MongoDB Atlas instead** (cloud database):
1. Create free account: https://www.mongodb.com/cloud/atlas
2. Get connection string
3. Update in `backend/.env`:
```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/luna-health
```

---

## 📱 Frontend API Integration

Your frontend connects to backend at:
```
http://localhost:5000/api
```

API calls are in: `src/lib/api.ts`

---

## 🔗 All API Endpoints

**Profile**
- `GET /api/profile` - Get profile
- `POST /api/profile` - Create/update profile

**Period Logs**
- `GET /api/period-logs` - Get all logs
- `POST /api/period-logs` - Create log
- `PUT /api/period-logs/:id` - Update log
- `DELETE /api/period-logs/:id` - Delete log

**Chat**
- `GET /api/chat/history` - Get chat history
- `POST /api/chat/message` - Send message
- `DELETE /api/chat/history` - Clear history

**Gynecologists**
- `GET /api/gynecologists` - Get all doctors
- `GET /api/gynecologists/:id` - Get one doctor
- `GET /api/gynecologists/search?q=name` - Search doctors

**Hygiene**
- `GET /api/hygiene` - Get reminders
- `POST /api/hygiene` - Create reminder
- `PUT /api/hygiene/:id` - Update reminder
- `DELETE /api/hygiene/:id` - Delete reminder

---

## 🆘 If Backend Crashes

**Check backend terminal for errors** - the error message tells you what's wrong

**Common issues:**
1. **MongoDB not running** → Start with `mongod`
2. **Port 5000 busy** → Kill with: `Get-Process node | Stop-Process -Force`
3. **Module errors** → Run: `cd backend && npm install`
4. **Syntax errors** → Check the file mentioned in error message

**Restart backend:**
```powershell
cd backend
npm run dev
```

---

## 📞 Questions?

Check `DATABASE_AND_BACKEND_GUIDE.md` for detailed setup instructions!
