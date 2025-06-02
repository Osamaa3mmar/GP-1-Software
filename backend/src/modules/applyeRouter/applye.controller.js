import { Op } from "sequelize";
import { applayModal } from "../../../DB/models/Applyes/Applayes.modal.js";
import { courseModel } from "../../../DB/models/CourseModel/course.model.js";
import { userModel } from "../../../DB/models/UserModel/user.model.js";
import { makeNotification } from "../Notification/Notification.controller.js";
import { organizationModel } from "../../../DB/models/organaization/organaization.js";


export const getResumesOrgInfo = async (req, res) => {
    try {
        const { id } = req.params;
        const resumes = await applayModal.findAll({
            where: {
                orgId: id,
                status: 'Pending'
            },
            order: [['createdAt', 'DESC']],
        });
        res.status(200).json({ message: "success", resumes });
    } catch (error) {
        return res.status(500).json({ message: "server error", error });
    }
};
export const setResumeStatusAccepted=async(req,res)=>{
    try{
        const {id}=req.params;
        const resume=await applayModal.findByPk(id);
        if(!resume){
            return res.status(404).json({message:"not found"});
        }
        if(resume.status=="Accepted"){
            return res.status(400).json({message:"already accepted"});
        }
        if(resume.status=="Denied"){
            return res.status(400).json({message:"already denied"});
        }   

        resume.status="Accepted";
        await resume.save();
       await applayModal.destroy({
    where: {
        userId: resume.userId,
        id: { [Op.ne]: resume.id }
    }
});
    const org=await organizationModel.findByPk(resume.orgId);
    const user=await userModel.findByPk(resume.userId);
    let message1=`${user.username} Become a Teacher In This Academy`;
    let actionUrl1=`/dashboard/instructors`;
    let message2=`Your Application To ${org.name} Has Been Accepted.`;
    let actionUrl2=`/main/academy/profile/${org.id}`;
    makeNotification("Accept","accept",message1,actionUrl1,org.id,false,null);
    makeNotification("Accept","accept",message2,actionUrl2,null,false,user.id);
        return res.status(200).json({message:"success",resume});
    }catch(error){
        return res.status(500).json({message:"server error",error});
    }
}

export const setResumeStatusDenied=async(req,res)=>{
    try{
        const {id}=req.params;
        const resume=await applayModal.findByPk(id);
        if(!resume){
            return res.status(404).json({message:"not found"});
        }
        resume.status="Denied";
        await resume.save();
        return res.status(200).json({message:"success",resume});
    }catch(error){
        return res.status(500).json({message:"server error",error});
    }
}

export const makeApplay=async(req,res)=>{
    try{
        const {userId,orgId,user}=req.body;
        console.log(user)
        if(user.role=="user"){
            return res.status(403).json({message:"You are not authorized to apply for this academy."});
        }
         const alreadyAccepted = await applayModal.findOne({
            where: { userId, status: "Accepted" }
        });
        if (alreadyAccepted) {
            return res.status(400).json({ message: "You are already accepted in an academy and cannot apply to another." });
        }
        const applay=await applayModal.findOne({where:{userId,orgId,status:"Pending"}});
        if(applay){
            return res.status(400).json({message:"You already applied to this academy."});
        }
        const resume=await applayModal.create({
            userId,
            orgId,
            status:"Pending"
        });
        console.log(userId,orgId);
        if(!resume){
            return res.status(404).json({message:"not found"});
        }
        let message=`You have a new application to your academy.`;
        let actionUrl="/dashboard/instructors";
        makeNotification("Application","applay",message,actionUrl,orgId,false,null);
        let message2=`You have been applied to an academy.`;
        let actionUrl2="/main/academy/profile/"+orgId;
        makeNotification("Application","applay",message2,actionUrl2,null,false,userId);
        return res.status(200).json({message:"Applecation send successfully .",resume});

    }catch(error){
        return res.status(500).json({message:"server error",error});
    }
}


export const getInstractourInfo=async(req,res)=>{
    try{
        const {id}=req.params;
        const instructor=await userModel.findByPk(id,{
            attributes:["id","username","email","profilePic","specialization","files"],
        });
        if(!instructor){
            return res.status(404).json({message:"not found"});
        }
        return res.status(200).json({message:"success",instructor});
    }catch(error){
        return res.status(500).json({message:"server error",error});
    }
}



