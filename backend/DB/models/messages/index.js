import { messageModel } from './Message.js';
import { conversationModel } from './Conversation.js';
import { conversationParticipantModel } from './ConversationParticipant.js';
import { messageReactionModel } from './MessageReaction.js';

// Create additional relationships
messageModel.hasMany(messageReactionModel, { foreignKey: 'messageId', as: 'reactions' });

// Export all models
export {
  messageModel,
  conversationModel,
  conversationParticipantModel,
  messageReactionModel
};
