# Luna App - Supabase PostgreSQL Setup Guide

## Overview
Your Luna app now uses **Supabase** (PostgreSQL) instead of MongoDB. This provides better data persistence and reliability.

---

## Step 1: Create Supabase Account

1. Go to [https://supabase.com](https://supabase.com)
2. Click **"Start Your Project"**
3. Sign up with GitHub or email
4. Click **"New project"**
5. Fill in:
   - **Name**: `luna-health` (or any name)
   - **Database Password**: Create a strong password (save it!)
   - **Region**: Choose closest to you (e.g., `Singapore` or `Asia Pacific`)
6. Click **"Create new project"** and wait 2-3 minutes

---

## Step 2: Get Your Credentials

1. Once the project is created, go to **"Project Settings"** (bottom left)
2. Click **"API"** tab
3. You'll see:
   - **Project URL**: This is your `SUPABASE_URL`
   - **Anon Key**: This is your `SUPABASE_KEY`
4. Copy both values

---

## Step 3: Create Database Tables

Go to **"SQL Editor"** in Supabase dashboard and run this SQL:

```sql
-- Create profiles table
CREATE TABLE IF NOT EXISTS profiles (
  id BIGSERIAL PRIMARY KEY,
  user_id TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  age INTEGER,
  cycle_length INTEGER DEFAULT 28,
  period_length INTEGER DEFAULT 5,
  last_period_date TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create period_logs table
CREATE TABLE IF NOT EXISTS period_logs (
  id BIGSERIAL PRIMARY KEY,
  user_id TEXT NOT NULL,
  date TEXT NOT NULL,
  flow TEXT CHECK (flow IN ('spotting', 'light', 'medium', 'heavy')),
  pain INTEGER CHECK (pain >= 0 AND pain <= 10),
  mood TEXT,
  symptoms TEXT[],
  notes TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES profiles(user_id)
);

-- Create chat_messages table
CREATE TABLE IF NOT EXISTS chat_messages (
  id BIGSERIAL PRIMARY KEY,
  user_id TEXT NOT NULL,
  role TEXT CHECK (role IN ('user', 'assistant')),
  content TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES profiles(user_id)
);

-- Create hygiene_reminders table
CREATE TABLE IF NOT EXISTS hygiene_reminders (
  id BIGSERIAL PRIMARY KEY,
  user_id TEXT NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  frequency TEXT,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES profiles(user_id)
);

-- Create indices for faster queries
CREATE INDEX idx_profiles_user_id ON profiles(user_id);
CREATE INDEX idx_period_logs_user_date ON period_logs(user_id, date DESC);
CREATE INDEX idx_chat_messages_user_time ON chat_messages(user_id, created_at DESC);
CREATE INDEX idx_hygiene_reminders_user ON hygiene_reminders(user_id);
```

---

## Step 4: Enable Row Level Security (Optional but Recommended)

In Supabase dashboard:
1. Go to **"Authentication"** → **"Policies"**
2. Enable RLS for each table (optional for development)

For now, you can skip this as the app uses in-memory fallback.

---

## Step 5: Update Backend Configuration

### Update `.env` file in backend:

```
PORT=5000
SUPABASE_URL=https://your-project-id.supabase.co
SUPABASE_KEY=your-anon-key-here
JWT_SECRET=luna_secret_key_2024_change_me_in_production
NODE_ENV=development
```

Replace:
- `your-project-id.supabase.co` with your actual URL
- `your-anon-key-here` with your actual Anon Key

### Install Dependencies

```bash
cd backend
npm install
```

---

## Step 6: Test Backend Locally

```bash
npm run dev
```

You should see:
```
✅ Database connected successfully
🚀 Server running on http://localhost:5000
```

---

## Step 7: Deploy to Render

Follow the previous deployment instructions, but now with Supabase as your database:

1. Go to [Render.com](https://render.com)
2. Create a new Web Service
3. Set environment variables:
   - `SUPABASE_URL`: Your Supabase URL
   - `SUPABASE_KEY`: Your Supabase Anon Key
   - `NODE_ENV`: `production`

4. Deploy and copy the URL
5. Update Netlify's `VITE_API_URL` to point to your Render backend

---

## Features of Supabase

### Advantages:
✅ **PostgreSQL** - Reliable, SQL-based database  
✅ **Real-time** - Can add real-time subscriptions later  
✅ **Authentication** - Built-in user authentication (bonus feature)  
✅ **Free tier** - 500 MB database, 2 GB bandwidth  
✅ **Easy to scale** - Simple upgrades when needed  
✅ **Dashboard UI** - Visual database management  

### Free Tier Limits:
- 500 MB database storage
- 2 GB bandwidth/month
- 1 project
- 50,000 monthly active users

For your Luna app, this is more than enough!

---

## Troubleshooting

### Issue: "Connection refused" error
**Solution**: 
1. Verify `SUPABASE_URL` and `SUPABASE_KEY` are correct
2. Make sure you've created the database tables (run the SQL above)
3. Check that Supabase project is active (not paused)

### Issue: "JWT malformed" error
**Solution**: 
- Your SUPABASE_KEY is invalid
- Copy it again from Supabase dashboard

### Issue: Data not persisting
**Solution**:
- Backend is running in in-memory mode (database not connected)
- Check `.env` variables are set correctly
- Restart backend: `npm run dev`

### Issue: Queries timing out
**Solution**:
- You might be on the free tier with many users
- Upgrade to a paid plan, or
- Optimize queries and add more indices

---

## FAQ

**Q: Can I still run locally without Supabase?**  
A: Yes! The app automatically falls back to in-memory storage if Supabase is not available.

**Q: How much will it cost?**  
A: Free tier is included. You only pay when you exceed the free limits (which is hard to do).

**Q: Can I switch back to MongoDB?**  
A: Yes, the old MongoDB models are still in `/backend/models/` directory. But Supabase is recommended.

**Q: How do I backup my data?**  
A: Supabase has automatic daily backups. You can also manually export data from the dashboard.

---

## Next Steps

1. ✅ Create Supabase account and get credentials
2. ✅ Create database tables (run the SQL)
3. ✅ Update `.env` file in backend
4. ✅ Test backend locally
5. ✅ Deploy backend to Render
6. ✅ Update frontend on Netlify
7. ✅ Test from another device

Your Luna app will now have persistent data storage! 🎉
