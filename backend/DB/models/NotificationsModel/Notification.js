// models/Notification.js

import { DataTypes } from "sequelize";
import { sequelize } from "../../Connection.js";
import { userModel } from "../UserModel/user.model.js";
import {organizationModel} from "../organaization/organaization.js"

export const notificationModel = sequelize.define("Notification", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  type: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  icon: {
    type: DataTypes.STRING,
    allowNull: true
  },
  message: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  actionUrl: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  isRead: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  createdAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
}, {
  timestamps: false,
  tableName: 'notifications',
});



notificationModel.belongsTo(userModel, {
    foreignKey: "userId",
    onDelete: "CASCADE", 
  });
  
  userModel.hasMany(notificationModel, {
    foreignKey: "userId",
  });


  // إشعار تابع لمستخدم
notificationModel.belongsTo(userModel, {
  foreignKey: "userId",
  as: "user",
  onDelete: "CASCADE",
});

// إشعار ممكن يكون تابع لمؤسسة (organization)
notificationModel.belongsTo(organizationModel, {
  foreignKey: "organizationId",
  as: "organization",
  onDelete: "CASCADE",
});
