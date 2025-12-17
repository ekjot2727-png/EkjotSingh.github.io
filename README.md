# Luna - Menstrual Health & Cycle Tracker

A comprehensive menstrual health application with period tracking, AI chatbot, gynecologist directory, and educational resources.

## 🌟 Features

- **Period Tracker**: Log your cycle, symptoms, mood, and flow
- **AI Chatbot**: Get answers about menstrual health and find gynecologists
- **Gynecologist Directory**: Find top-rated gynecologists in multiple cities
- **Educational Resources**: Learn about menstrual health and hygiene
- **Dashboard**: Visualize your cycle patterns and predictions
- **Hygiene Reminders**: Set reminders for pad/tampon changes
- **Offline-First**: Works completely without backend - all data stored locally

## 🚀 Quick Deploy (No Backend Required!)

### Deploy to Vercel (Recommended)
[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)

1. Push your code to GitHub
2. Connect to Vercel
3. Click **Deploy** - no environment variables needed!

### Deploy to Netlify
[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start)

1. Push your code to GitHub
2. Connect to Netlify
3. Click **Deploy** - works instantly!

## 💡 How It Works Without Backend

This app is designed with an **offline-first architecture**:

- ✅ All user data (profile, period logs, reminders) stored in **localStorage**
- ✅ AI Chatbot uses built-in **knowledge base** for health questions
- ✅ Gynecologist directory uses **local sample data** for multiple cities
- ✅ If a backend is available, it syncs automatically
- ✅ **Zero configuration required** - just deploy and use!

## 🛠️ Local Development

### Prerequisites
- Node.js (v18 or higher)
- npm package manager

### Quick Start (Frontend Only)

```bash
# Clone and install
git clone https://github.com/rkeerti2600-lgtm/luna-insight-guide.git
cd luna-insight-guide
npm install

# Start development server
npm run dev
```

Visit http://localhost:8080 - The app works fully without any backend!

### With Backend (Optional)

If you want to run with the backend for server-side storage:

1. **Install backend dependencies**
```bash
cd backend
npm install
```

2. **Setup MongoDB** (local or Atlas)

3. **Create backend/.env**
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/luna-health
NODE_ENV=development
```

4. **Start both servers**

Terminal 1 - Backend:
```bash
cd backend
npm run dev
```

Terminal 2 - Frontend:
```bash
npm run dev
```

## 📁 Project Structure

```
luna-insight-guide/
├── src/                   # Frontend source
│   ├── components/        # React components
│   ├── pages/            # Page components
│   ├── lib/              
│   │   ├── api.ts        # API with offline fallbacks
│   │   ├── storage.ts    # localStorage utilities
│   │   ├── chatbot-knowledge.ts  # AI knowledge base
│   │   └── cycle-utils.ts # Cycle calculations
│   └── types/            # TypeScript types
├── backend/              # Optional backend API
├── vercel.json           # Vercel configuration
├── netlify.toml          # Netlify configuration
└── package.json
```

## 🔧 Technology Stack

### Frontend
- React + TypeScript
- Vite
- Tailwind CSS
- shadcn/ui components
- Framer Motion
- Date-fns

### Backend (Optional)
- Node.js + Express
- MongoDB + Mongoose
- CORS

## 🤖 Chatbot Features

The Luna chatbot works **offline** with a built-in knowledge base:

- Answer questions about menstrual health
- Provide symptom information and advice
- Find gynecologists in multiple cities (Jaipur, Delhi, Mumbai, Bangalore, etc.)
- Give hygiene tips and product recommendations

**Example queries:**
- "What are period cramps?"
- "Find me a gynecologist in Delhi"
- "How to manage heavy bleeding?"
- "Best contraception options?"

## 🏥 Gynecologist Directory

Pre-loaded with gynecologists in multiple cities:
- **Jaipur**: 7 doctors
- **Delhi**: 3 doctors  
- **Mumbai**: 2 doctors
- **Bangalore**: 2 doctors
- **Jodhpur**: 3 doctors
- **Udaipur**: 3 doctors

Each listing includes:
- Contact information and location
- Professional ratings
- Years of experience
- Consultation fees
- Available services

## 🛠️ Commands

### Frontend
```bash
npm run dev          # Start dev server (port 8080)
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint
```

### Backend (Optional)
```bash
cd backend
npm run dev          # Start with nodemon
npm start            # Start production server
```

## 🌐 Environment Variables (Optional)

The app works without any environment variables. To connect to a backend:

```env
VITE_API_URL=https://your-backend-url.com/api
```

## 📡 API Endpoints (Backend - Optional)

### Profile
- `GET /api/profile` - Get user profile
- `POST /api/profile` - Create/update profile

### Period Logs
- `GET /api/period-logs` - Get all period logs
- `POST /api/period-logs` - Create a period log
- `PUT /api/period-logs/:id` - Update a period log
- `DELETE /api/period-logs/:id` - Delete a period log

### Chat
- `GET /api/chat/history` - Get chat history
- `POST /api/chat/message` - Send a message
- `DELETE /api/chat/history` - Clear chat history

### Gynecologists
- `GET /api/gynecologists` - Get gynecologists
- `GET /api/gynecologists/search?q=query` - Search
- `GET /api/gynecologists/:id` - Get by ID

### Hygiene Reminders
- `GET /api/hygiene` - Get all reminders
- `POST /api/hygiene` - Create a reminder
- `PUT /api/hygiene/:id` - Update a reminder
- `DELETE /api/hygiene/:id` - Delete a reminder

## 📝 License

MIT

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS
