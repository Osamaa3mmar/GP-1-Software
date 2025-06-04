import { DataTypes } from "sequelize";
import { sequelize } from "../../Connection.js";
import { userModel } from "../UserModel/user.model.js";
import { courseModel } from "../CourseModel/course.model.js";

export const rateModel = sequelize.define("Rate", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    rating: {
        type: DataTypes.FLOAT,
        allowNull: false,
        validate: {
            min: 1,
            max: 5
        }
    },
});

courseModel.hasMany(rateModel, {
    as: "rates",
    foreignKey: {
        name: "courseId",
        allowNull: false,
    },
});
rateModel.belongsTo(courseModel, {
    as: "course",
    foreignKey: {
        name: "courseId",
        allowNull: false,
    },
});
userModel.hasMany(rateModel, {
    as: "ratings",
    foreignKey: {
        name: "userId",
        allowNull: false,
    },
});
rateModel.belongsTo(userModel, {
    as: "user",
    foreignKey: {
        name: "userId",
        allowNull: false,
    },
});