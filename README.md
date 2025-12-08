# Luna - Menstrual Health & Cycle Tracker

A comprehensive menstrual health application with period tracking, AI chatbot, gynecologist directory, and educational resources.

## 🌟 Features

- **Period Tracker**: Log your cycle, symptoms, mood, and flow
- **AI Chatbot**: Get answers about menstrual health and find gynecologists
- **Gynecologist Directory**: Find top-rated gynecologists in Jaipur with ratings
- **Educational Resources**: Learn about menstrual health and hygiene
- **Dashboard**: Visualize your cycle patterns and predictions
- **Hygiene Reminders**: Set reminders for pad/tampon changes

## 🚀 Quick Start

### Prerequisites

- Node.js (v18 or higher)
- MongoDB (local or Atlas)
- npm package manager

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/rkeerti2600-lgtm/luna-insight-guide.git
cd luna-insight-guide
```

2. **Install frontend dependencies**
```bash
npm install
```

3. **Install backend dependencies**
```bash
cd backend
npm install
cd ..
```

4. **Setup environment variables**

Frontend (.env in root):
```
VITE_API_URL=http://localhost:5000/api
```

Backend (backend/.env):
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/luna-health
JWT_SECRET=your_secret_key_here
NODE_ENV=development
```

5. **Start MongoDB**
```bash
mongod
```

6. **Seed the database** (optional but recommended)
```bash
cd backend
node seed.js
cd ..
```

### Running the Application

**Terminal 1 - Start Backend (port 5000):**
```bash
cd backend
npm run dev
```

**Terminal 2 - Start Frontend (port 5173):**
```bash
npm run dev
```

The application will be available at http://localhost:5173

## 📁 Project Structure

```
luna-insight-guide/
├── backend/                # Backend API
│   ├── controllers/        # Route controllers
│   ├── models/            # MongoDB models
│   ├── routes/            # API routes
│   ├── server.js          # Express server
│   ├── seed.js            # Database seeding
│   └── package.json
├── src/                   # Frontend source
│   ├── components/        # React components
│   ├── pages/            # Page components
│   ├── lib/              # Utilities & API
│   └── types/            # TypeScript types
├── public/               # Static assets
└── package.json          # Frontend dependencies
```

## 🔧 Technology Stack

### Frontend
- React + TypeScript
- Vite
- Tailwind CSS
- shadcn/ui components
- Framer Motion
- Date-fns

### Backend
- Node.js + Express
- MongoDB + Mongoose
- CORS

## 📡 API Endpoints

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
- `POST /api/chat/message` - Send a message to chatbot
- `DELETE /api/chat/history` - Clear chat history

### Gynecologists
- `GET /api/gynecologists` - Get gynecologists (searchable by city)
- `GET /api/gynecologists/search?q=query` - Search gynecologists
- `GET /api/gynecologists/:id` - Get gynecologist by ID

### Hygiene Reminders
- `GET /api/hygiene` - Get all reminders
- `POST /api/hygiene` - Create a reminder
- `PUT /api/hygiene/:id` - Update a reminder
- `DELETE /api/hygiene/:id` - Delete a reminder

## 🤖 Chatbot Features

The Luna chatbot can:
- Answer questions about menstrual health
- Provide symptom information and advice
- Find gynecologists in Jaipur with ratings and reviews
- Give hygiene tips and product recommendations

**Example queries:**
- "What are period cramps?"
- "Find me a gynecologist in Jaipur"
- "How to manage heavy bleeding?"
- "Best contraception options?"

## 🏥 Gynecologist Directory

Pre-loaded with 8 verified gynecologists in Jaipur including:
- Contact information and location
- Professional ratings (4.5-5.0 stars)
- Years of experience
- Education credentials
- Consultation fees
- Available services
- Availability hours

## 🛠️ Development

### Frontend Commands
```bash
npm run dev          # Start dev server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint
```

### Backend Commands
```bash
cd backend
npm run dev          # Start with nodemon (hot reload)
npm start            # Start production server
node seed.js         # Seed database with gynecologist data
```

## 📝 License

MIT

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## How can I deploy this project?

Simply open [Lovable](https://lovable.dev/projects/REPLACE_WITH_PROJECT_ID) and click on Share -> Publish.

## Can I connect a custom domain to my Lovable project?

Yes, you can!

To connect a domain, navigate to Project > Settings > Domains and click Connect Domain.

Read more here: [Setting up a custom domain](https://docs.lovable.dev/features/custom-domain#custom-domain)
