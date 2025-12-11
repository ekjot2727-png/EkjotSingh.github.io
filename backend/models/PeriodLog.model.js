// Compatibility wrapper for legacy `PeriodLog.model.js`.
import * as PeriodModel from '../models/supabase/PeriodLog.js';

const toLegacy = (log) => {
  if (!log) return null;
  return {
    _id: log.id || null,
    userId: log.user_id || log.userId,
    date: log.date,
    flow: log.flow,
    pain: log.pain,
    mood: log.mood,
    symptoms: log.symptoms,
    notes: log.notes,
    createdAt: log.created_at,
    updatedAt: log.updated_at
  };
};

const PeriodLog = {
  async find(query) {
    const userId = query?.userId || query?.user_id || 'default-user';
    const logs = await PeriodModel.getPeriodLogs(userId);
    return logs.map(toLegacy);
  },
  async create(data) {
    const rec = {
      user_id: data.userId || data.user_id || 'default-user',
      date: data.date,
      flow: data.flow,
      pain: data.pain,
      mood: data.mood || '',
      symptoms: data.symptoms || [],
      notes: data.notes || ''
    };
    const log = await PeriodModel.createPeriodLog(rec);
    return toLegacy(log);
  },
  async findByIdAndUpdate(id, updates) {
    const log = await PeriodModel.updatePeriodLog(id, updates);
    return toLegacy(log);
  },
  async findByIdAndDelete(id) {
    const deleted = await PeriodModel.deletePeriodLog(id);
    return deleted ? { _id: id } : null;
  }
};

export default PeriodLog;
