import mongoose from 'mongoose';

const gynecologistSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  specialty: {
    type: String,
    default: 'Gynecologist'
  },
  area: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  city: {
    type: String,
    required: true,
    default: 'Jaipur'
  },
  phone: {
    type: String,
    required: true
  },
  rating: {
    type: Number,
    min: 0,
    max: 5,
    default: 4.0
  },
  experience: {
    type: Number,
    default: 5
  },
  education: {
    type: String,
    default: ''
  },
  consultationFee: {
    type: Number,
    default: 500
  },
  availability: [{
    type: String
  }],
  services: [{
    type: String
  }]
}, {
  timestamps: true
});

// Index for location-based searches
gynecologistSchema.index({ city: 1, area: 1 });

export default mongoose.model('Gynecologist', gynecologistSchema);
