import { Model, Op, where } from "sequelize";
import { courseModel } from "../../../DB/models/CourseModel/course.model.js";
import { organizationModel } from "../../../DB/models/organaization/organaization.js";
import cloudinary from "../../utils/Claoudinary.js";
import { differenceInWeeks } from 'date-fns';
import { userModel } from "../../../DB/models/UserModel/user.model.js";
import { makeNotification } from "../Notification/Notification.controller.js";


export const createCourse=async (req,res)=>{
    try{
        const {user}=req.body;
        delete req.body.user;
        if(user.role=='owner'){
          const { isGenerated, ...newCourse } = req.body;
            newCourse.tags=newCourse.tags?JSON.parse(newCourse.tags):{};
            newCourse.certification=newCourse.certification==="true"?true:false;
            newCourse.duration = differenceInWeeks(new Date(newCourse.endDate), new Date(newCourse.startDate));
            let background="https://res.cloudinary.com/dta649b70/image/upload/v1744806300/hbxtz8t7e8vjrjydaoa2.jpg";
            let thumbnail="https://res.cloudinary.com/dta649b70/image/upload/v1744805803/yqjtliviomzzv8gvaefp.png";
             if(req.files){
                if(req.files.thumbnail){
                    thumbnail=await cloudinary.uploader.upload(req.files.thumbnail[0].path);
                    newCourse.thumbnail=thumbnail.secure_url;
                }else{
                  if(!isGenerated||isGenerated=='false'){
                  thumbnail=await cloudinary.uploader.upload(thumbnail);
                    newCourse.thumbnail=thumbnail.secure_url;
                  }
                }
                if(req.files.background){
                    background=await cloudinary.uploader.upload(req.files.background[0].path);
                    newCourse.backImage=background.secure_url;
                }
                else{
                  background=await cloudinary.uploader.upload(background);
                    newCourse.backImage=background.secure_url;
                }
            }
            const org=await organizationModel.findOne({where:{ownerId:user.id},attributes:['id']});
            newCourse.orgId=org.id;
           const createdCourse =await courseModel.create(newCourse);
           if(createdCourse){
            let message=`${createdCourse.title} Course Created !`;
            let actionUrl='/dashboard/courses/'+createdCourse.id;
                makeNotification("Add","add",message,actionUrl,org.id);
            return res.status(200).json({message:createdCourse.title+" Course created successfully!"});
           }
        else
        return res.status(400).json({message:"Course not created !"});

        }
        else{
            return res.status(403).json({message:"You are not authorized to create courses"});
        }
    }
    catch(error){
        return res.status(500).json({message:"serverError",error});
    }
}


export const getAdminCourses = async (req, res) => {
  try {
    if (req.body.user.role == "owner") {
      const org = await organizationModel.findOne({
        where: { ownerId: req.body.user.id },
        attributes: ["ownerId"],
      });
      if (req.body.user.id == org.ownerId) {
        const org = await organizationModel.findOne({
          where: { ownerId: req.body.user.id },
          attributes: [],
          include: [
            {
              model: courseModel,
              as: "courses",
              attributes: [
                "id",
                "title",
                "price",
                "completionStatus",
                "thumbnail",
                "startDate",
                "endDate",
                "backImage"
              ],
              include: [
        {
          model: userModel,
          as: "teacher",
          attributes: ["id", "username", "email", "profilePic"],
        },
      ],
            },
          ],
        });
        return res
          .status(200)
          .json({ message: "success ", courses: org.courses });
      }
    }

    return res
      .status(403)
      .json({ message: "You are not authorized to view courses" });
  } catch (error) {
    return res.status(500).json({ message: "Server Error", error });
  }
};



export const courseToggleStatus = async (req, res) => {
  try {
    if (req.body.user.role == "owner") {
      const { id } = req.params;
      const course = await courseModel.findByPk(id);
      if (!course) {
        return res.status(404).json({ message: "Invalid Course ID" });
      }
      const { title } = course;
      course.completionStatus =
        course.completionStatus == "notStarted" ? "inProgress" : "notStarted";
      const status = course.completionStatus;
      course.save();
      return res
        .status(200)
        .json({ message: title + " course changed to " + status + " !" });
    } else {
      return res
        .status(400)
        .json({ message: "You are not authorized to toggle course status" });
    }
  } catch (error) {
    return res.status(500).json({ message: "Server Error", error });
  }
};


export const deleteCourse=async(req,res)=>{
    try{
        if(req.body.user.role=='owner'){
           const {id}=req.params;
           const course=await courseModel.findByPk(id);
           if(!course){
            return res.status(404).json({message:"Invalid Course ID"});
           }
           const {title}=course;
           const del=await course.destroy();
           if(del)
            return res.status(200).json({message:title+" Course Deleted successfully !"});
        }
        else{
            return res.status(400).json({message:"You are not authorized to delete course !"});
        }
    }catch(error){
        return res.status(500).json({message:"Server Error",error});
    }
}


export const getAllCourses = async (req, res) => {
    try {
        const courses = await courseModel.findAll({
            attributes: ["id", "title","thumbnail","tags","learningOutcomes","learningPath","duration","price","enrollmentNumber"],
            where: {
                completionStatus: {
                    [Op.ne]: "notStarted"
                }
            },
            include:[{model:userModel,as:'teacher',attributes: ['id','username','specialization']}]
        });

        return res.status(200).json({ message: "Courses retrieved successfully!", courses });
    } catch (error) {
        return res.status(500).json({ message: "Server Error", error });
    }
};


export const getDetailedCourseInfo=async(req,res)=>{
    try{
        const {id}=req.params;
        const course=await courseModel.findByPk(id);
        if(!course){
            return res.status(404).json({message:"Invalid Course ID"});
        }
        return res.status(200).json({message: "Course retrieved successfully",course});
    }catch(error){
        return res.status(500).json({ message: "Server Error", error });
    }
}



export const editAll=async(req,res)=>{
    try{
        const {id}=req.params;
        const {editedCourse,orgId}=req.body;
            let course=await courseModel.findByPk(id);
            if(!course){
                  return res.status(404).json({message:"Invalid Course ID"});
              }
                      let tags={
                  topics:editedCourse.topics,
            category:editedCourse.category 
                }
                delete editedCourse.topics;
                delete editedCourse.category;
                editedCourse.tags=tags;
                editedCourse.duration = differenceInWeeks(new Date(editedCourse.endDate), new Date(editedCourse.startDate));
                let message=`${course.title} Course Info Updated !`;
                course=await course.update(editedCourse);
                if(!course){
                  return res.status(400).json({message:"Course not updated !"});
                } 
                console.log("here");
                let actionUrl='/dashboard/courses/'+id;
                makeNotification("Edit","edit",message,actionUrl,orgId);
        return res.status(200).json({message: "Course retrieved successfully"});
    }catch(error){
        return res.status(500).json({ message: "Server Error", error });
    }
}


export const getallnotassigninorg=async (req,res)=>{
  try{
    const {id}=req.params;
    console.log(id); 
    const courses=await courseModel.findAll({
      where:{
        teacherId:null,
        orgId:id
      }
    })
    if(!courses){
      return res.status(200).json({message:"no Courses"})
    }
    return res.status(200).json({message:"success",courses });
  }catch(error){
   return res.status(500).json({ message: "Server Error", error });
  }
}