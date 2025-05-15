import { DataTypes } from "sequelize";
import { sequelize } from "../../Connection.js";
import { categoryModel } from "../Category/Category.js";

export const topicModel = sequelize.define('Topic', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING(50),
    allowNull: false
  },
  categoryId: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
}, {
  timestamps: true
});

categoryModel.hasMany(topicModel, {
  as: 'topics',
  foreignKey: 'categoryId'
});

topicModel.belongsTo(categoryModel, {
  as: 'category',
  foreignKey: 'categoryId'
});
