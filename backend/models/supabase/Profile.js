import supabase from '../config/database.js';

// In-memory fallback storage
let profilesStore = [];

export const createProfile = async (profileData) => {
  try {
    const { data, error } = await supabase
      .from('profiles')
      .insert([profileData])
      .select();
    
    if (error) throw error;
    return data[0];
  } catch (err) {
    // Fallback to in-memory storage
    const newProfile = { id: Date.now(), ...profileData };
    profilesStore.push(newProfile);
    return newProfile;
  }
};

export const getProfile = async (userId) => {
  try {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('user_id', userId)
      .single();
    
    if (error && error.code !== 'PGRST116') throw error;
    return data;
  } catch (err) {
    return profilesStore.find(p => p.user_id === userId);
  }
};

export const updateProfile = async (userId, updates) => {
  try {
    const { data, error } = await supabase
      .from('profiles')
      .update(updates)
      .eq('user_id', userId)
      .select();
    
    if (error) throw error;
    return data[0];
  } catch (err) {
    const index = profilesStore.findIndex(p => p.user_id === userId);
    if (index >= 0) {
      profilesStore[index] = { ...profilesStore[index], ...updates };
      return profilesStore[index];
    }
    return null;
  }
};

export const deleteProfile = async (userId) => {
  try {
    const { error } = await supabase
      .from('profiles')
      .delete()
      .eq('user_id', userId);
    
    if (error) throw error;
    return true;
  } catch (err) {
    profilesStore = profilesStore.filter(p => p.user_id !== userId);
    return true;
  }
};
