import { DataTypes } from "sequelize";
import { sequelize } from "../../Connection.js";

const Course = sequelize.define('Course', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  instructorID: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  organizationID: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  size: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  rating: {
    type: DataTypes.FLOAT,
    allowNull: true,
    validate: {
      min: 0,
      max: 5
    }
  },
  price: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
  duration: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  startDate: {
    type: DataTypes.DATE,
    allowNull: false
  },
  endDate: {
    type: DataTypes.DATE,
    allowNull: false
  },
  tags: {
    type: DataTypes.JSON,
    allowNull: true
  },
  thumbnail: {
    type: DataTypes.STRING,
    allowNull: true
  },
  learningPath: {
    type: DataTypes.STRING,
    allowNull: true
  },
  language: {
    type: DataTypes.STRING,
    allowNull: false
  },
  learningOutcomes: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  certification: {
    type: DataTypes.BOOLEAN,
    allowNull: false
  },
  prerequisites: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  enrollmentNumber: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
}, {
  tableName: 'Courses',
  timestamps: true
});

module.exports = Course;