import mongoose from 'mongoose';

const periodLogSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
    default: 'default-user'
  },
  date: {
    type: String,
    required: true
  },
  flow: {
    type: String,
    enum: ['spotting', 'light', 'medium', 'heavy'],
    required: true
  },
  pain: {
    type: Number,
    min: 0,
    max: 10,
    required: true
  },
  mood: {
    type: String,
    default: ''
  },
  symptoms: [{
    type: String
  }],
  notes: {
    type: String,
    default: ''
  }
}, {
  timestamps: true
});

// Index for faster queries
periodLogSchema.index({ userId: 1, date: -1 });

export default mongoose.model('PeriodLog', periodLogSchema);
