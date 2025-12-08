import mongoose from 'mongoose';

const hygieneReminderSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
    default: 'default-user'
  },
  title: {
    type: String,
    required: true
  },
  interval: {
    type: Number,
    required: true,
    default: 4
  },
  enabled: {
    type: Boolean,
    default: true
  },
  lastReminded: {
    type: Date,
    default: null
  }
}, {
  timestamps: true
});

export default mongoose.model('HygieneReminder', hygieneReminderSchema);
