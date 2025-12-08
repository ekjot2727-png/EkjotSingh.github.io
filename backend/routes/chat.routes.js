import express from 'express';
import { 
  getChatHistory, 
  sendMessage, 
  clearChatHistory 
} from '../controllers/chat.controller.js';

const router = express.Router();

router.get('/history', getChatHistory);
router.post('/message', sendMessage);
router.delete('/history', clearChatHistory);

export default router;
