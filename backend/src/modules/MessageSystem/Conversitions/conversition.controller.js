import { Op, where } from "sequelize";
import { courseModel } from "../../../../DB/models/CourseModel/course.model.js";
import { enrollmentModel } from "../../../../DB/models/Enrollment/Enrollments.js";
import { ConversitionModel } from "../../../../DB/models/MessageSystem/Conversition.js";
import { MessageModel } from "../../../../DB/models/MessageSystem/Message.js";
import { organizationModel } from "../../../../DB/models/organaization/organaization.js";
import { userModel } from "../../../../DB/models/UserModel/user.model.js";

export const makeAllPastConv = async (req, res) => {
  try {
    const convs = await ConversitionModel.findAll();
    if (convs.length != 0) {
      return res.status(300).json({ Message: "You allredy done it !" });
    }
    const enrollments = await enrollmentModel.findAll({
      attributes: ["studentId"],
      include: [
        {
          model: courseModel,
          as: "course",
          attributes: ["orgId"],
        },
      ],
    });
    const map = new Map();
    enrollments.forEach((e) => {
      let key = `${e.studentId}-${e.course.orgId}`;
      if (!map.has(key)) {
        map.set(key, {
          userId: e.studentId,
          organizationId: e.course.orgId,
          type: "s-o",
        });
      }
    });
    let x = Array.from(map.values());
    const check = await ConversitionModel.bulkCreate(x);
    return res.status(200).json({ check: check.length });
  } catch (error) {
    return res.status(500).json({ message: "Server Error", error });
  }
};

export const getUserConvs = async (req, res) => {
  try {
    const {user}=req.body;
    const convs=await ConversitionModel.findAll({
        where:{
            userId:user.id
        },
        attributes:["id","type"],
        include:[
    {
        model:organizationModel,
        as:"organization",
        attributes:["name","profile"],
        
    },
    {
      model: MessageModel,
      as: 'messages',
      
      limit: 1,
      order: [['time', 'DESC']],
      attributes: ['payload', 'time']
    }]
    })
    if(convs.length==0){
        return res.status(200).json({Message:"No Conversitions",convs:[]});
    }

    return res.status(200).json({Message:"Successs",convs});
  } catch (error) {
    return res.status(500).json({ message: "Server Error", error });
  }
};




export const getConvMessages=async (req,res)=>{
    try{
        const {user,type}=req.body;
        const {convId}=req.params;
        const conv=await ConversitionModel.findByPk(convId,{
            attributes:["id","type"],
            include:[{
                model:MessageModel,
                as:"messages",
                order: [['time', 'DESC']],
                
            },{
                model:organizationModel,
                as:"organization",
                attributes:["name","profile"],
            },{
                model:userModel,
                as:"user",
                attributes:["username","profilePic"]
            }]
        });
        if(!conv){
            return res.status(404).json({Message:"Conv not found"});
        }

        await MessageModel.update(
      { isRead: true },
      {
        where: {
          conversitionId: convId,
          isRead: false,
          senderId: { [Op.ne]: type=="user"?user.id:user.orgId},
        },
      }
    );
        console.log(user);
        return res.status(200).json({Message:"Success",conv});

    }catch(error){
        return res.status(500).json({message:"Server Error",error});
    }

}