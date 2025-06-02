import { DataTypes } from "sequelize";
import { sequelize } from "../../Connection.js";
import { userModel } from "../UserModel/user.model.js";
import { conversationModel } from "./Conversation.js";

export const conversationParticipantModel = sequelize.define('ConversationParticipant', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  conversationId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'conversations',
      key: 'id'
    }
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'users',
      key: 'id'
    }
  },
  role: {
    type: DataTypes.ENUM('admin', 'member', 'teacher', 'student', 'company_rep', 'support'),
    defaultValue: 'member'
  },
  lastReadMessageId: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  isArchived: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  isMuted: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  notificationPreference: {
    type: DataTypes.ENUM('all', 'mentions', 'none'),
    defaultValue: 'all'
  },
  joinedAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  }
}, {
  timestamps: true,
  indexes: [
    {
      unique: true,
      fields: ['conversationId', 'userId'] // A user can only be in a conversation once
    }
  ]
});

// Define relationships
conversationParticipantModel.belongsTo(conversationModel, { foreignKey: 'conversationId' });
conversationParticipantModel.belongsTo(userModel, { foreignKey: 'userId' });

// Add many-to-many relationship between users and conversations
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

export default conversationParticipantModel;
