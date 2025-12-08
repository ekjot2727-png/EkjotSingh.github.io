import HygieneReminder from '../models/HygieneReminder.model.js';

// Get all hygiene reminders
export const getReminders = async (req, res) => {
  try {
    const userId = req.query.userId || 'default-user';
    const reminders = await HygieneReminder.find({ userId });
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
      userId,
      title: req.body.title,
      interval: req.body.interval,
      enabled: req.body.enabled !== undefined ? req.body.enabled : true
    };

    const reminder = await HygieneReminder.create(reminderData);
    res.status(201).json(reminder);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create reminder', message: error.message });
  }
};

// Update a reminder
export const updateReminder = async (req, res) => {
  try {
    const { id } = req.params;
    const reminder = await HygieneReminder.findByIdAndUpdate(
      id,
      req.body,
      { new: true, runValidators: true }
    );

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
    const reminder = await HygieneReminder.findByIdAndDelete(id);

    if (!reminder) {
      return res.status(404).json({ error: 'Reminder not found' });
    }

    res.json({ message: 'Reminder deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete reminder', message: error.message });
  }
};
