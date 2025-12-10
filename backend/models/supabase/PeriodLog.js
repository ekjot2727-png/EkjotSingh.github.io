import supabase from '../config/database.js';

// In-memory fallback storage
let periodLogsStore = [];

export const createPeriodLog = async (logData) => {
  try {
    const { data, error } = await supabase
      .from('period_logs')
      .insert([logData])
      .select();
    
    if (error) throw error;
    return data[0];
  } catch (err) {
    const newLog = { id: Date.now(), ...logData };
    periodLogsStore.push(newLog);
    return newLog;
  }
};

export const getPeriodLogs = async (userId) => {
  try {
    const { data, error } = await supabase
      .from('period_logs')
      .select('*')
      .eq('user_id', userId)
      .order('date', { ascending: false });
    
    if (error) throw error;
    return data || [];
  } catch (err) {
    return periodLogsStore.filter(log => log.user_id === userId).sort((a, b) => new Date(b.date) - new Date(a.date));
  }
};

export const getPeriodLogByDate = async (userId, date) => {
  try {
    const { data, error } = await supabase
      .from('period_logs')
      .select('*')
      .eq('user_id', userId)
      .eq('date', date)
      .single();
    
    if (error && error.code !== 'PGRST116') throw error;
    return data;
  } catch (err) {
    return periodLogsStore.find(log => log.user_id === userId && log.date === date);
  }
};

export const updatePeriodLog = async (logId, updates) => {
  try {
    const { data, error } = await supabase
      .from('period_logs')
      .update(updates)
      .eq('id', logId)
      .select();
    
    if (error) throw error;
    return data[0];
  } catch (err) {
    const index = periodLogsStore.findIndex(log => log.id === logId);
    if (index >= 0) {
      periodLogsStore[index] = { ...periodLogsStore[index], ...updates };
      return periodLogsStore[index];
    }
    return null;
  }
};

export const deletePeriodLog = async (logId) => {
  try {
    const { error } = await supabase
      .from('period_logs')
      .delete()
      .eq('id', logId);
    
    if (error) throw error;
    return true;
  } catch (err) {
    periodLogsStore = periodLogsStore.filter(log => log.id !== logId);
    return true;
  }
};
