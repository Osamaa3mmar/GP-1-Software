import { Model, Op, where } from "sequelize";
import { courseModel } from "../../../DB/models/CourseModel/course.model.js";
import { organizationModel } from "../../../DB/models/organaization/organaization.js";
import cloudinary from "../../utils/Claoudinary.js";
import { differenceInWeeks } from 'date-fns';
import { userModel } from "../../../DB/models/UserModel/user.model.js";


export const createCourse=async (req,res)=>{
    try{
        const {user}=req.body;
        delete req.body.user;
        if(user.role=='owner'){
            const newCourse=req.body;
            newCourse.tags=newCourse.tags?JSON.parse(newCourse.tags):{};
            newCourse.certification=newCourse.certification==="true"?true:false;
            newCourse.duration = differenceInWeeks(new Date(newCourse.endDate), new Date(newCourse.startDate));
            let background="def.png";
            let thumbnail="def.png";
             if(req.files){
                if(req.files.thumbnail){
                    thumbnail=await cloudinary.uploader.upload(req.files.thumbnail[0].path);
                    newCourse.thumbnail=thumbnail.secure_url;
                }
                if(req.files.background){
                    background=await cloudinary.uploader.upload(req.files.background[0].path);
                    newCourse.backImage=background.secure_url;
                }
            }
            const org=await organizationModel.findOne({where:{ownerId:user.id},attributes:['id']});
            newCourse.orgId=org.id;
           const createdCourse =await courseModel.create(newCourse);
           if(createdCourse)
            return res.status(200).json({message:createdCourse.title+" Course created successfully!"});
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
        console.log(course)
        return res.status(200).json({message: "Course retrieved successfully",course});
    }catch(error){
        return res.status(500).json({ message: "Server Error", error });
    }
}