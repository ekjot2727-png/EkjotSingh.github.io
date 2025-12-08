# Deployment Guide - Luna Backend & Frontend

## Problem
Your frontend is deployed on Netlify, but the backend (API) is running only on your local machine. The deployed frontend can't reach `http://localhost:5000` from the internet.

## Solutions

### Solution 1: Deploy Backend to Render (Recommended - FREE)

Render.com offers free tier for Node.js applications perfect for this project.

#### Step 1: Prepare Backend for Deployment
```bash
cd backend
# Verify package.json has start script
npm run dev  # Should work locally first
```

#### Step 2: Create Render Account
1. Go to https://render.com
2. Sign up with GitHub (recommended)
3. Connect your GitHub account

#### Step 3: Deploy Backend to Render
1. Click "New +" → "Web Service"
2. Connect your GitHub repository (luna-insight-guide)
3. Configure:
   - **Name**: luna-backend
   - **Environment**: Node
   - **Build Command**: `cd backend && npm install`
   - **Start Command**: `npm run start` (or `node server.js`)
   - **Region**: Choose closest to you

4. Click "Create Web Service"
5. Wait for deployment (2-3 minutes)
6. Copy the generated URL (looks like: `https://luna-backend-xxxx.onrender.com`)

#### Step 4: Update Frontend with Backend URL
In your Netlify deployment, add environment variable:
- Go to Netlify → Your Site → Site settings → Environment
- Add: `VITE_API_URL=https://luna-backend-xxxx.onrender.com/api`
- Redeploy frontend

---

### Solution 2: Deploy Backend to Railway (Also FREE)

1. Go to https://railway.app
2. Sign in with GitHub
3. Click "New Project" → "Deploy from GitHub repo"
4. Select luna-insight-guide
5. Configure:
   - Root directory: `backend`
   - Build command: `npm install`
   - Start command: `npm start`
6. Add environment variables:
   ```
   PORT=5000
   NODE_ENV=production
   MONGODB_URI=mongodb://localhost:27017/luna-health
   ```
7. Deploy and get URL

---

### Solution 3: Use MongoDB Atlas + Backend

If you want to keep backend local but enable database persistence:

#### Setup MongoDB Atlas (Free)
1. Go to https://www.mongodb.com/cloud/atlas
2. Create free account
3. Create free tier cluster
4. Get connection string: `mongodb+srv://user:password@cluster.mongodb.net/luna-health`
5. Update backend `.env`:
```env
MONGODB_URI=mongodb+srv://user:password@cluster.mongodb.net/luna-health
```

---

## Current Status

| Component | Status | Location |
|-----------|--------|----------|
| Frontend | ✅ Deployed | Netlify |
| Backend | ❌ Local Only | http://localhost:5000 |
| Database | ⚠️ In-Memory | Local only |

## After Deployment

Once backend is deployed, update Netlify environment variables:

**Netlify Dashboard** → Your Site → Settings → Environment Variables

```
VITE_API_URL=https://your-deployed-backend-url/api
```

Then trigger a redeploy of the frontend.

---

## Testing

After deployment, test from browser console:
```javascript
fetch('https://your-backend-url/api/health')
  .then(r => r.json())
  .then(d => console.log(d))
```

Should return:
```json
{
  "status": "ok",
  "message": "Luna Backend API is running",
  "timestamp": "2024-12-08T..."
}
```

---

## Quick Start - Deploy Now (5 minutes)

### Step 1: Update Backend for Production
```bash
cd backend
# Ensure package.json has:
# "start": "node server.js"
```

### Step 2: Deploy to Render
1. Go to render.com → Sign up
2. Connect GitHub
3. Deploy web service from `/backend` directory
4. Copy deployed URL

### Step 3: Update Netlify
1. Netlify dashboard → Your site
2. Settings → Environment variables
3. Add: `VITE_API_URL=https://[your-render-url]/api`
4. Trigger redeploy

### Step 4: Test
- Open your Netlify site
- Go to chatbot
- Try: "Find me a gynecologist"
- Should now work!

---

## Environment Variables Reference

### Frontend (.env in root)
```env
# Development
VITE_API_URL=http://localhost:5000/api

# Production (add to Netlify)
VITE_API_URL=https://your-deployed-backend-url/api
```

### Backend (.env in backend/)
```env
# Server
PORT=5000
NODE_ENV=production

# Database (optional)
MONGODB_URI=mongodb://localhost:27017/luna-health

# JWT
JWT_SECRET=your_secret_key
```

---

## Troubleshooting

### Error: "Cannot connect to server"
- Backend URL not set in Netlify environment
- Backend not deployed or URL is wrong
- CORS issue (backend needs CORS enabled)

### Backend deployed but still getting errors
- Check backend logs on Render/Railway
- Verify VITE_API_URL is correct
- Clear Netlify cache and redeploy

### Deployed backend is slow
- Free tier has cold starts (first request takes 30 seconds)
- Keep a regular request to prevent shutdown

---

## Need Help?

1. Check backend logs: `npm run dev` locally
2. Test health endpoint: `curl http://localhost:5000/api/health`
3. Verify Netlify env variables are set
4. Check browser console for exact error message
