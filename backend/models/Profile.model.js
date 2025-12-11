// Compatibility wrapper for legacy `Profile.model.js`.
// This file no longer uses mongoose. It re-exports a minimal
// interface backed by the Supabase models or an in-memory fallback.

import * as ProfileModel from '../models/supabase/Profile.js';

const toLegacy = (p) => {
  if (!p) return null;
  return {
    _id: p.id || null,
    userId: p.user_id || p.userId || null,
    name: p.name,
    age: p.age,
    cycleLength: p.cycle_length || p.cycleLength,
    periodLength: p.period_length || p.periodLength,
    lastPeriodDate: p.last_period_date || p.lastPeriodDate,
    createdAt: p.created_at || p.createdAt,
    updatedAt: p.updated_at || p.updatedAt
  };
};

const Profile = {
  async findOne(query) {
    const userId = query?.userId || query?.user_id || 'default-user';
    const p = await ProfileModel.getProfile(userId);
    return toLegacy(p);
  },
  async create(data) {
    const record = {
      user_id: data.userId || data.user_id || 'default-user',
      name: data.name,
      age: data.age,
      cycle_length: data.cycleLength || data.cycle_length,
      period_length: data.periodLength || data.period_length,
      last_period_date: data.lastPeriodDate || data.last_period_date
    };
    const p = await ProfileModel.createProfile(record);
    return toLegacy(p);
  },
  async findOneAndUpdate(query, updates, options = {}) {
    const userId = query?.userId || query?.user_id || 'default-user';
    const updatePayload = {
      user_id: userId,
      name: updates.name,
      age: updates.age,
      cycle_length: updates.cycleLength || updates.cycle_length,
      period_length: updates.periodLength || updates.period_length,
      last_period_date: updates.lastPeriodDate || updates.last_period_date
    };
    const p = await ProfileModel.updateProfile(userId, updatePayload);
    return toLegacy(p);
  }
};

export default Profile;
