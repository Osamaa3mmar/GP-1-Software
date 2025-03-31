import { DataTypes } from "sequelize";
import { sequelize } from "../../Connection.js";
import { userModel } from "../UserModel/user.model.js";
import { courseModel } from "../CourseModel/course.model.js";


export const enrollmentModel=sequelize.define("Enrollment",{
    id:{
        type:DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    progress:{
        type:DataTypes.INTEGER,
        allowNull: false,
        defaultValue:0,
    },
}
)



userModel.hasMany(enrollmentModel,{
    as:'enrollments',
    foreignKey:'studentId',
});
enrollmentModel.belongsTo(userModel, {
    as: 'student',
    foreignKey: 'studentId',
});


courseModel.haveMany(enrollmentModel,{
    as:'enrollments',
    foreignKey:'courseId',
})

enrollmentModel.belongsTo(courseModel, {
    as: 'course',
    foreignKey: 'courseId',
});
