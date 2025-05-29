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

export const getUserEnrolledCourses=async(req,res)=>{
    try {
        const userId = req.body.user.id;
        
        // Find all enrollments for the current user where progress is less than 100%
        // This indicates courses they are still continuing to learn
        const enrolledCourses = await enrollmentModel.findAll({
            where: { 
                studentId: userId,
                progress: { [Op.lt]: 100 } // Only courses not yet completed
            },
            attributes: ['id', 'progress', 'points', 'createdAt'],
            include: {
                model: courseModel,
                as: "course",
                attributes: ['id', 'title', 'thumbnail', 'description', 'price', 'rating', 'duration', 'learningOutcomes'],
                include: [
                    {
                        model: userModel,
                        as: 'teacher',
                        attributes: ['id', 'username', 'profilePic', 'specialization']
                    },
                    {
                        model: organizationModel,
                        as: 'organization',
                        attributes: ['id', 'name', 'profile']
                    }
                ]
            },
            order: [['updatedAt', 'DESC']] // Show most recently updated courses first
        });
        
        if (!enrolledCourses || enrolledCourses.length === 0) {
            return res.status(200).json({ message: "You don't have any courses in progress", courses: [] });
        }
        
        return res.status(200).json({ 
            message: "Successfully retrieved courses in progress", 
            courses: enrolledCourses 
        });
    } catch (error) {
        return res.status(500).json({ message: "Server Error", error });
    }
}

/**
 * Get the count of in-progress courses for the current user
 */
export const getInProgressCoursesCount = async (req, res) => {
    try {
        const userId = req.body.user.id;
        
        // Count enrollments where progress is less than 100%
        const count = await enrollmentModel.count({
            where: { 
                studentId: userId,
                progress: { [Op.lt]: 100 } // Courses not yet completed
            }
        });
        
        return res.status(200).json({ 
            message: "Successfully retrieved in-progress courses count", 
            count 
        });
    } catch (error) {
        return res.status(500).json({ message: "Server Error", error });
    }
}

/**
 * Get the count of completed courses for the current user
 */
export const getCompletedCoursesCount = async (req, res) => {
    try {
        const userId = req.body.user.id;
        
        // Count enrollments where progress is exactly 100%
        const count = await enrollmentModel.count({
            where: { 
                studentId: userId,
                progress: 100 // Completed courses
            }
        });
        
        return res.status(200).json({ 
            message: "Successfully retrieved completed courses count", 
            count 
        });
    } catch (error) {
        return res.status(500).json({ message: "Server Error", error });
    }
}

/**
 * Get the total points earned by the current user
 */
export const getUserTotalPoints = async (req, res) => {
    try {
        const userId = req.body.user.id;
        
        // Sum all points from user's enrollments
        const result = await enrollmentModel.sum('points', {
            where: { 
                studentId: userId
            }
        });
        
        // Handle case where user has no points yet
        const totalPoints = result || 0;
        
        // Determine rank based on points
        let rank = "Beginner";
        if (totalPoints >= 1000) {
            rank = "Diamond Scholar";
        } else if (totalPoints >= 750) {
            rank = "Platinum Scholar";
        } else if (totalPoints >= 500) {
            rank = "Gold Scholar";
        } else if (totalPoints >= 250) {
            rank = "Silver Scholar";
        } else if (totalPoints >= 100) {
            rank = "Bronze Scholar";
        }
        
        return res.status(200).json({ 
            message: "Successfully retrieved user's total points", 
            totalPoints,
            rank
        });
    } catch (error) {
        return res.status(500).json({ message: "Server Error", error });
    }
}

/**
 * Calculate and return estimated learning hours for the current user
 */
export const getUserLearningHours = async (req, res) => {
    try {
        const userId = req.body.user.id;
        const currentDate = new Date();
        const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
        
        // Get all enrolled courses for the user with their progress
        const enrollments = await enrollmentModel.findAll({
            where: { 
                studentId: userId
            },
            include: {
                model: courseModel,
                as: "course",
                attributes: ['duration']
            }
        });
        
        // Calculate total learning hours based on course duration and progress
        let totalHours = 0;
        let thisMonthHours = 0;
        
        for (const enrollment of enrollments) {
            // Each course duration is in weeks
            // We'll estimate that a typical course week requires 5 hours of study
            if (enrollment.course && enrollment.course.duration) {
                const courseHoursTotal = enrollment.course.duration * 5; // 5 hours per week
                const userCompletedHours = (courseHoursTotal * enrollment.progress) / 100;
                
                totalHours += userCompletedHours;
                
                // Check if the enrollment was updated this month to estimate this month's hours
                if (enrollment.updatedAt >= firstDayOfMonth) {
                    // Calculate this month's progress
                    // For simplicity, we'll assume an even distribution of progress over time
                    // In a real application, you might track actual session times
                    thisMonthHours += userCompletedHours / 3; // Rough estimate: 1/3 of total progress made this month
                }
            }
        }
        
        // Round to nearest whole number
        totalHours = Math.round(totalHours);
        thisMonthHours = Math.round(thisMonthHours);
        
        return res.status(200).json({ 
            message: "Successfully retrieved user's learning hours", 
            totalHours,
            thisMonthHours
        });
    } catch (error) {
        return res.status(500).json({ message: "Server Error", error });
    }
}