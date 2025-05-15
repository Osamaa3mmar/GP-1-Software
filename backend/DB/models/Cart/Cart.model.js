// models/CartModel.js
import { DataTypes } from "sequelize";
import { sequelize } from "../../Connection.js";
import { userModel } from "../UserModel/user.model.js";
import { couponModel } from "../copun/Coupon.model.js";

export const cartModel = sequelize.define("Cart", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  totalBeforeDiscount: {
    type: DataTypes.FLOAT,
    defaultValue: 0,
  },
  discount: {
    type: DataTypes.FLOAT,
    defaultValue: 0,
  },
  totalAfterDiscount: {
    type: DataTypes.FLOAT,
    defaultValue: 0,
  },
  couponCode: {
    type: DataTypes.STRING,
    allowNull: true,
  }
}, {
  timestamps: true
});

// Relations
userModel.hasOne(cartModel, {
  as: "cart",
  foreignKey: "userId"
});
cartModel.belongsTo(userModel, {
  as: "user",
  foreignKey: "userId"
});

// Coupon relation (based on code)
couponModel.hasMany(cartModel, {
  as: "carts",
  foreignKey: "couponCode",
  sourceKey: "code"
});
cartModel.belongsTo(couponModel, {
  as: "coupon",
  foreignKey: "couponCode",
  targetKey: "code"
});
