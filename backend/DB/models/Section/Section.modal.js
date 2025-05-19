
import { DataTypes } from "sequelize";
import { sequelize } from "../../Connection.js";
import { quizModel } from "../quizes/Quiz.js";
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
  },quizId: {
  type: DataTypes.INTEGER,
  allowNull: true,
  references: {
    model: quizModel, // ✅ الأفضل استخدام الكائن نفسه
    key: 'id'
  },
  onDelete: 'SET NULL',
  onUpdate: 'CASCADE'
}
}, {
  timestamps: true
});

lessonSectionModel.belongsTo(quizModel, {
  as: "quiz",
  foreignKey: "quizId"
});

// كويز ممكن يكون له سكشن (إذا كان يظهر في مكان واحد فقط)
quizModel.hasOne(lessonSectionModel, {
  as: "section",
  foreignKey: "quizId"
});