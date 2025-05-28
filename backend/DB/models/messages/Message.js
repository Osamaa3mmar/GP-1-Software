import { DataTypes } from "sequelize";
import { sequelize } from "../../Connection.js";
import { userModel } from "../UserModel/user.model.js";

export const messageModel = sequelize.define('Message', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  content: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  senderId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'users',
      key: 'id'
    }
  },
  conversationId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  parentMessageId: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: 'messages',
      key: 'id'
    }
  },
  isEdited: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  isDeleted: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  // For shared content (quiz, course, section, profile)
  sharedContentType: {
    type: DataTypes.ENUM('quiz', 'course', 'section', 'profile', 'none'),
    defaultValue: 'none'
  },
  sharedContentId: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  // For rich content preview
  previewData: {
    type: DataTypes.JSON,
    allowNull: true
  }
}, {
  timestamps: true,
  paranoid: true // Soft delete
});

// Define relationships
messageModel.belongsTo(userModel, { as: 'sender', foreignKey: 'senderId' });
messageModel.belongsTo(messageModel, { as: 'parentMessage', foreignKey: 'parentMessageId' });
messageModel.hasMany(messageModel, { as: 'replies', foreignKey: 'parentMessageId' });

export default messageModel;
