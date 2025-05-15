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
  },  location: {
    type: DataTypes.STRING(100),
    allowNull: true,
  },
  website: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  contactEmail: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  phoneNumber: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  foundedDate: {
    type: DataTypes.DATEONLY,
    allowNull: true,
  },
  isVerified: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  status: {
    type: DataTypes.ENUM("active", "inactive", "banned"),
    defaultValue: "active",
  },
  socialLinks: {
    type: DataTypes.JSON,
    allowNull: true,
    defaultValue: {},
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