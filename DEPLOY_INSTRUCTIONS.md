# Luna Menstrual Health App - Deployment Instructions

## Overview
Your Luna app consists of two parts:
- **Frontend**: React app (currently on Netlify) ✅
- **Backend**: Node.js Express server (needs to be deployed)

When accessing the app from another device, the frontend can't reach your local backend. This guide shows how to deploy your backend online.

---

## Option 1: Deploy to Render (Recommended - Free)

### Step 1: Prepare Your Code
Your code is already in GitHub at: `https://github.com/ekjot2727-png/EkjotSingh.github.io`

### Step 2: Create Render Account
1. Go to [https://render.com](https://render.com)
2. Click **"Sign up"** or **"Sign in"** with GitHub
3. Authorize Render to access your GitHub account

### Step 3: Create Web Service
1. Click the **"New +"** button (top right)
2. Select **"Web Service"**
3. Choose your repository: `ekjot2727-png/EkjotSingh.github.io`
4. Click **"Connect"**

### Step 4: Configure Deployment
Fill in the following settings:

| Field | Value |
|-------|-------|
| **Name** | `luna-backend` |
| **Region** | `Singapore` (or closest to you) |
| **Branch** | `main` |
| **Root Directory** | `backend` |
| **Runtime** | `Node` |
| **Build Command** | `npm install` |
| **Start Command** | `npm start` |
| **Plan** | `Free` |

### Step 5: Add Environment Variables
Click **"Add Environment Variable"** and add:

```
MONGODB_URI = (leave empty for now, or add MongoDB Atlas later)
NODE_ENV = production
```

### Step 6: Deploy
1. Click **"Create Web Service"**
2. Wait 2-3 minutes for deployment to complete
3. You'll see a URL like: `https://luna-backend.onrender.com`
4. **Copy this URL** - you'll need it next

### Step 7: Verify Backend is Running
Open this URL in your browser: `https://luna-backend.onrender.com/api/health`

You should see:
```json
{
  "status": "ok",
  "message": "Backend is running!",
  "timestamp": "2025-12-10T..."
}
```

---

## Option 2: Deploy to Railway (Alternative)

### Step 1: Create Railway Account
1. Go to [https://railway.app](https://railway.app)
2. Click **"Login"** and choose **"GitHub"**
3. Authorize Railway

### Step 2: Create New Project
1. Click **"New Project"**
2. Select **"Deploy from GitHub repo"**
3. Choose: `ekjot2727-png/EkjotSingh.github.io`

### Step 3: Configure
1. Select **"Node.js"** as the service type
2. Set **`ROOT_DIR`** to `backend`
3. Set **`START_COMMAND`** to `npm start`

### Step 4: Deploy
1. Railway will auto-deploy your code
2. Copy the provided URL (e.g., `https://luna-backend-prod.up.railway.app`)
3. Wait for deployment to complete

---

## Connect Frontend to Backend

### Step 1: Go to Netlify Site Settings
1. Open [https://app.netlify.com](https://app.netlify.com)
2. Select your **Luna** site
3. Go to **"Site settings"** → **"Build & deploy"** → **"Environment"**

### Step 2: Add Environment Variable
Click **"Add a variable"** and add:

```
Key:   VITE_API_URL
Value: https://luna-backend.onrender.com/api
```

(Replace `luna-backend.onrender.com` with your actual backend URL from Step 7 above)

### Step 3: Trigger New Deploy
1. Go to **"Deployments"** tab
2. Click **"Trigger deploy"** → **"Deploy site"**
3. Wait for deployment to complete (usually 1-2 minutes)

### Step 4: Test on Another Device
1. Open your Netlify site URL on another phone/computer
2. Test the chatbot: "Find me a gynecologist in Jaipur"
3. You should see doctor recommendations without errors ✅

---

## Optional: Enable Database Persistence

If you want your data to persist (period logs, chat history, etc.):

### Use Supabase (PostgreSQL) - Recommended

1. Go to [https://supabase.com](https://supabase.com)
2. Click **"Start Your Project"**
3. Sign up with GitHub
4. Create a new project and save your credentials
5. Run the SQL to create tables (see `SUPABASE_SETUP.md` for detailed instructions)
6. Add environment variables to Render:
   - `SUPABASE_URL`: Your Supabase URL
   - `SUPABASE_KEY`: Your Anon Key

See **SUPABASE_SETUP.md** for complete setup instructions!

### Or Use MongoDB Atlas (Alternative)

If you prefer MongoDB:

---

## Troubleshooting

### Backend Not Connecting
**Error**: "Failed to load resource: net::ERR_CONNECTION_REFUSED"

**Solution**:
1. Check your Render URL is correct (no typos)
2. Verify `VITE_API_URL` in Netlify matches your backend URL
3. Trigger a new Netlify deploy
4. Wait 5 minutes for changes to propagate

### Backend Shows MongoDB Error
**Error**: "MongoDB Connection Error"

**Solution**:
This is normal! The app works without MongoDB. If you want persistent data:
- Follow "Optional: Enable Database Persistence" section above
- Or ignore it - the app uses in-memory storage

### Still Getting Localhost Errors
**Solution**:
1. Clear browser cache: `Ctrl + Shift + Delete`
2. Hard refresh page: `Ctrl + Shift + R`
3. Check Netlify environment variables are set correctly
4. Verify backend is running: Visit `https://your-backend-url/api/health`

---

## Summary

| Component | Status | URL |
|-----------|--------|-----|
| Frontend | ✅ Deployed | `https://your-site.netlify.app` |
| Backend | ✅ Deployed | `https://luna-backend.onrender.com` |
| Database | Optional | MongoDB Atlas (optional) |

**Next Steps**:
1. ✅ Deploy backend to Render/Railway
2. ✅ Update frontend API URL in Netlify
3. ✅ Test from another device
4. (Optional) Set up MongoDB for data persistence

---

## Need Help?

**Quick Links**:
- Render Docs: https://render.com/docs
- Railway Docs: https://docs.railway.app
- Netlify Docs: https://docs.netlify.com
- MongoDB Atlas: https://docs.atlas.mongodb.com

**Common Ports**:
- Frontend (local): `http://localhost:8081`
- Backend (local): `http://localhost:5000`
- Frontend (production): `https://your-site.netlify.app`
- Backend (production): `https://luna-backend.onrender.com` (or your Railway URL)
