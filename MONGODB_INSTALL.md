# MongoDB Installation Instructions

MongoDB is not installed on your system. Here are the installation options:

## Option 1: MongoDB Community Edition (Recommended for Local Development)

### Download & Install
1. Go to: https://www.mongodb.com/try/download/community
2. Select:
   - Windows
   - MSI installer
   - v7.0 or latest
3. Download and run the installer
4. Follow the installation wizard
5. MongoDB will be installed and set up as a Windows Service

### Verify Installation
Open PowerShell and run:
```powershell
mongod --version
```

You should see the version number.

### Start MongoDB (After Installation)
```powershell
mongod
```

---

## Option 2: MongoDB Atlas (Cloud - No Installation Needed)

### Quick Setup
1. Go to: https://www.mongodb.com/cloud/atlas
2. Sign up for free account
3. Create a project and cluster (M0 Free tier)
4. Get connection string: `mongodb+srv://...`
5. Update `backend/.env` with the connection string

### Connection String Format
```
mongodb+srv://username:password@cluster.mongodb.net/luna-health?retryWrites=true&w=majority
```

---

## For Now: Run Without MongoDB

Your backend can run without MongoDB (graceful fallback mode). 
Follow the next steps to start frontend and backend.

Data won't persist to database, but the application will work.
