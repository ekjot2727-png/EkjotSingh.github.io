// Compatibility wrapper for legacy `HygieneReminder.model.js`.
import * as HygieneModel from '../models/supabase/HygieneReminder.js';

const toLegacy = (r) => {
  if (!r) return null;
  return {
    _id: r.id || null,
    userId: r.user_id || r.userId,
    title: r.title,
    interval: r.frequency || r.interval,
    enabled: r.is_active !== undefined ? r.is_active : r.enabled,
    lastReminded: r.last_reminded || r.lastReminded || null,
    createdAt: r.created_at,
    updatedAt: r.updated_at
  };
};

const HygieneReminder = {
  async find(query) {
    const userId = query?.userId || query?.user_id || 'default-user';
    const items = await HygieneModel.getHygieneReminders(userId);
    return items.map(toLegacy);
  },
  async create(data) {
    const rec = {
      user_id: data.userId || data.user_id || 'default-user',
      title: data.title,
      frequency: data.interval || data.frequency,
      is_active: data.enabled !== undefined ? data.enabled : true,
      description: data.description || ''
    };
    const r = await HygieneModel.createHygieneReminder(rec);
    return toLegacy(r);
  },
  async findByIdAndUpdate(id, updates) {
    const r = await HygieneModel.updateHygieneReminder(id, updates);
    return toLegacy(r);
  },
  async findByIdAndDelete(id) {
    const deleted = await HygieneModel.deleteHygieneReminder(id);
    return deleted ? { _id: id } : null;
  }
};

export default HygieneReminder;
