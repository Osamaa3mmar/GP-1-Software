// Messaging system setup and sample data
import { sequelize } from '../../Connection.js';
import { userModel } from '../UserModel/user.model.js';
import { courseModel } from '../CourseModel/course.model.js';
import { quizModel } from '../quizes/Quiz.js';

// Import messaging models
import { messageModel } from './Message.js';
import { conversationModel } from './Conversation.js';
import { conversationParticipantModel } from './ConversationParticipant.js';
import { messageReactionModel } from './MessageReaction.js';

// Create sample data for testing
export const createSampleMessagingData = async () => {
  try {
    console.log('Creating sample messaging data...');
    
    // Get some existing users or create new ones if needed
    const users = await userModel.findAll({ limit: 3 });
    
    if (users.length < 3) {
      console.log('Not enough users found for sample data');
      return;
    }
    
    // Create a sample conversation
    const conversation = await conversationModel.create({
      title: 'Sample Course Discussion',
      type: 'group',
      metadata: { isActive: true }
    });
    
    // Add participants to the conversation
    await Promise.all(users.map(user => 
      conversationParticipantModel.create({
        conversationId: conversation.id,
        userId: user.id,
        role: user.id % 2 === 0 ? 'teacher' : 'student'
      })
    ));
    
    // Create some sample messages
    const message1 = await messageModel.create({
      content: 'Welcome to the course discussion!',
      senderId: users[0].id,
      conversationId: conversation.id
    });
    
    const message2 = await messageModel.create({
      content: 'Thanks for the welcome!',
      senderId: users[1].id,
      conversationId: conversation.id
    });
    
    // Create a reply to a message
    await messageModel.create({
      content: 'You\'re welcome!',
      senderId: users[0].id,
      conversationId: conversation.id,
      parentMessageId: message2.id
    });
    
    // Add a reaction to a message
    await messageReactionModel.create({
      messageId: message1.id,
      userId: users[1].id,
      reactionType: 'like'
    });
    
    // Create a direct conversation
    const directConversation = await conversationModel.create({
      type: 'direct'
    });
    
    // Add two participants for direct messaging
    await Promise.all([
      conversationParticipantModel.create({
        conversationId: directConversation.id,
        userId: users[0].id
      }),
      conversationParticipantModel.create({
        conversationId: directConversation.id,
        userId: users[2].id
      })
    ]);
    
    // Add a message with shared content
    await messageModel.create({
      content: 'Check out this quiz!',
      senderId: users[0].id,
      conversationId: directConversation.id,
      sharedContentType: 'quiz',
      sharedContentId: 1, // Assuming quiz with ID 1 exists
      previewData: { title: 'Quiz on JavaScript Basics', questions: 10 }
    });
    
    // Create a company support conversation
    const supportConversation = await conversationModel.create({
      title: 'Support Channel',
      type: 'support',
      metadata: { department: 'Technical Support' }
    });
    
    // Add company rep and student
    await Promise.all([
      conversationParticipantModel.create({
        conversationId: supportConversation.id,
        userId: users[0].id,
        role: 'company_rep'
      }),
      conversationParticipantModel.create({
        conversationId: supportConversation.id,
        userId: users[1].id,
        role: 'student'
      })
    ]);
    
    // Add support messages
    await messageModel.create({
      content: 'Hello, how can I help you with your course today?',
      senderId: users[0].id,
      conversationId: supportConversation.id
    });
    
    await messageModel.create({
      content: 'I\'m having trouble accessing the quiz in section 3.',
      senderId: users[1].id,
      conversationId: supportConversation.id
    });
    
    console.log('Sample messaging data created successfully!');
  } catch (error) {
    console.error('Error creating sample data:', error);
  }
};

// Initialize all messaging models
export const initializeMessagingModels = async () => {
  try {
    // Make sure all models are properly registered with Sequelize
    console.log('Registering messaging models with Sequelize...');
    
    // Ensure relationships are set up correctly
    messageModel.belongsTo(userModel, { as: 'sender', foreignKey: 'senderId' });
    messageModel.belongsTo(messageModel, { as: 'parentMessage', foreignKey: 'parentMessageId' });
    messageModel.hasMany(messageModel, { as: 'replies', foreignKey: 'parentMessageId' });
    messageModel.hasMany(messageReactionModel, { foreignKey: 'messageId', as: 'reactions' });
    
    conversationModel.hasMany(messageModel, { foreignKey: 'conversationId' });
    conversationModel.belongsTo(courseModel, { foreignKey: 'courseId', as: 'course' });
    conversationModel.belongsTo(quizModel, { foreignKey: 'quizId', as: 'quiz' });
    
    conversationModel.belongsToMany(userModel, {
      through: conversationParticipantModel,
      as: 'participants',
      foreignKey: 'conversationId'
    });
    
    userModel.belongsToMany(conversationModel, {
      through: conversationParticipantModel,
      as: 'conversations',
      foreignKey: 'userId'
    });
    
    console.log('Messaging models registered successfully');
  } catch (error) {
    console.error('Error initializing messaging models:', error);
  }
};

// Export all models
export {
  messageModel,
  conversationModel,
  conversationParticipantModel,
  messageReactionModel
};
