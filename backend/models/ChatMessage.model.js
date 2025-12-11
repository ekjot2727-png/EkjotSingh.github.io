// Compatibility wrapper for legacy `ChatMessage.model.js`.
import * as ChatModel from '../models/supabase/ChatMessage.js';

const toLegacy = (m) => {
  if (!m) return null;
  return {
    _id: m.id || null,
    userId: m.user_id || m.userId,
    role: m.role,
    content: m.content,
    timestamp: m.created_at || m.timestamp
  };
};

const ChatMessage = {
  async find(query) {
    const userId = query?.userId || query?.user_id || 'default-user';
    const msgs = await ChatModel.getChatHistory(userId);
    return msgs.map(toLegacy);
  },
  async create(data) {
    const rec = {
      user_id: data.userId || data.user_id || 'default-user',
      role: data.role,
      content: data.content
    };
    const m = await ChatModel.createChatMessage(rec);
    return toLegacy(m);
  },
  async deleteMany(query) {
    const userId = query?.userId || query?.user_id || 'default-user';
    await ChatModel.deleteChatHistory(userId);
    return { deletedCount: 1 };
  }
};

export default ChatMessage;
