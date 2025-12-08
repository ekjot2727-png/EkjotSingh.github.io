import mongoose from 'mongoose';

const profileSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
    unique: true,
    default: 'default-user'
  },
  name: {
    type: String,
    required: true
  },
  age: {
    type: Number,
    required: true
  },
  cycleLength: {
    type: Number,
    required: true,
    default: 28
  },
  periodLength: {
    type: Number,
    required: true,
    default: 5
  },
  lastPeriodDate: {
    type: String,
    default: null
  }
}, {
  timestamps: true
});

export default mongoose.model('Profile', profileSchema);
