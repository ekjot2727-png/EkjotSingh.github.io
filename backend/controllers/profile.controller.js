import * as ProfileModel from '../models/supabase/Profile.js';

// Get user profile
export const getProfile = async (req, res) => {
  try {
    const userId = req.query.userId || 'default-user';
    let profile = await ProfileModel.getProfile(userId);
    
    if (!profile) {
      // Create default profile if doesn't exist
      profile = await ProfileModel.createProfile({
        user_id: userId,
        name: 'User',
        age: 25,
        cycle_length: 28,
        period_length: 5,
        last_period_date: null
      });
    }
    
    // Convert snake_case to camelCase for frontend compatibility
    const formattedProfile = {
      userId: profile.user_id,
      name: profile.name,
      age: profile.age,
      cycleLength: profile.cycle_length,
      periodLength: profile.period_length,
      lastPeriodDate: profile.last_period_date,
      id: profile.id
    };
    
    res.json(formattedProfile);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch profile', message: error.message });
  }
};

// Create or update profile
export const updateProfile = async (req, res) => {
  try {
    const userId = req.body.userId || 'default-user';
    
    // Check if profile exists
    let profile = await ProfileModel.getProfile(userId);
    
    const profileData = {
      user_id: userId,
      name: req.body.name,
      age: req.body.age,
      cycle_length: req.body.cycleLength,
      period_length: req.body.periodLength,
      last_period_date: req.body.lastPeriodDate
    };

    if (profile) {
      profile = await ProfileModel.updateProfile(userId, profileData);
    } else {
      profile = await ProfileModel.createProfile(profileData);
    }

    // Convert to camelCase for frontend
    const formattedProfile = {
      userId: profile.user_id,
      name: profile.name,
      age: profile.age,
      cycleLength: profile.cycle_length,
      periodLength: profile.period_length,
      lastPeriodDate: profile.last_period_date,
      id: profile.id
    };

    res.json(formattedProfile);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update profile', message: error.message });
  }
};
