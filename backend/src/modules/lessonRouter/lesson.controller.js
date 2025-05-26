import { courseModel } from "../../../DB/models/CourseModel/course.model.js";
import {lessonModel} from "../../../DB/models/Lessons/Lesson.js"



export const getallLessons=async(req,res)=>{
    try{
        const {courseId}=req.params;
        const {user}=req.body;
        let teacher=false;
        
        const course =await courseModel.findByPk(courseId,{
            include:[{
                model:lessonModel,
                as:"lessons"
            }]
        })
        
        if(!course){
            return res.status(404).json({message:"Course not found"})
        }
        if(course.teacherId==user.id){
            teacher=true;
        }
        return res.status(200).json({message:"success",lessons:course.lessons,control:teacher,title:course.title});













    
        // const lessons=await lessonModel.findAll({
        //     where:{
        //         courseId
        //     }
        // })
        // if(user.role=='owner' || user.id=="tech"){
        //     const course=await courseModel.findByPk(courseId)
        //     if(course.teacherId==user.id){
        //         teacher=true;
        //     }
        // }
        // return res.status(200).json({message:"success",lessons,control:teacher});

    }catch(error){
        return res.status(500).json({message:"Server Error",error})
    }
}