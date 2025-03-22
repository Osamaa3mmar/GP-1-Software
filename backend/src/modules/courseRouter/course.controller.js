import { courseModel } from "../../../DB/models/CourseModel/course.model.js";
import cloudinary from "../../utils/Claoudinary.js";


const calcduration=(start,end)=>{
    const startDate=new Date(start);
    console.log(startDate);
    const endDate=new Date(end);
    console.log(endDate);
    const duration=endDate-startDate;
    console.log(duration)
    let days = duration / (1000 * 60 * 60 * 24);
    let weeks=Math.floor(days/7);
  
    return weeks;
}

export const createCourse=async (req,res)=>{
    try{
        const {user}=req.body;
        delete req.body.user;
        if(user.role=='owner'){
            const newCourse=req.body;
            newCourse.tags=JSON.parse(newCourse.tags)
            newCourse.certification=newCourse.certification==="true"?true:false;
            newCourse.duration=calcduration(newCourse.startDate,newCourse.endDate);
            let background="def.png";
            let thumbnail="def.png";
           
             if(req.files){
                if(req.files.thumbnail){
                    thumbnail=await cloudinary.uploader.upload(req.files.thumbnail[0].path);
                    thumbnail=thumbnail.secure_url;
                    console.log(thumbnail)
                }
                if(req.files.background){
                    
                    background=await cloudinary.uploader.upload(req.files.background[0].path);
                    background=background.secure_url;
                    console.log(background);
                }
              
             }
            newCourse.backImage=background;
            newCourse.thumbnail=thumbnail;
           const course =await courseModel.create(newCourse);
            return res.status(200).json({message:newCourse.title+" Course created successfully!"});
        }
        else{
            return res.status(403).json({message:"You are not authorized to create courses"});
        }
    }
    catch(error){
        return res.status(500).json({message:"serverError",error});
    }
}