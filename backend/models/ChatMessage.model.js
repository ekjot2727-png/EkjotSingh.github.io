import mongoose from 'mongoose';

const chatMessageSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
    default: 'default-user'
  },
  role: {
    type: String,
    enum: ['user', 'assistant'],
    required: true
  },
  content: {
    type: String,
    required: true
  },
  timestamp: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

// Index for faster queries
chatMessageSchema.index({ userId: 1, timestamp: -1 });

export default mongoose.model('ChatMessage', chatMessageSchema);
