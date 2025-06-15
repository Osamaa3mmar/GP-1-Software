import { DataTypes } from "sequelize";
import { sequelize } from "../../Connection.js";
import { userModel } from "../UserModel/user.model.js";
import { organizationModel } from "../organaization/organaization.js";





export const ConversitionModel=sequelize.define('conversition',{
    id:{
        type:DataTypes.INTEGER,
        autoIncrement:true,
        primaryKey:true,
    },
    type:{
        type:DataTypes.ENUM(['t-o','s-o']),
        allowNull:false,
    },
}
)
userModel.hasMany(ConversitionModel,{as:"conversitions",foreignKey:"userId"});
ConversitionModel.belongsTo(userModel,{as:"user",foreignKey:"userId"});

organizationModel.hasMany(ConversitionModel,{as:"conversitions",foreignKey:"organizationId"});
ConversitionModel.belongsTo(organizationModel,{as:"organization",foreignKey:"organizationId"});

