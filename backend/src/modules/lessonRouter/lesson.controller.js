import { courseModel } from "../../../DB/models/CourseModel/course.model.js";
import { lessonModel } from "../../../DB/models/Lessons/Lesson.js";
import { makeNotification } from "../Notification/Notification.controller.js";



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
        if(course.teacherId==user.id||user.orgId==course.orgId){
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
        return res.status(500).json({message:"server error",error});
    }
}

export const addLesson = async (req, res) => {
    try {
        const { courseId, title, description, order } = req.body;
        const { user } = req.body;
        
        // Verify the course exists
        const course = await courseModel.findByPk(courseId);
        if (!course) {
            return res.status(404).json({ message: "Course not found" });
        }
        
        // Check if user has permission to add lessons to this course
        if (course.teacherId !== user.id && user.orgId !== course.orgId) {
            return res.status(403).json({ message: "You don't have permission to add lessons to this course" });
        }
        
        // Create the new lesson
        const newLesson = await lessonModel.create({
            courseId,
            title,
            description: description || "",
            order: order || 0
        });
        
        // Create notification for the academy (organization) when a new lesson is added
        if (course.orgId) {
            const message = `A new lesson "${title}" was added to course "${course.title}"`;
            const actionUrl = `/main/classrooms/${courseId}/lessons`;
            await makeNotification("add", "add", message, actionUrl, course.orgId, false, null);
        }
        
        return res.status(201).json({ message: "Lesson added successfully", lesson: newLesson });
    } catch (error) {
        console.error("Error adding lesson:", error);
        return res.status(500).json({ message: "Server error", error: error.message });
    }
}

export const updateLesson = async (req, res) => {
    try {
        const { id, title, description, order } = req.body;
        const { user } = req.body;
        
        // Find the lesson
        const lesson = await lessonModel.findByPk(id);
        if (!lesson) {
            return res.status(404).json({ message: "Lesson not found" });
        }
        
        // Get the course to check permissions
        const course = await courseModel.findByPk(lesson.courseId);
        if (!course) {
            return res.status(404).json({ message: "Course not found" });
        }
        
        // Check if user has permission to update this lesson
        if (course.teacherId !== user.id && user.orgId !== course.orgId) {
            return res.status(403).json({ message: "You don't have permission to update this lesson" });
        }
        
        // Update the lesson
        await lesson.update({
            title: title || lesson.title,
            description: description !== undefined ? description : lesson.description,
            order: order !== undefined ? order : lesson.order
        });
        
        // Create notification for the academy (organization) when a lesson is updated
        if (course.orgId) {
            const message = `Lesson "${lesson.title}" was updated in course "${course.title}"`;
            const actionUrl = `/main/classrooms/${course.id}/lessons`;
            await makeNotification("update", "edit", message, actionUrl, course.orgId, false, null);
        }
        
        return res.status(200).json({ message: "Lesson updated successfully", lesson });
    } catch (error) {
        console.error("Error updating lesson:", error);
        return res.status(500).json({ message: "Server error", error: error.message });
    }
}

export const deleteLesson = async (req, res) => {
    try {
        const { id } = req.body;
        const { user } = req.body;
        
        // Find the lesson
        const lesson = await lessonModel.findByPk(id);
        if (!lesson) {
            return res.status(404).json({ message: "Lesson not found" });
        }
        
        // Get the course to check permissions
        const course = await courseModel.findByPk(lesson.courseId);
        if (!course) {
            return res.status(404).json({ message: "Course not found" });
        }
        
        // Check if user has permission to delete this lesson
        if (course.teacherId !== user.id && user.orgId !== course.orgId) {
            return res.status(403).json({ message: "You don't have permission to delete this lesson" });
        }
        
        // Store lesson info before deletion for notification
        const lessonTitle = lesson.title;
        const courseId = lesson.courseId;
        
        // Delete the lesson
        await lesson.destroy();
        
        // Create notification for the academy (organization) when a lesson is deleted
        if (course.orgId) {
            const message = `Lesson "${lessonTitle}" was deleted from course "${course.title}"`;
            const actionUrl = `/main/classrooms/${courseId}/lessons`;
            await makeNotification("delete", "delete", message, actionUrl, course.orgId, false, null);
        }
        
        return res.status(200).json({ message: "Lesson deleted successfully" });
    } catch (error) {
        console.error("Error deleting lesson:", error);
        return res.status(500).json({ message: "Server error", error: error.message });
    }
}