// models/CouponModel.js
import { DataTypes } from "sequelize";
import { sequelize } from "../../Connection.js";

export const couponModel = sequelize.define("Coupon", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  code: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
  },
  discountType: {
    type: DataTypes.ENUM("percentage", "fixed"),
    allowNull: false,
  },
  discountValue: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  expiryDate: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  usageLimit: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
}, {
  timestamps: true
});
