import { DataTypes } from "sequelize";
import { sequelize } from "../../Connection.js";
import { userModel } from "../UserModel/user.model.js";
import { courseModel } from "../CourseModel/course.model.js";
import { lessonSectionModel } from "../Section/Section.modal.js";
import { quizModel } from "../quizes/Quiz.js";
import { messageModel } from "./Message.js";

export const conversationModel = sequelize.define('Conversation', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  title: {
    type: DataTypes.STRING(255),
    allowNull: true
  },
  type: {
    type: DataTypes.ENUM('direct', 'group', 'course', 'company', 'support'),
    allowNull: false,
    defaultValue: 'direct'
  },
  // For course/class related conversations
  courseId: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: 'courses',
      key: 'id'
    }
  },
  // For section/lesson specific conversations
  sectionId: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: 'LessonSections',
      key: 'id'
    }
  },
  // For quiz specific conversations
  quizId: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: 'quizzes',
      key: 'id'
    }
  },
  // For company/support conversations
  companyId: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  // Last message info for preview
  lastMessageId: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  lastMessageAt: {
    type: DataTypes.DATE,
    allowNull: true
  },
  // Additional metadata
  metadata: {
    type: DataTypes.JSON,
    allowNull: true
  }
}, {
  timestamps: true
});

// Define relationships
conversationModel.hasMany(messageModel, { foreignKey: 'conversationId' });
conversationModel.belongsTo(courseModel, { foreignKey: 'courseId', as: 'course' });
conversationModel.belongsTo(lessonSectionModel, { foreignKey: 'sectionId', as: 'section' });
conversationModel.belongsTo(quizModel, { foreignKey: 'quizId', as: 'quiz' });

export default conversationModel;
