import { sequelize } from "../../../DB/Connection.js";
import { courseModel } from "../../../DB/models/CourseModel/course.model.js";
import { enrollmentModel } from "../../../DB/models/Enrollment/Enrollments.js";
import { userModel } from "../../../DB/models/UserModel/user.model.js";




export const getMyProfile=async (req,res)=>{
    console.log(req.body.user);
    try{
        const {user}=req.body;
        const fullUser=await userModel.findByPk(user.id,{
            
        });
        if(fullUser){
            return res.status(200).json({message:"Success",user:fullUser});
        }
        return res.status(404).json({message:" Couldn't find user"});
        console.log(fullUser);
    }catch(error){
        return res.status(404).json({message:" user not found!",error});
    }
    return res.status(200).json({message:"Ok"});
}



export const getFullProfile=async (req,res)=>{
    try{
        const {id}=req.body;
        console.log(id);
        const fullUser=await userModel.findByPk(id,{
            attributes:['bio','links','files','specialization','username','profilePic'],
            include:[{
                model:enrollmentModel,
                as:"enrollments",
                        attributes:['progress'],
                include:[
                    {
                        model:courseModel,
                        as:"course",
                        attributes:['title','duration','thumbnail'],

                    }
                ]
            }]
        })
        console.log("here");
        
        return res.json({message:"Success !",user:fullUser});
    }catch(error){
        return res.status(404).json({message:" user not found!",error});
    }
}






export const addLink = async (req, res) => {
    try {
        const { user, link } = req.body;

        if (!link || typeof link.url !== "string" || typeof link.type !== "string") {
            return res.status(400).json({ message: "Invalid link format. Expected { url, type }" });
        }

        const userFromDataBase = await userModel.findByPk(user.id);

        if (!userFromDataBase) {
            return res.status(404).json({ message: "User not found" });
        }

        if (!userFromDataBase.links || !Array.isArray(userFromDataBase.links.urls)) {
            userFromDataBase.links = { urls: [] };
        }

        userFromDataBase.links.urls.push(link);
        userFromDataBase.changed('links', true); 
        await userFromDataBase.save();
        

        return res.status(200).json({
            message: "Success!",
            links: userFromDataBase.links,
        });
    } catch (error) {
        res.status(500).json({
            message: "Server Error",
            error: error.message || error,
        });
    }
};



export const editBio=async(req,res)=>{
    try{
        const { user, bio } = req.body;
        const userFromDataBase = await userModel.findByPk(user.id);
        userFromDataBase.bio = bio;
        await userFromDataBase.save();
        res.status(200).json({message:'success',bio});
    } catch (error) {
        res.status(500).json({
            message: "Server Error",
            error: error.message || error,
        });
    }
}

export const editSpecialization=async(req,res)=>{
    try{
        const { user, specialization } = req.body;
        const userFromDataBase = await userModel.findByPk(user.id);
        userFromDataBase.specialization = specialization;
        await userFromDataBase.save();
        res.status(200).json({message:'success',specialization});
    } catch (error) {
        res.status(500).json({
            message: "Server Error",
            error: error.message || error,
        });
    }
}

export const getTopStudents = async (req, res) => {
    try {
        const topStudents = await enrollmentModel.findAll({
            attributes: [
                'studentId',
                [sequelize.fn('SUM', sequelize.col('points')), 'totalPoints']
            ],
            group: ['studentId', 'student.id', 'student.username', 'student.profilePic', 'student.bio'],
            order: [[sequelize.literal('totalPoints'), 'DESC']],
            limit: 5,
            include: {
                model: userModel,
                as: 'student',
                attributes: ['id', 'username', 'profilePic', 'bio'],
                where: { role: 'user' }
            }
        });

        if (!topStudents.length) {
            return res.status(200).json({ 
                message: "No students found", 
                students: [] 
            });
        }

        return res.status(200).json({
            message: "Successfully retrieved top students",
            students: topStudents
        });
    } catch (error) {
        console.error('Error in getTopStudents:', error);
        return res.status(500).json({ 
            message: "Error retrieving top students",
            error: error.message 
        });
    }
}

export const getTeachers = async (req, res) => {
    try {
        const teachers = await userModel.findAll({
            attributes: [
                'id', 
                'username', 
                'profilePic', 
                'bio', 
                'specialization', 
                'links',
                'email'
            ],
            where: { role: 'tech' }
        });

        if (!teachers.length) {
            return res.status(200).json({ 
                message: "No teachers found", 
                teachers: [] 
            });
        }

        return res.status(200).json({
            message: "Successfully retrieved teachers",
            teachers: teachers
        });
    } catch (error) {
        console.error('Error in getTeachers:', error);
        return res.status(500).json({ 
            message: "Error retrieving teachers",
            error: error.message 
        });
    }
}

export const getTeacherById = async (req, res) => {
    try {
        const { id } = req.params;
        
        // Find the teacher by ID with basic information
        const teacher = await userModel.findOne({
            where: {
                id: id,
                role: 'tech'
            },
            attributes: [
                'id', 
                'username', 
                'email',
                'profilePic', 
                'bio', 
                'specialization', 
                'links',
                'files',
                'resume'
            ]
        });

        if (!teacher) {
            return res.status(404).json({ 
                message: "Teacher not found" 
            });
        }
        
        // Find courses taught by this teacher
        const courses = await courseModel.findAll({
            where: { teacherId: id },
            attributes: ['id', 'title', 'thumbnail', 'description', 'rating', 'duration', 'enrollmentNumber', 'price']
        });
        
        // Create a response object with teacher data and courses
        const teacherData = teacher.toJSON();
        teacherData.courses = courses;

        return res.status(200).json({
            message: "Successfully retrieved teacher profile",
            teacher: teacherData
        });
    } catch (error) {
        console.error('Error in getTeacherById:', error);
        return res.status(500).json({ 
            message: "Error retrieving teacher profile",
            error: error.message 
        });
    }
}
