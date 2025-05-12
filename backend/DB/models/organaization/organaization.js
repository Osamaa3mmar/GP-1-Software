import { DataTypes } from "sequelize";
import { sequelize } from "../../Connection.js";
import { userModel } from "../UserModel/user.model.js";
import { courseModel } from "../CourseModel/course.model.js";

export const organizationModel = sequelize.define("organaization", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  tags: {
    type: DataTypes.JSON,
    allowNull: true,
    defaultValue: {},
  },
  profile:{
    type: DataTypes.STRING,
    allowNull: true,

  },
  backGroundImage:{
    type: DataTypes.STRING,
    allowNull: true,
  }
});



userModel.hasOne(organizationModel,{
    as:"owner",
    foreignKey: "ownerId",
});
organizationModel.belongsTo(userModel,{
    as:"owner",
    foreignKey: "ownerId",
});

organizationModel.hasMany(userModel, {
    as: "teachers",  // ✅ This is fine for hasMany
    foreignKey: "orgId",
    constraints: false
});

userModel.belongsTo(organizationModel, {
    as: "organization",  // ✅ Different alias for belongsTo
    foreignKey: "orgId",
    constraints: false
});

organizationModel.hasMany(courseModel,{
    as:'courses',
    foreignKey:'orgId',
})
courseModel.belongsTo(organizationModel,{
  as:"organization",
  foreignKey: "orgId",

})