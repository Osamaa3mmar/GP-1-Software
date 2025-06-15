import { ConversitionModel } from "../../../../DB/models/MessageSystem/Conversition.js";
import { MessageModel } from "../../../../DB/models/MessageSystem/Message.js";

export const sendMessage = async (req, res) => {
  try {
    const {payload,convId,type,repliedToId,user}=req.body;
    if(!payload||!convId||!type){
        return res.status(400).json({ message: "Send All Data" });
    }
    const conv=await ConversitionModel.findByPk(convId);
    if(!conv){
        return res.status(404).json({ message: "Conversation not found" });
    }
    const typeSender=conv.userId==user.id?"user":"org";
    if(typeSender=="user"&&!conv.userId==user.id){
        return res.status(401).json({ message: "Unauthorized" });
    }
    const message=await MessageModel.create({
        payload,
        conversitionId:convId,
        type,
        repliedToId,
        senderId:user.id,
        senderType:typeSender
    })
    return res.status(200).json({ message: "Success",data:message });
  } catch (error) {
    return res.status(500).json({ message: "Server Error", error });
  }
};
