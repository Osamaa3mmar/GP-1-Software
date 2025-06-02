import { messageModel } from '../../../DB/models/messages/Message.js';
import { conversationModel } from '../../../DB/models/messages/Conversation.js';
import { conversationParticipantModel } from '../../../DB/models/messages/ConversationParticipant.js';
import { messageReactionModel } from '../../../DB/models/messages/MessageReaction.js';
import { userModel } from '../../../DB/models/UserModel/user.model.js';

export const getUserConversations = async (req, res) => {
    try {
        const { userId } = req.params;
        const conversations = await conversationModel.findAll({
            include: [{
                model: conversationParticipantModel,
                where: { userId },
                attributes: ['role', 'lastReadMessageId']
            }, {
                model: messageModel,
                limit: 1,
                order: [['createdAt', 'DESC']],
                as: 'lastMessage'
            }]
        });
        res.json({ success: true, conversations });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Create new conversation
export const createConversation = async (req, res) => {
    try {
        const { title, type, participants } = req.body;
        const conversation = await conversationModel.create({ title, type });
        
        // Add participants
        await Promise.all(participants.map(participant => 
            conversationParticipantModel.create({
                conversationId: conversation.id,
                userId: participant.userId,
                role: participant.role || 'member'
            })
        ));

        res.json({ success: true, conversation });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Send message
export const sendMessage = async (req, res) => {
    try {
        const { content, senderId, conversationId, parentMessageId, sharedContent } = req.body;
        
        const message = await messageModel.create({
            content,
            senderId,
            conversationId,
            parentMessageId,
            ...(sharedContent && {
                sharedContentType: sharedContent.type,
                sharedContentId: sharedContent.id,
                previewData: sharedContent.preview
            })
        });

        res.json({ success: true, message });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Get conversation messages
export const getConversationMessages = async (req, res) => {
    try {
        const { conversationId } = req.params;
        const { page = 1, limit = 20 } = req.query;
        
        const messages = await messageModel.findAll({
            where: { conversationId },
            include: [{
                model: userModel,
                as: 'sender',
                attributes: ['id', 'name', 'email']
            }, {
                model: messageReactionModel,
                as: 'reactions'
            }],
            order: [['createdAt', 'DESC']],
            limit,
            offset: (page - 1) * limit
        });

        res.json({ success: true, messages });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Add reaction to message
export const addReaction = async (req, res) => {
    try {
        const { messageId, userId, reactionType } = req.body;
        
        const reaction = await messageReactionModel.create({
            messageId,
            userId,
            reactionType
        });

        res.json({ success: true, reaction });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Remove reaction from message
export const removeReaction = async (req, res) => {
    try {
        const { messageId, userId } = req.params;
        
        await messageReactionModel.destroy({
            where: { messageId, userId }
        });

        res.json({ success: true, message: 'Reaction removed' });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Mark conversation as read
export const markAsRead = async (req, res) => {
    try {
        const { conversationId, userId, lastMessageId } = req.body;
        
        await conversationParticipantModel.update(
            { lastReadMessageId: lastMessageId },
            { where: { conversationId, userId } }
        );

        res.json({ success: true, message: 'Marked as read' });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
