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

const getEnrollUsersFromEveryCourseInOrg = async(orgId) => {
    return await organizationModel.findByPk(orgId, {
        attributes: ["id"],
        include: {
            model: courseModel,
            as: "courses",
            attributes: ["thumbnail", "id", "title", "startDate", "endDate"],
            where: { completionStatus: { [Op.ne]: "notStarted" } },
            include: {
                model: enrollmentModel,
                as: "enrollments",
                attributes: ['id', 'progress', 'createdAt', 'points'],
                include: {
                    model: userModel,
                    as: "student",
                    attributes: ['id', "profilePic", "username"]
                }
            }
        }
    });
}

export const allInOrg = async (req, res) => {
    try {
        const { orgId } = req.params;
        const org = await getEnrollUsersFromEveryCourseInOrg(orgId);
        // console.log(org);
        // if(!org){
        //     return res.status(400).json({message:"No Courses Start Yet !",type:"empty"});
        // }
        // const {courses}=org;
        return res.status(200).json({ message: org ? "success" : "No Course Start Yet !", courses: org?.courses });
    } catch (error) {
        return res.status(500).json({ message: "Server Error", error })
    }
}

/**
 * Get comprehensive statistics for students dashboard
 * @param {Object} req - Request object
 * @param {Object} res - Response object
 * @returns {Object} Statistics for the dashboard
 */
export const getStudentStatistics = async (req, res) => {
    try {
        const { orgId } = req.params;

        // Get all courses with enrollments
        const org = await getEnrollUsersFromEveryCourseInOrg(orgId);
        if (!org) {
            return res.status(200).json({
                message: "No courses started yet",
                stats: {
                    totalStudents: 0,
                    totalEnrollments: 0,
                    activeStudents: 0,
                    topPerformers: [],
                    enrollmentsByTwoWeeks: [],
                    courseDistribution: []
                }
            });
        }

        const courses = org.courses || [];

        // Calculate statistics
        let uniqueStudentIds = new Set();
        let totalEnrollments = 0;
        let activeStudents = 0;
        let topPerformers = [];
        let courseDistribution = [];
        let enrollmentDates = [];
        let coursesWithCompletionStatus = [];

        // Process course data
        courses.forEach(course => {
            // Calculate course completion status
            let totalProgress = 0;
            const enrollmentsCount = course.enrollments.length;

            // Course distribution
            courseDistribution.push({
                name: course.title,
                students: enrollmentsCount
            });

            totalEnrollments += enrollmentsCount;

            // Process enrollments
            course.enrollments.forEach(enrollment => {
                // Add to total progress
                totalProgress += enrollment.progress || 0;

                // Unique students
                uniqueStudentIds.add(enrollment.student.id);

                // Store enrollment date for stats
                enrollmentDates.push(new Date(enrollment.createdAt));

                // Check if active (enrolled in last 30 days)
                const enrollDate = new Date(enrollment.createdAt);
                const thirtyDaysAgo = new Date();
                thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
                if (enrollDate > thirtyDaysAgo) {
                    activeStudents++;
                }

                // Track top performers
                if (enrollment.points) {
                    topPerformers.push({
                        id: enrollment.student.id,
                        name: enrollment.student.username,
                        points: enrollment.points,
                        profilePic: enrollment.student.profilePic
                    });
                }
            });

            // Calculate average completion rate for the course
            const completionRate = enrollmentsCount > 0 ? Math.round(totalProgress / enrollmentsCount) : 0;

            // Add course with completion status
            coursesWithCompletionStatus.push({
                id: course.id,
                title: course.title,
                thumbnail: course.thumbnail,
                enrollmentsCount,
                completionRate,
                enrollments: course.enrollments
            });
        });

        // Sort and limit top performers
        topPerformers.sort((a, b) => b.points - a.points);
        topPerformers = topPerformers.slice(0, 5);

        // Generate enrollment data for the last 2 weeks (14 days)
        const enrollmentsByTwoWeeks = generateDailyData(enrollmentDates);

        return res.status(200).json({
            message: "Statistics retrieved successfully",
            stats: {
                totalStudents: uniqueStudentIds.size,
                totalEnrollments,
                activeStudents,
                topPerformers,
                enrollmentsByTwoWeeks,
                courseDistribution,
                courses: coursesWithCompletionStatus
            }
        });

    } catch (error) {
        console.error("Error getting student statistics:", error);
        return res.status(500).json({ message: "Server Error", error })
    }
}

/**
 * Generate daily enrollment data for the last 2 weeks (14 days)
 * @param {Array} enrollmentDates - Array of enrollment dates
 * @returns {Array} Daily enrollment data for the last 2 weeks
 */
const generateDailyData = (enrollmentDates) => {
    const days = [];
    const now = new Date();
    now.setHours(23, 59, 59, 999); // End of today

    // Generate last 14 days
    for (let i = 13; i >= 0; i--) {
        const day = new Date(now);
        day.setDate(now.getDate() - i);
        
        // Format date as "May 12" or similar
        const formattedDate = day.toLocaleDateString('en-US', { 
            month: 'short', 
            day: 'numeric' 
        });
        
        days.push({
            name: formattedDate,
            enrollments: 0,
            fullDate: new Date(day.setHours(0, 0, 0, 0)) // Start of the day
        });
    }

    // Count enrollments by day
    enrollmentDates.forEach(date => {
        // Only count enrollments from the last 14 days
        const twoWeeksAgo = new Date(now);
        twoWeeksAgo.setDate(now.getDate() - 14);
        twoWeeksAgo.setHours(0, 0, 0, 0); // Start of the day 14 days ago
        
        if (date >= twoWeeksAgo) {
            // Find the corresponding day
            const dayIndex = days.findIndex(day => {
                const nextDay = new Date(day.fullDate);
                nextDay.setDate(nextDay.getDate() + 1);
                return date >= day.fullDate && date < nextDay;
            });

            if (dayIndex !== -1) {
                days[dayIndex].enrollments++;
            }
        }
    });

    return days.map(day => ({
        name: day.name,
        enrollments: day.enrollments
    }));
}