export const getAllAccepted=async(req,res)=>{
    try{
        const {id}=req.params;
        const accepted=await applayModal.findAll({
            where:{
                orgId:id,
                status:"Accepted"
            }
        });
        if(!accepted){
            return res.status(404).json({message:"not found"});
        }
        return res.status(200).json({message:"success",accepted});
    }catch(error){
        return res.status(500).json({message:"server error",error});
    }
}

export const getuser=async(req,res)=>{
    try{
        const {id}=req.params;
        const user=await userModel.findByPk(id,{
            attributes:["id","username","email","profilePic","specialization","files"],
            include:[
                {
                    model:courseModel,
                    as:"courses",
                    attributes:["id","title","price","completionStatus","thumbnail"],
                }
            ]
        });
        if(!user){
            return res.status(404).json({message:"not found"});
        }
        return res.status(200).json({message:"success",user});
    }catch(error){
        return res.status(500).json({message:"server error",error});
    }
}

export const kickInstructor = async (req, res) => {
  try {
    const { userId } = req.params;

    // Get user and their accepted application first
    const user = await userModel.findByPk(userId);
    const acceptedApply = await applayModal.findOne({
      where: {
        userId,
        status: "Accepted"
      }
    });

    if (!acceptedApply) {
      return res.status(404).json({ message: "No accepted instructor found to kick." });
    }

    // Delete the accepted application
    await acceptedApply.destroy();

    const org = await organizationModel.findByPk(acceptedApply.orgId);

    // Send notifications
    const orgMessage = `${user.username} was unemployeed from Academy`;
    const userMessage = `You have been unemployeed from ${org.name} Academy`;

    makeNotification("Kick", "kick", orgMessage, "", org.id, false, null);
    makeNotification("Kick", "kick", userMessage, "/main/classroom", null, false, user.id);

    return res.status(200).json({ message: "Instructor kicked successfully." });

  } catch (error) {
    return res.status(500).json({ message: "Server error", error });
  }
};




export const assignInstructor = async (req, res) => {
    try {
        const { userId, courseId ,user} = req.body;
        const course = await courseModel.findByPk(courseId);
        if (!course) {
            return res.status(404).json({ message: "Course not found" });
        }
        if(user.orgId !== course.orgId){
            return res.status(403).json({message:"You are not authorized to assign instructor to this course."});
        }
        const instructor = await userModel.findByPk(userId);
        if (!instructor) {
            return res.status(404).json({ message: "Instructor not found" });
        }
        course.teacherId = userId;
         let message=`${instructor.username} assign to be a teacher for ${course.title} course.`;
        let actionUrl=`/main/classroom/${course.id}`;
        makeNotification("Assign","assign",message,actionUrl,course.orgId,false,null);
         actionUrl=`/main/classroom/${course.id}`;
         message=`You Assigned To Be Teacher Fro ${course.title} Course`
        makeNotification("Unassign","unassign",message,actionUrl,null,false,userId);
        await course.save();
        return res.status(200).json({ message: "Instructor assigned successfully", course });
    } catch (error) {
        return res.status(500).json({ message: "server error", error });
    }
}








export const checkisinit=async(req,res)=>{
    try{
        const {user,orgId}=req.body;
        const isInIt=await applayModal.findOne({
            where:{
                orgId,
                userId:user.id,
                status:"Accepted"
            }
        })
        if(isInIt){
            return res.status(200).json({message:"success",isInIt:true});
        }
        return res.status(200).json({message:"success",isInIt:false});
    }catch(error){
        return res.status(500).json({message:"server error",error});
    }
}




export const unassignInstructor = async (req, res) => {
    try {
        const { userId, courseId } = req.body;
        const course = await courseModel.findByPk(courseId);
        if (!course) {
            return res.status(404).json({ message: "Course not found" });
        }
        if (course.teacherId !== userId) {
            return res.status(403).json({ message: "You are not authorized to unassign this instructor." });
        }
        const teacher=await userModel.findByPk(userId);
        course.teacherId = null;
        let message=`${teacher.username} unassigned from ${course.title} course.`;
        let actionUrl=`/main/classroom/${course.id}`;
        makeNotification("Unassign","unassign",message,actionUrl,course.orgId,false,null);
         actionUrl=`/main/classroom`;
         message=`You Removed As Teacher From ${course.title} Course`
        makeNotification("Unassign","unassign",message,actionUrl,null,false,userId);
        await course.save();
        return res.status(200).json({ message: "Instructor unassigned successfully", course });
    } catch (error) {
        return res.status(500).json({ message: "server error", error });
    }
}