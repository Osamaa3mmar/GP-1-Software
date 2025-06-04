import { DataTypes } from "sequelize";
import { sequelize } from "../../Connection.js";
import { userModel } from "../UserModel/user.model.js";

export const purchaseModel = sequelize.define('Purchase', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  totalBalance:{
    type: DataTypes.FLOAT,
    allowNull: false,
    defaultValue: 0,
  },
  courses:{
    type: DataTypes.JSON,
    allowNull: false,
  }
});

userModel.hasMany(purchaseModel, {
    as:"purchases",
    foreignKey:"userId",
});
purchaseModel.belongsTo(userModel, {
    as:"user",
    foreignKey:"userId",
});