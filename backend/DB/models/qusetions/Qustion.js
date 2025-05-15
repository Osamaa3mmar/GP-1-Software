import { DataTypes } from "sequelize";
import { sequelize } from "../../Connection.js";
import { quizModel } from "../quizes/Quiz.js";

export const questionModel = sequelize.define('Question', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  quizId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  questionText: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  options: {
    type: DataTypes.JSON,
    allowNull: false
  },
  correctAnswer: {
    type: DataTypes.STRING,
    allowNull: false
  },
  marks: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 1
  },
  explanation: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  type: {
    type: DataTypes.ENUM('mcq', 'true_false', 'fill_blank'),
    allowNull: false,
    defaultValue: 'mcq'
  }
}, {
  timestamps: true
});
// One Quiz has many Questions
quizModel.hasMany(questionModel, {
  as: 'questions',
  foreignKey: 'quizId'
});

// Each Question belongs to a Quiz
questionModel.belongsTo(quizModel, {
  as: 'quiz',
  foreignKey: 'quizId'
});


