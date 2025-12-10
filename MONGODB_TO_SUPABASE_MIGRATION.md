# Migration from MongoDB to Supabase (PostgreSQL)

## What Changed?

Your Luna app now uses **Supabase** (PostgreSQL) instead of MongoDB for better reliability and features.

## Key Differences

| Feature | MongoDB | Supabase |
|---------|---------|----------|
| Database Type | NoSQL (Document) | SQL (Relational) |
| Free Storage | Not included | 500 MB included |
| Real-time | Limited | Built-in |
| Authentication | Manual setup | Built-in |
| Cost | Free tier limited | Very generous free tier |
| Backup | Manual | Automatic daily |

---

## Migration Steps

### 1. Stop Old Services
```bash
# Kill existing MongoDB if running
# Kill existing backend processes
npm run dev  # (then Ctrl+C)
```

### 2. Create Supabase Account
- Go to https://supabase.com
- Sign up with GitHub
- Create a new project
- Save your credentials

### 3. Create Database Tables
Run this SQL in Supabase **"SQL Editor"**:

```sql
-- Profiles
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

-- Period Logs
CREATE TABLE IF NOT EXISTS period_logs (
  id BIGSERIAL PRIMARY KEY,
  user_id TEXT NOT NULL,
  date TEXT NOT NULL,
  flow TEXT,
  pain INTEGER,
  mood TEXT,
  symptoms TEXT[],
  notes TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Chat Messages
CREATE TABLE IF NOT EXISTS chat_messages (
  id BIGSERIAL PRIMARY KEY,
  user_id TEXT NOT NULL,
  role TEXT,
  content TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Hygiene Reminders
CREATE TABLE IF NOT EXISTS hygiene_reminders (
  id BIGSERIAL PRIMARY KEY,
  user_id TEXT NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  frequency TEXT,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Add Indices
CREATE INDEX idx_profiles_user_id ON profiles(user_id);
CREATE INDEX idx_period_logs_user_date ON period_logs(user_id, date DESC);
CREATE INDEX idx_chat_messages_user_time ON chat_messages(user_id, created_at DESC);
CREATE INDEX idx_hygiene_reminders_user ON hygiene_reminders(user_id);
```

### 4. Update Backend Configuration
Update `backend/.env`:
```
SUPABASE_URL=https://your-id.supabase.co
SUPABASE_KEY=your-anon-key
```

### 5. Update Dependencies
```bash
cd backend
npm install
```

### 6. Test Backend
```bash
npm run dev
```

You should see:
```
✅ Database connected successfully
🚀 Server running on http://localhost:5000
```

### 7. Restart Frontend
```bash
npm run dev
```

---

## What About Old Data?

### MongoDB Data
If you had important data in MongoDB, you need to manually migrate it or recreate it.

### In-Memory Data
Previous in-memory data is lost - this is expected.

### Going Forward
All new data is saved to Supabase and will persist!

---

## Data Mapping

The data structure is mostly the same, but with some naming changes:

### MongoDB → Supabase
- `userId` → `user_id`
- `cycleLength` → `cycle_length`
- `periodLength` → `period_length`
- `lastPeriodDate` → `last_period_date`
- `flowIntensity` → `flow`
- `timestamp` → `created_at`

The backend automatically handles this conversion.

---

## Why Supabase?

1. **PostgreSQL** - Industry standard, more reliable
2. **Free tier is generous** - 500 MB storage, 2 GB bandwidth
3. **Real-time capable** - Can add live features later
4. **Built-in authentication** - Easy user login
5. **Better for production** - Easy to scale
6. **Backup included** - Automatic daily backups
7. **Dashboard UI** - Easy data management

---

## Rollback to MongoDB

If you want to go back to MongoDB:

1. Revert `backend/server.js` and `package.json` from git
2. Update `.env` with MongoDB URI
3. Run `npm install`
4. Restart: `npm run dev`

But we recommend staying with Supabase!

---

## Issues After Migration?

### Data not saving?
- Check Supabase tables exist
- Verify `.env` variables
- Check browser console for API errors

### Database errors?
- Go to Supabase dashboard
- Check "Database" → "Tables"
- Make sure all tables exist

### Backend won't start?
- Verify `SUPABASE_URL` and `SUPABASE_KEY`
- Check network connection
- Restart: `npm run dev`

---

## Next Steps

1. ✅ Migrate to Supabase
2. ✅ Test locally
3. ✅ Update Render deployment with Supabase credentials
4. ✅ Redeploy backend
5. ✅ Test on production

Your data will now persist across restarts! 🎉

---

## Support

- **Supabase Docs**: https://supabase.com/docs
- **SQL Help**: https://www.postgresql.org/docs/
- **Issues**: Check backend console logs
