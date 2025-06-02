import { DataTypes } from "sequelize";
import { sequelize } from "../../Connection.js";

export const lessonSectionModel = sequelize.define("LessonSection", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  title: {
    type: DataTypes.STRING(100),
    allowNull: true
  },
  type: {
    type: DataTypes.ENUM("text", "video", "image", "code", "quiz"),
    allowNull: false
  },
  content: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  mediaUrl: {
    type: DataTypes.STRING,
    allowNull: true
  },
  order: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  quizId: {
    type: DataTypes.INTEGER,
    allowNull: true
  }
}, {
  timestamps: true
});

// Relationships with Quiz model will be defined in Quiz.js to avoid circular dependencies