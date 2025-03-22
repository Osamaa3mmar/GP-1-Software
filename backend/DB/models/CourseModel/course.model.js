import { DataTypes } from "sequelize";
import { sequelize } from "../../Connection.js";

export const courseModel = sequelize.define('Course', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  title: {
    type: DataTypes.STRING(50),
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  size: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue:1,
  },
  rating: {
    type: DataTypes.FLOAT,
    allowNull: true,
    validate: {
      min: 0,
      max: 5
    },
    defaultValue:0,
  },
  price: {
    type: DataTypes.FLOAT,
    allowNull: false,
    defaultValue:0,
  },
  duration: {
    type: DataTypes.INTEGER,
    allowNull: true
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
    allowNull: true,
    defaultValue:{}
  },
  thumbnail: {
    type: DataTypes.STRING,
    allowNull: true
  },
  backImage: {
    type: DataTypes.STRING,
    allowNull: true
  },
  learningPath: {
    type: DataTypes.STRING(255),
    allowNull: true
  },
  language: {
    type: DataTypes.STRING(20),
    allowNull: true
  },
  learningOutcomes: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  certification: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue:false,
  },
  prerequisites: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  enrollmentNumber: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue:0,
  },
  completionStatus: {
    type: DataTypes.ENUM(
        "notStarted", 
        "inProgress",  
        "pending",    
        "canceled",   
        "completed", 
        "archived"  
    ),
    allowNull: false,
    defaultValue: "notStarted"
}
}, {
  timestamps: true
});

