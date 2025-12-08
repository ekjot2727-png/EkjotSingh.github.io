# Environment Configuration Guide

## What Is This?

Environment variables tell your app how to connect to the backend.

- **Development**: Backend on your computer (`http://localhost:5000`)
- **Production**: Backend deployed online (`https://deployed-url.com`)

## Files

### Root: `.env` (Development)
```env
VITE_API_URL=http://localhost:5000/api
```

### Root: `.env.production` (For building)
```env
VITE_API_URL=http://localhost:5000/api
```
*Update to deployed URL before building*

### Backend: `.env`
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/luna-health
JWT_SECRET=luna_secret_key_2024_change_me_in_production
NODE_ENV=development
```

---

## How to Set Environment in Netlify

Your deployed frontend needs to know where the backend is.

### In Netlify Dashboard:
1. Click on your site name
2. Go to "Site settings"
3. Click "Build & deploy" → "Environment"
4. Click "Edit variables"
5. Add this variable:
   ```
   Key: VITE_API_URL
   Value: https://luna-backend-xxxx.onrender.com/api
   ```
6. Click "Save"
7. Trigger a new deploy

---

## Variables Explained

### Frontend Variables (in `.env` files)

| Variable | Purpose | Development | Production |
|----------|---------|-------------|------------|
| `VITE_API_URL` | Backend location | `http://localhost:5000/api` | `https://deployed.com/api` |

### Backend Variables (in `backend/.env`)

| Variable | Purpose | Example |
|----------|---------|---------|
| `PORT` | What port to run on | `5000` |
| `NODE_ENV` | Environment type | `development` or `production` |
| `MONGODB_URI` | Database connection | `mongodb://localhost:27017/luna-health` |
| `JWT_SECRET` | Security key | `your_secret_key_here` |

---

## Common Mistakes

❌ **Wrong**: `VITE_API_URL=https://luna-backend-xxxx.onrender.com`
✅ **Correct**: `VITE_API_URL=https://luna-backend-xxxx.onrender.com/api`
*(Missing `/api` at the end!)*

❌ **Wrong**: `VITE_API_URL=http://localhost:5000`
✅ **Correct**: `VITE_API_URL=http://localhost:5000/api`
*(Missing `/api` at the end!)*

❌ **Wrong**: Setting in Netlify but not redeploying
✅ **Correct**: Set variable AND trigger new deploy

---

## Testing Your Configuration

### Check if Variable is Set
In browser console (`F12` → Console):
```javascript
// This won't show anything (not exposed for security)
// But you can test the connection:
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

### Check Build Logs
Netlify → Deploys → Click the deploy → "Deploy log"
Look for: `VITE_API_URL` being set

---

## Update Sequence

### To Deploy Backend:
1. Backend code changes
2. Push to GitHub
3. Render auto-deploys (if connected)
4. Get new deployed URL

### To Use New Backend URL:
1. Get URL from Render dashboard
2. Go to Netlify
3. Settings → Environment
4. Update `VITE_API_URL` to new URL
5. Trigger redeploy in Netlify

---

## Reference URLs

### After Render Deployment
Your backend URL will look like:
```
https://luna-backend-YOUR_SERVICE_NAME.onrender.com
```

### What Goes in Netlify
Add the `/api` part:
```
https://luna-backend-YOUR_SERVICE_NAME.onrender.com/api
```

---

## Quick Checklist

- [ ] Backend deployed and running
- [ ] Got the deployed URL from provider
- [ ] Added `/api` to the URL
- [ ] Set `VITE_API_URL` in Netlify
- [ ] Triggered redeploy in Netlify
- [ ] Waited 2 minutes for build
- [ ] Tested in browser (F12 → Console)
- [ ] Chatbot now works!

---

## Need Help?

1. **"I don't have a deployed URL yet"**
   - Deploy backend first using QUICK_DEPLOY.md

2. **"URL is set but still not working"**
   - Check for typos
   - Make sure `/api` is included
   - Hard refresh (Ctrl+Shift+R)

3. **"Backend URL but app says error"**
   - Check browser console (F12)
   - Check Netlify build log
   - Check Render log

4. **"Need more detail"**
   - Read DEPLOYMENT_GUIDE.md
