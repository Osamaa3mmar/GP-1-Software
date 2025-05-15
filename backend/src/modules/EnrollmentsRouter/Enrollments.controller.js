import { Op, where } from "sequelize";
import { courseModel } from "../../../DB/models/CourseModel/course.model.js";
import { enrollmentModel } from "../../../DB/models/Enrollment/Enrollments.js";
import { organizationModel } from "../../../DB/models/organaization/organaization.js";
import { userModel } from "../../../DB/models/UserModel/user.model.js";
import { notificationModel } from "../../../DB/models/NotificationsModel/Notification.js";
import { makeNotification } from "../Notification/Notification.controller.js";
export const enroll=async(req,res)=>{
    try{
    const {courseId,userId}=req.body;
    const isCourse=await courseModel.findByPk(courseId);
    
    if(!isCourse||isCourse.completionStatus=="notStarted"){
        return res.status(404).json({message:"Course not found !"});
    }
    const isUser=await userModel.findByPk(userId);
     if(!isUser){
        return res.status(404).json({message:"User not found !"});
    }
    const enrolled=await enrollmentModel.findOne({where:{studentId:userId,courseId}});
    if(!enrolled){
    const enroll =await enrollmentModel.create({
        studentId:userId,
        courseId,
        progress:0
    })
    
    if(enroll){
        let message=`${isUser.username} Enroll in ${isCourse.title} Course .`;
        let actionUrl="/dashboard/notifications";
        makeNotification("Enroll","user",message,actionUrl,isCourse.orgId);
        message=`Enrolled in ${isCourse.title} Course Success.`;
        actionUrl="/main/course/"+courseId;
        makeNotification("Enroll","user",message,actionUrl,null,false,isUser.id);





        return res.status(200).json({message:"Enrolled to "+isCourse.title+" successfully !"});
    }
    }else{
        return res.status(400).json({message:"User already enrolled in this course!"});
    }
}catch(error){
    return res.status(500).json({message:"Server Error",error});
}
}


// const org=await organizationModel.findOne( {where: { ownerId: req.body.user.id },
//     include:{
//         model:courseModel,
//         as:"courses"
//     }}
//     );



export const allInCourse=async (req,res)=>{
    try{
        const {id}=req.params;
        const users =await enrollmentModel.findAll({where:{courseId:id},
            attributes:["createdAt",'points'],
            include:{
                model:userModel,
                as:"student",
                attributes:['email','id',"username","profilePic"]
            }},
            
        )
        return res.status(200).json({message:"Success",users});
    }catch(error){
        return res.status(500).json({message:"Server Error",error});

    }
}

const getEnrollUsersFromEveryCourseInOrg=async(orgId)=>{
    return await organizationModel.findByPk(orgId,{
        attributes:["id"],
        include:{
            model:courseModel,
            as:"courses",
            attributes:["thumbnail","id","title"],
            where:{completionStatus:{[Op.ne]:"notStarted"}},
            include:{
                model:enrollmentModel,
                as:"enrollments",
                attributes:['id'],
                include:{
                    model:userModel,
                    as:"student",
                    attributes:['id',"profilePic","username"]
                }
            }
        }
    });
}

export const allInOrg= async(req,res)=>{
    try{
        const {orgId}=req.params;
        const org=await getEnrollUsersFromEveryCourseInOrg(orgId);
        // console.log(org);
        // if(!org){
        //     return res.status(400).json({message:"No Courses Start Yet !",type:"empty"});
        // }
        // const {courses}=org;
    return res.status(200).json({message:org?"success":"No Course Start Yet !",courses:org?.courses});
    }catch(error){
        return res.status(500).json({message:"Server Error",error})
    }
}