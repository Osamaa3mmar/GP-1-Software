import { DataTypes } from "sequelize";
import { sequelize } from "../../Connection.js";
import { userModel } from "../UserModel/user.model.js";
import { messageModel } from "./Message.js";

export const messageReactionModel = sequelize.define('MessageReaction', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  messageId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'messages',
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
  reactionType: {
    type: DataTypes.STRING(50), // e.g., 'like', 'love', 'laugh', 'wow', 'sad', 'angry'
    allowNull: false
  },
  createdAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  }
}, {
  timestamps: true,
  indexes: [
    {
      unique: true,
      fields: ['messageId', 'userId', 'reactionType'] // A user can only have one reaction type per message
    }
  ]
});

// Define relationships
messageReactionModel.belongsTo(messageModel, { foreignKey: 'messageId' });
messageReactionModel.belongsTo(userModel, { foreignKey: 'userId' });
messageModel.hasMany(messageReactionModel, { foreignKey: 'messageId' });

export default messageReactionModel;
