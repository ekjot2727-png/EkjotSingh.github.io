import PeriodLog from '../models/PeriodLog.model.js';

// Get all period logs for a user
export const getPeriodLogs = async (req, res) => {
  try {
    const userId = req.query.userId || 'default-user';
    const logs = await PeriodLog.find({ userId }).sort({ date: -1 });
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
      userId,
      date: req.body.date,
      flow: req.body.flow,
      pain: req.body.pain,
      mood: req.body.mood || '',
      symptoms: req.body.symptoms || [],
      notes: req.body.notes || ''
    };

    const log = await PeriodLog.create(logData);
    res.status(201).json(log);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create period log', message: error.message });
  }
};

// Update a period log
export const updatePeriodLog = async (req, res) => {
  try {
    const { id } = req.params;
    const log = await PeriodLog.findByIdAndUpdate(
      id,
      req.body,
      { new: true, runValidators: true }
    );

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
    const log = await PeriodLog.findByIdAndDelete(id);

    if (!log) {
      return res.status(404).json({ error: 'Period log not found' });
    }

    res.json({ message: 'Period log deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete period log', message: error.message });
  }
};
