import { DataTypes } from "sequelize";
import { sequelize } from "../../Connection.js";
export const applayModal = sequelize.define('Applayes', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  userId:{
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  status:{
    type:DataTypes.ENUM("Accepted","Denied","Pending"),
    allowNull: false,
  },
  orgId:{
    type:DataTypes.INTEGER,
    allowNull:false,
  }
}, {
  timestamps: true
});


