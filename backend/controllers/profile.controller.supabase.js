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
    
    res.json(profile);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch profile', message: error.message });
  }
};

// Create or update profile
export const updateProfile = async (req, res) => {
  try {
    const userId = req.body.userId || 'default-user';
    
    // First check if profile exists
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
      // Update existing profile
      profile = await ProfileModel.updateProfile(userId, profileData);
    } else {
      // Create new profile
      profile = await ProfileModel.createProfile(profileData);
    }

    res.json(profile);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update profile', message: error.message });
  }
};

// Delete profile
export const deleteProfile = async (req, res) => {
  try {
    const userId = req.query.userId || 'default-user';
    await ProfileModel.deleteProfile(userId);
    res.json({ success: true, message: 'Profile deleted' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete profile', message: error.message });
  }
};
