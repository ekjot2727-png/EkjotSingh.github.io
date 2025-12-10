import supabase from '../../config/database.js';

// In-memory fallback storage
let hygieneRemindersStore = [];

export const createHygieneReminder = async (reminderData) => {
  try {
    const { data, error } = await supabase
      .from('hygiene_reminders')
      .insert([reminderData])
      .select();
    
    if (error) throw error;
    return data[0];
  } catch (err) {
    const newReminder = { id: Date.now(), ...reminderData };
    hygieneRemindersStore.push(newReminder);
    return newReminder;
  }
};

export const getHygieneReminders = async (userId) => {
  try {
    const { data, error } = await supabase
      .from('hygiene_reminders')
      .select('*')
      .eq('user_id', userId);
    
    if (error) throw error;
    return data || [];
  } catch (err) {
    return hygieneRemindersStore.filter(r => r.user_id === userId);
  }
};

export const updateHygieneReminder = async (reminderId, updates) => {
  try {
    const { data, error } = await supabase
      .from('hygiene_reminders')
      .update(updates)
      .eq('id', reminderId)
      .select();
    
    if (error) throw error;
    return data[0];
  } catch (err) {
    const index = hygieneRemindersStore.findIndex(r => r.id === reminderId);
    if (index >= 0) {
      hygieneRemindersStore[index] = { ...hygieneRemindersStore[index], ...updates };
      return hygieneRemindersStore[index];
    }
    return null;
  }
};

export const deleteHygieneReminder = async (reminderId) => {
  try {
    const { error } = await supabase
      .from('hygiene_reminders')
      .delete()
      .eq('id', reminderId);
    
    if (error) throw error;
    return true;
  } catch (err) {
    hygieneRemindersStore = hygieneRemindersStore.filter(r => r.id !== reminderId);
    return true;
  }
};
