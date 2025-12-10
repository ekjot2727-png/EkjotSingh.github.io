import * as HygieneReminderModel from '../models/supabase/HygieneReminder.js';

// Get all hygiene reminders
export const getReminders = async (req, res) => {
  try {
    const userId = req.query.userId || 'default-user';
    const reminders = await HygieneReminderModel.getHygieneReminders(userId);
    res.json(reminders);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch reminders', message: error.message });
  }
};

// Create a new reminder
export const createReminder = async (req, res) => {
  try {
    const userId = req.body.userId || 'default-user';
    const reminderData = {
      user_id: userId,
      title: req.body.title,
      frequency: req.body.interval || req.body.frequency,
      is_active: req.body.enabled !== undefined ? req.body.enabled : true,
      description: req.body.description || ''
    };

    const reminder = await HygieneReminderModel.createHygieneReminder(reminderData);
    res.status(201).json(reminder);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create reminder', message: error.message });
  }
};

// Update a reminder
export const updateReminder = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = {
      title: req.body.title,
      frequency: req.body.interval || req.body.frequency,
      is_active: req.body.enabled,
      description: req.body.description
    };
    
    const reminder = await HygieneReminderModel.updateHygieneReminder(id, updates);

    if (!reminder) {
      return res.status(404).json({ error: 'Reminder not found' });
    }

    res.json(reminder);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update reminder', message: error.message });
  }
};

// Delete a reminder
export const deleteReminder = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await HygieneReminderModel.deleteHygieneReminder(id);

    if (!deleted) {
      return res.status(404).json({ error: 'Reminder not found' });
    }

    res.json({ message: 'Reminder deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete reminder', message: error.message });
  }
};
