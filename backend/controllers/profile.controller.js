import Profile from '../models/Profile.model.js';

// Get user profile
export const getProfile = async (req, res) => {
  try {
    const userId = req.query.userId || 'default-user';
    let profile = await Profile.findOne({ userId });
    
    if (!profile) {
      // Create default profile if doesn't exist
      profile = await Profile.create({
        userId,
        name: 'User',
        age: 25,
        cycleLength: 28,
        periodLength: 5,
        lastPeriodDate: null
      });
    }
    
    res.json(profile);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch profile', message: error.message });
  }
};

// Create or update profile
export const updateProfile = async (req, res) => {
  try {
    const userId = req.body.userId || 'default-user';
    const profileData = {
      userId,
      name: req.body.name,
      age: req.body.age,
      cycleLength: req.body.cycleLength,
      periodLength: req.body.periodLength,
      lastPeriodDate: req.body.lastPeriodDate
    };

    const profile = await Profile.findOneAndUpdate(
      { userId },
      profileData,
      { new: true, upsert: true, runValidators: true }
    );

    res.json(profile);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update profile', message: error.message });
  }
};
