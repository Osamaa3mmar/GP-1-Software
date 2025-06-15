import { DataTypes } from "sequelize";
import { sequelize } from "../../Connection.js";
import { ConversitionModel } from "./Conversition.js";


export const MessageModel=sequelize.define('message',{
    id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },
    type:{
        type:DataTypes.ENUM(['normal','replay']),
        defaultValue:'normal'
    },
    senderId:{
        type:DataTypes.INTEGER,
        allowNull:false
    },
    senderType:{
        type:DataTypes.ENUM(['user','org']),
        allowNull:false
    },
    edited:{
        type:DataTypes.BOOLEAN,
        defaultValue:false
    },
    isRead:{
        type:DataTypes.BOOLEAN,
        defaultValue:false
    },
    reaction:{
        type:DataTypes.JSON,
        defaultValue:{}
    },
    payload:{
        type:DataTypes.TEXT,
        allowNull:false
    },
     repliedToId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: 'messages',
            key: 'id'
        },
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE'
    },
    time:{
        type:DataTypes.DATE,
        defaultValue:DataTypes.NOW
    },
    conversitionId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
        model: 'conversitions',
        key: 'id'
    },
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
}

}
)



ConversitionModel.hasMany(MessageModel, { as: 'messages', foreignKey: 'conversitionId' });
MessageModel.belongsTo(ConversitionModel, { as: 'conversition', foreignKey: 'conversitionId' });

MessageModel.belongsTo(MessageModel, { as: 'repliedTo', foreignKey: 'repliedToId' });
MessageModel.hasMany(MessageModel, { as: 'replies', foreignKey: 'repliedToId' });
