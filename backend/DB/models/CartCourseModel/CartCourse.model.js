// models/CartCourseModel.js
import { DataTypes } from "sequelize";
import { sequelize } from "../../Connection.js";
import { cartModel } from "../Cart/Cart.model.js";
import { courseModel } from "../CourseModel/course.model.js";

export const cartCourseModel = sequelize.define("CartCourse", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  priceAtAddTime: {
    type: DataTypes.FLOAT,
    allowNull: false,
  }
}, {
  timestamps: true
});

// Relations
cartModel.hasMany(cartCourseModel, {
  as: "courses",
  foreignKey: "cartId"
});
cartCourseModel.belongsTo(cartModel, {
  as: "cart",
  foreignKey: "cartId"
});

courseModel.hasMany(cartCourseModel, {
  as: "cartItems",
  foreignKey: "courseId"
});
cartCourseModel.belongsTo(courseModel, {
  as: "course",
  foreignKey: "courseId"
});
