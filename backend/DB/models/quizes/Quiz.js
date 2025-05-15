import { DataTypes } from "sequelize";
import { sequelize } from "../../Connection.js";
import { courseModel } from "../CourseModel/course.model.js"; // تأكد من المسار

export const quizModel = sequelize.define('Quiz', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  title: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  courseId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  duration: {
    type: DataTypes.INTEGER, // in minutes
    allowNull: true
  },
  totalMarks: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  passMarks: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  difficulty: {
    type: DataTypes.ENUM('easy', 'medium', 'hard'),
    allowNull: false,
    defaultValue: 'medium'
  }
}, {
  timestamps: true
});

// علاقات مع courses
courseModel.hasMany(quizModel, {
  as: "quizzes",
  foreignKey: "courseId"
});
quizModel.belongsTo(courseModel, {
  as: "course",
  foreignKey: "courseId"
});
