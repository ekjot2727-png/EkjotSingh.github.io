# Quick Deployment Checklist

## ✅ Before Deployment

- [ ] Backend runs locally: `cd backend && npm run dev`
- [ ] Frontend runs locally: `npm run dev`
- [ ] Chatbot works locally
- [ ] All API endpoints tested

## 🚀 Deploy Backend (Choose One)

### Option A: Render.com (RECOMMENDED)
- [ ] Create Render account (render.com)
- [ ] Connect GitHub repo
- [ ] Create new Web Service
- [ ] Select `luna-insight-guide` repo
- [ ] Set root directory: `backend`
- [ ] Build: `npm install`
- [ ] Start: `npm start`
- [ ] Copy deployed URL (e.g., `https://luna-backend-xxxx.onrender.com`)

### Option B: Railway.app
- [ ] Create Railway account (railway.app)
- [ ] Connect GitHub repo
- [ ] Create new project
- [ ] Copy deployed URL

### Option C: Heroku (Free tier ended, but available with paid plan)
- [ ] Create Heroku account
- [ ] Deploy Node backend
- [ ] Copy deployed URL

## 🔧 Update Netlify

- [ ] Go to your Netlify site dashboard
- [ ] Settings → Environment variables
- [ ] Add: `VITE_API_URL=https://your-backend-url/api`
- [ ] Replace `your-backend-url` with actual deployed URL
- [ ] Trigger redeploy of frontend
- [ ] Wait 1-2 minutes for build to complete

## 🧪 Test Deployed App

- [ ] Visit your Netlify site URL
- [ ] Open chatbot
- [ ] Type: "Find me a gynecologist"
- [ ] Should see 5 doctors with ratings
- [ ] NOT see error about "trouble connecting to server"

## 📊 Verification

Open browser DevTools (F12) → Console:
```javascript
// Test backend connection
fetch('https://your-backend-url/api/health')
  .then(r => r.json())
  .then(d => console.log('Backend:', d))
```

Should show: `Backend: { status: 'ok', message: 'Luna Backend API is running', ... }`

## ⚡ Quick Links

- **Render**: https://render.com
- **Railway**: https://railway.app
- **Netlify**: Your site dashboard
- **GitHub**: Your repo

## 🆘 If Still Not Working

1. **Check backend URL**
   - Is `VITE_API_URL` set correctly in Netlify?
   - Does the URL end with `/api`?

2. **Check backend is running**
   - Visit `https://your-backend-url/api/health` in browser
   - Should see JSON response

3. **Check CORS**
   - Backend server.js has `app.use(cors())`?
   - Check your code does have it

4. **Clear cache**
   - Hard refresh: Ctrl+Shift+R or Cmd+Shift+R
   - Or use incognito/private window

5. **Check logs**
   - Render: View logs in dashboard
   - Check browser console: F12 → Console
   - Look for CORS or network errors

## 📝 For Future Reference

Once deployed, to make changes:

1. **Update Frontend**
   - Make changes locally
   - Push to GitHub
   - Netlify auto-deploys

2. **Update Backend**
   - Make changes locally
   - Push to GitHub
   - Render/Railway auto-deploys (if configured)

3. **Update Environment**
   - Change `VITE_API_URL` in Netlify
   - Trigger redeploy
