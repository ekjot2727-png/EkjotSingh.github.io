import supabase from '../config/database.js';

// In-memory fallback storage
let chatMessagesStore = [];

export const createChatMessage = async (messageData) => {
  try {
    const { data, error } = await supabase
      .from('chat_messages')
      .insert([messageData])
      .select();
    
    if (error) throw error;
    return data[0];
  } catch (err) {
    const newMessage = { id: Date.now(), ...messageData, created_at: new Date().toISOString() };
    chatMessagesStore.push(newMessage);
    return newMessage;
  }
};

export const getChatHistory = async (userId) => {
  try {
    const { data, error } = await supabase
      .from('chat_messages')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: true });
    
    if (error) throw error;
    return data || [];
  } catch (err) {
    return chatMessagesStore.filter(msg => msg.user_id === userId).sort((a, b) => new Date(a.created_at) - new Date(b.created_at));
  }
};

export const deleteChatHistory = async (userId) => {
  try {
    const { error } = await supabase
      .from('chat_messages')
      .delete()
      .eq('user_id', userId);
    
    if (error) throw error;
    return true;
  } catch (err) {
    chatMessagesStore = chatMessagesStore.filter(msg => msg.user_id !== userId);
    return true;
  }
};
