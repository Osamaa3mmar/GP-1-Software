import { DataTypes } from "sequelize";
import { sequelize } from "../../Connection.js";
import { userModel } from "../UserModel/user.model.js";
import { quizModel } from "../quizes/Quiz.js";
export const quizSubmissionModel = sequelize.define('QuizSubmission', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  quizId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  answers: {
    type: DataTypes.JSON,
    allowNull: false
  },
  score: {
    type: DataTypes.FLOAT,
    allowNull: true,
    defaultValue: 0
  },
  // Timing & Duration
  startedAt: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW
  },
  submittedAt: {
    type: DataTypes.DATE,
    allowNull: true
  },
  timeSpent: {
    type: DataTypes.INTEGER, // in seconds
    allowNull: true
  },
  
  // Status Tracking
  status: {
    type: DataTypes.ENUM('in_progress', 'submitted', 'graded', 'expired'),
    defaultValue: 'in_progress'
  },
  
  // Grading Details
  maxScore: {
    type: DataTypes.FLOAT,
    allowNull: true
  },
  passingScore: {
    type: DataTypes.FLOAT,
    allowNull: true
  },
  isPassed: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  
  feedback: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  status: {
    type: DataTypes.ENUM('submitted', 'graded', 'pending'),
    defaultValue: 'submitted',
    allowNull: false
  },
  submittedAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  },
  
}, {
  timestamps: true
});


// العلاقة: كل طالب عنده عدة تسليمات
userModel.hasMany(quizSubmissionModel, {
  as: "quizSubmissions",
  foreignKey: "userId"
});
quizSubmissionModel.belongsTo(userModel, {
  as: "student",
  foreignKey: "userId"
});

// العلاقة: كل كويز عنده تسليمات من طلاب
quizModel.hasMany(quizSubmissionModel, {
  as: "submissions",
  foreignKey: "quizId"
});
quizSubmissionModel.belongsTo(quizModel, {
  as: "quiz",
  foreignKey: "quizId"
});
