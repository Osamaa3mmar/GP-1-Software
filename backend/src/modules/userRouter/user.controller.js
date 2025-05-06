import { courseModel } from "../../../DB/models/CourseModel/course.model.js";
import { enrollmentModel } from "../../../DB/models/Enrollment/Enrollments.js";
import { userModel } from "../../../DB/models/UserModel/user.model.js";




export const getMyProfile=async (req,res)=>{
    console.log(req.body.user);
    try{
        const {user}=req.body;
        const fullUser=await userModel.findByPk(user.id,{
            attributes: ['username','profilePic','role','id','email','orgId']
        });
        if(fullUser){
            return res.status(200).json({message:"Success",user:fullUser});
        }
        return res.status(404).json({message:" Couldn't find user"});
        console.log(fullUser);
    }catch(error){
        return res.status(404).json({message:" user not found!",error});
    }
    return res.status(200).json({message:"Ok"});
}



export const getFullProfile=async (req,res)=>{
    try{
        const {id}=req.body;
        console.log(id);
        const fullUser=await userModel.findByPk(id,{
            attributes:['bio','links','files','specialization','username','profilePic'],
            include:[{
                model:enrollmentModel,
                as:"enrollments",
                        attributes:['progress'],
                include:[
                    {
                        model:courseModel,
                        as:"course",
                        attributes:['title','duration','thumbnail'],

                    }
                ]
            }]
        })
        console.log("here");
        
        return res.json({message:"Success !",user:fullUser});
    }catch(error){
        return res.status(404).json({message:" user not found!",error});
    }
}