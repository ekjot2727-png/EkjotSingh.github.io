import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';

// Import routes
import profileRoutes from './routes/profile.routes.js';
import periodLogRoutes from './routes/periodLog.routes.js';
import chatRoutes from './routes/chat.routes.js';
import gynecologistRoutes from './routes/gynecologist.routes.js';
import hygieneRoutes from './routes/hygiene.routes.js';

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Database connection
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('✅ MongoDB Connected Successfully'))
  .catch(err => {
    console.warn('⚠️  MongoDB Connection Error:', err.message);
    console.log('ℹ️  Running in memory mode - data will not persist');
  });

// API Routes
app.use('/api/profile', profileRoutes);
app.use('/api/period-logs', periodLogRoutes);
app.use('/api/chat', chatRoutes);
app.use('/api/gynecologists', gynecologistRoutes);
app.use('/api/hygiene', hygieneRoutes);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    message: 'Luna Backend API is running',
    timestamp: new Date().toISOString()
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Endpoint not found' });
});

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!', message: err.message });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(`📡 Environment: ${process.env.NODE_ENV}`);
});
