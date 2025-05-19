import { DataTypes } from "sequelize";
import { sequelize } from "../../Connection.js";
import { lessonSectionModel } from "../Section/Section.modal.js";
import { courseModel } from "../CourseModel/course.model.js"; // تأكد أن المسار صحيح

export const lessonModel = sequelize.define("Lesson", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  courseId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  title: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  order: {
    type: DataTypes.INTEGER,
    allowNull: true
  }
}, {
  timestamps: true
});

// علاقات مع sections
lessonModel.hasMany(lessonSectionModel, {
  as: "sections",
  foreignKey: "lessonId"
});
lessonSectionModel.belongsTo(lessonModel, {
  as: "lesson",
  foreignKey: "lessonId"
});

// علاقات مع courses
courseModel.hasMany(lessonModel, {
  as: "lessons",
  foreignKey: "courseId"
});
lessonModel.belongsTo(courseModel, {
  as: "course",
  foreignKey: "courseId"
});
