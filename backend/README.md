# Luna Backend API

Backend API for the Luna Menstrual Health & Cycle Tracker application.

## Features

- User profile management
- Period tracking and logging
- AI chatbot for menstrual health questions
- Gynecologist directory (focused on Jaipur)
- Hygiene reminders
- MongoDB database integration

## Prerequisites

- Node.js (v18 or higher)
- MongoDB (local installation or MongoDB Atlas)

## Installation

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file (copy from `.env.example`):
```bash
cp .env.example .env
```

4. Update the `.env` file with your MongoDB connection string if needed.

## Running the Server

### Development mode with auto-reload:
```bash
npm run dev
```

### Production mode:
```bash
npm start
```

The server will start on `http://localhost:5000`

## Seeding the Database

To populate the database with sample gynecologist data:

```bash
node seed.js
```

## API Endpoints

### Profile
- `GET /api/profile?userId=default-user` - Get user profile
- `POST /api/profile` - Create/update profile

### Period Logs
- `GET /api/period-logs?userId=default-user` - Get all period logs
- `POST /api/period-logs` - Create a new period log
- `PUT /api/period-logs/:id` - Update a period log
- `DELETE /api/period-logs/:id` - Delete a period log

### Chat
- `GET /api/chat/history?userId=default-user` - Get chat history
- `POST /api/chat/message` - Send a message to chatbot
- `DELETE /api/chat/history?userId=default-user` - Clear chat history

### Gynecologists
- `GET /api/gynecologists?city=Jaipur` - Get gynecologists by city
- `GET /api/gynecologists/search?q=query` - Search gynecologists
- `GET /api/gynecologists/:id` - Get gynecologist by ID

### Hygiene Reminders
- `GET /api/hygiene?userId=default-user` - Get all reminders
- `POST /api/hygiene` - Create a reminder
- `PUT /api/hygiene/:id` - Update a reminder
- `DELETE /api/hygiene/:id` - Delete a reminder

## Database Schema

### Profile
- userId, name, age, cycleLength, periodLength, lastPeriodDate

### PeriodLog
- userId, date, flow, pain, mood, symptoms, notes

### ChatMessage
- userId, role, content, timestamp

### Gynecologist
- name, specialty, area, address, city, phone, rating, experience, education, consultationFee, availability, services

### HygieneReminder
- userId, title, interval, enabled, lastReminded

## Technologies

- Express.js
- MongoDB with Mongoose
- CORS enabled
- dotenv for environment variables
