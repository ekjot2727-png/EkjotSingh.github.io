# Deploy Luna Backend to Render in 5 Minutes

## Why?
Your frontend is on Netlify (public). Your backend is on your computer (private). The frontend can't reach the backend.

**Solution**: Deploy backend to Render (public).

---

## Step-by-Step

### 1️⃣ Go to Render
- Open: https://render.com
- Click "Sign up"
- Use GitHub (easiest)

### 2️⃣ Create Web Service
- Dashboard → New → Web Service
- Select: `luna-insight-guide` repository
- Click "Connect"

### 3️⃣ Configure Deployment
Fill in these fields:

| Field | Value |
|-------|-------|
| Name | `luna-backend` |
| Root Directory | `backend` |
| Environment | `Node` |
| Build Command | `npm install` |
| Start Command | `npm start` |
| Region | *Select closest to you* |

### 4️⃣ Deploy
- Click "Create Web Service"
- Wait 2-3 minutes
- See green "Live" status
- Copy the URL (looks like: `https://luna-backend-abc123.onrender.com`)

### 5️⃣ Update Netlify
- Go to: https://app.netlify.com
- Select your Luna site
- Settings → Environment variables
- Add new variable:
  - **Key**: `VITE_API_URL`
  - **Value**: `https://luna-backend-abc123.onrender.com/api`
- Click "Save"

### 6️⃣ Redeploy Frontend
- Netlify dashboard → Deploys
- Click "Trigger deploy" → "Deploy site"
- Wait 1-2 minutes

### 7️⃣ Test
- Open your Netlify site
- Go to chatbot
- Try: "Find me a gynecologist in Jaipur"
- ✅ Should work!

---

## Done! 🎉

Your app is now fully deployed:
- **Frontend**: Netlify (public)
- **Backend**: Render (public)
- **Database**: In-memory (can be enhanced with MongoDB Atlas)

---

## Troubleshooting

### "Still getting error"
1. Wait 5 minutes (Render needs time)
2. Clear browser cache (Ctrl+Shift+Delete)
3. Hard refresh (Ctrl+Shift+R)
4. Check if `VITE_API_URL` is set in Netlify (exact value matters!)

### "Backend URL looks different"
- Render gives you URL like: `https://luna-backend-xxxx.onrender.com`
- Add `/api` at the end when setting in Netlify
- Example: `https://luna-backend-xxxx.onrender.com/api`

### "Still not working after 10 minutes"
1. Check Render dashboard → logs
2. Check Netlify build logs
3. Look at browser F12 → Console for errors

---

## Next: Add Database (Optional)

To persist data instead of memory-only:

1. Go to: https://www.mongodb.com/cloud/atlas
2. Create free cluster
3. Get connection string
4. Add to Render environment variables:
   - **Key**: `MONGODB_URI`
   - **Value**: `mongodb+srv://user:password@cluster.mongodb.net/luna-health`
5. Restart Render service

---

**Questions?** Check DEPLOYMENT_GUIDE.md for detailed info.
