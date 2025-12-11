import supabase from '../../config/database.js';

// In-memory fallback storage
let chatMessagesStore = [];

export const createChatMessage = async (messageData) => {
  if (supabase) {
    try {
      const { data, error } = await supabase
        .from('chat_messages')
        .insert([messageData])
        .select();
      
      if (error) throw error;
      return data[0];
    } catch (err) {
      // Fallback on error
    }
  }
  const newMessage = { id: Date.now(), ...messageData, created_at: new Date().toISOString() };
  chatMessagesStore.push(newMessage);
  return newMessage;
};

export const getChatHistory = async (userId) => {
  if (supabase) {
    try {
      const { data, error } = await supabase
        .from('chat_messages')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: true });
      
      if (error) throw error;
      return data || [];
    } catch (err) {
      // Fallback on error
    }
  }
  return chatMessagesStore.filter(msg => msg.user_id === userId).sort((a, b) => new Date(a.created_at) - new Date(b.created_at));
};

export const deleteChatHistory = async (userId) => {
  if (supabase) {
    try {
      const { error } = await supabase
        .from('chat_messages')
        .delete()
        .eq('user_id', userId);
      
      if (error) throw error;
      return true;
    } catch (err) {
      // Fallback on error
    }
  }
  chatMessagesStore = chatMessagesStore.filter(msg => msg.user_id !== userId);
  return true;
};
