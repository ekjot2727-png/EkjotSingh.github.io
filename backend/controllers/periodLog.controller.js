import * as PeriodLogModel from '../models/supabase/PeriodLog.js';

// Get all period logs for a user
export const getPeriodLogs = async (req, res) => {
  try {
    const userId = req.query.userId || 'default-user';
    const logs = await PeriodLogModel.getPeriodLogs(userId);
    res.json(logs);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch period logs', message: error.message });
  }
};

// Create a new period log
export const createPeriodLog = async (req, res) => {
  try {
    const userId = req.body.userId || 'default-user';
    const logData = {
      user_id: userId,
      date: req.body.date,
      flow: req.body.flow,
      pain: req.body.pain,
      mood: req.body.mood || '',
      symptoms: req.body.symptoms || [],
      notes: req.body.notes || ''
    };

    const log = await PeriodLogModel.createPeriodLog(logData);
    res.status(201).json(log);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create period log', message: error.message });
  }
};

// Update a period log
export const updatePeriodLog = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = {
      date: req.body.date,
      flow: req.body.flow,
      pain: req.body.pain,
      mood: req.body.mood,
      symptoms: req.body.symptoms,
      notes: req.body.notes
    };
    
    const log = await PeriodLogModel.updatePeriodLog(id, updates);

    if (!log) {
      return res.status(404).json({ error: 'Period log not found' });
    }

    res.json(log);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update period log', message: error.message });
  }
};

// Delete a period log
export const deletePeriodLog = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await PeriodLogModel.deletePeriodLog(id);

    if (!deleted) {
      return res.status(404).json({ error: 'Period log not found' });
    }

    res.json({ message: 'Period log deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete period log', message: error.message });
  }
};
