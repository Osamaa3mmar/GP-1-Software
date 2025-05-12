import { DataTypes } from "sequelize";
import { sequelize } from "../../Connection.js";



export const userModel =sequelize.define("User",{
    id:{
        type:DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    email:{
        type:DataTypes.STRING(50),
        unique:true,
        allowNull:false,
        validate:{
            isEmail:true,
        },
    },
    username:{ 
        type:DataTypes.STRING(30),
        allowNull:false,
        unique:true,
    },
    role:{
        type:DataTypes.ENUM("user","owner","tech"),
        allowNull:false,
        defaultValue:"user",
    },
    profilePic:{
        type:DataTypes.STRING,
    },
    bio:{
        type:DataTypes.TEXT,
        allowNull:true,
    },
    password:{
        type:DataTypes.STRING(60),
        allowNull:false,
    },
    links:{
        type:DataTypes.JSON,
        allowNull:true,
    },
    files:{
        type:DataTypes.JSON,
        allowNull:true,
    },
    specialization:{
        type:DataTypes.STRING,
    },
    verifyEmail:{
        type:DataTypes.BOOLEAN,
        defaultValue:false,
    },
    sentVerifyEmail:{
        type:DataTypes.BOOLEAN,
        defaultValue:false,
    },
    resetCode:{
        type:DataTypes.BOOLEAN,
        allowNull:false,
        defaultValue:false,
    },
    code:{
        type:DataTypes.STRING,
        allowNull:true,
    }
})