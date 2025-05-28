import { Router } from 'express';
import * as messagingController from './messaging.controller.js';
import { auth } from '../../middleware/auth.js';

const router = Router();

// Get user conversations
router.get('/conversations/:userId', auth(), messagingController.getUserConversations);

// Create new conversation
router.post('/conversations', auth(), messagingController.createConversation);

// Get conversation messages
router.get('/conversations/:conversationId/messages', auth(), messagingController.getConversationMessages);

// Send message
router.post('/messages', auth(), messagingController.sendMessage);

// Add reaction to message
router.post('/messages/:messageId/reactions', auth(), messagingController.addReaction);

// Remove reaction from message
router.delete('/messages/:messageId/reactions/:userId', auth(), messagingController.removeReaction);

// Mark conversation as read
router.put('/conversations/:conversationId/read', auth(), messagingController.markAsRead);

export default router;
