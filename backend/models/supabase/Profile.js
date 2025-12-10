import supabase from '../../config/database.js';

// In-memory fallback storage
let profilesStore = [];

export const createProfile = async (profileData) => {
  if (supabase) {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .insert([profileData])
        .select();
      
      if (error) throw error;
      return data[0];
    } catch (err) {
      // Fallback on error
    }
  }
  // In-memory storage fallback
  const newProfile = { id: Date.now(), ...profileData };
  profilesStore.push(newProfile);
  return newProfile;
};

export const getProfile = async (userId) => {
  if (supabase) {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('user_id', userId)
        .single();
      
      if (error && error.code !== 'PGRST116') throw error;
      return data;
    } catch (err) {
      // Fallback on error
    }
  }
  return profilesStore.find(p => p.user_id === userId);
};

export const updateProfile = async (userId, updates) => {
  if (supabase) {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .update(updates)
        .eq('user_id', userId)
        .select();
      
      if (error) throw error;
      return data[0];
    } catch (err) {
      // Fallback on error
    }
  }
  const index = profilesStore.findIndex(p => p.user_id === userId);
  if (index >= 0) {
    profilesStore[index] = { ...profilesStore[index], ...updates };
    return profilesStore[index];
  }
  return null;
};

export const deleteProfile = async (userId) => {
  if (supabase) {
    try {
      const { error } = await supabase
        .from('profiles')
        .delete()
        .eq('user_id', userId);
      
      if (error) throw error;
      return true;
    } catch (err) {
      // Fallback on error
    }
  }
  profilesStore = profilesStore.filter(p => p.user_id !== userId);
  return true;
};
