import { applayModal } from "../../../DB/models/Applyes/Applayes.modal.js";
import { userModel } from "../../../DB/models/UserModel/user.model.js";
import { makeNotification } from "../Notification/Notification.controller.js";


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
        resume.status="Accepted";
        await resume.save();
        await applayModal.destroy({
            where: {
                userId: resume.userId,
                id: { [applayModal.sequelize.Op.ne]: resume.id }
            }
        });

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
        const {userId,orgId}=req.body;
         const alreadyAccepted = await applayModal.findOne({
            where: { userId, status: "Accepted" }
        });
        if (alreadyAccepted) {
            return res.status(400).json({ message: "You are already accepted in an academy and cannot apply to another." });
        }
        const applay=await applayModal.findOne({where:{userId,orgId}});
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
        makeNotification("Application","applay",message,actionUrl,orgId,false,userId);
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
        // Delete all accepted applications for this user
        const deleted = await applayModal.destroy({
            where: {
                userId,
                status: "Accepted"
            }
        });
        if (deleted === 0) {
            return res.status(404).json({ message: "No accepted instructor found to kick." });
        }
        return res.status(200).json({ message: "Instructor kicked successfully." });
    } catch (error) {
        return res.status(500).json({ message: "server error", error });
    }
}