import { sequelize } from "../../../DB/Connection.js";
import { courseModel } from "../../../DB/models/CourseModel/course.model.js";
import { enrollmentModel } from "../../../DB/models/Enrollment/Enrollments.js";
import { userModel } from "../../../DB/models/UserModel/user.model.js";
import cloudinary from "../../utils/Claoudinary.js";




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
            
            include:[{
                model:enrollmentModel,
                as:"enrollments",
                        attributes:['progress'],
                include:[
                    {
                        model:courseModel,
                        as:"course",
                        include:[{
                            model:userModel,
                            as:"teacher"
                        }]

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
        const { user, title, url, type } = req.body;

        console.log(title, url, type);

        const userFromDataBase = await userModel.findByPk(user.id);

        if (!userFromDataBase) {
            return res.status(404).json({ message: "User not found" });
        }

        // Ensure links is an array
        if (!Array.isArray(userFromDataBase.links)) {
            userFromDataBase.links = [];
        }

        // Append the new link
        userFromDataBase.links.push({
            title: title || "Untitled Link",
            url,
            type: type || "other"
        });

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
        console.log(specialization)
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
// Get user by ID for profile page
export const getUserById = async (req, res) => {
    try {
        const { id } = req.params;
        
        if (!id) {
            return res.status(400).json({ message: "User ID is required" });
        }
        
        // Use a simpler query first to test if we can find the user
        const user = await userModel.findByPk(id);
        
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        
        // Return basic user data without trying to include related models for now
        // This ensures we at least return something even if relations have issues
        return res.status(200).json({
            message: "User found",
            user: {
                id: user.id,
                username: user.username,
                email: user.email,
                profilePic: user.profilePic,
                role: user.role,
                bio: user.bio,
                specialization: user.specialization,
                // Add any other fields you need
                enrollments: [] // Empty array for now
            }
        });
    } catch (error) {
        console.error("Error getting user by ID:", error);
        return res.status(500).json({ 
            message: "Error fetching user data", 
            error: error.message || error 
        });
    }
}




export const editProfilePicture = async (req, res) => {
    try {
        const { user } = req.body;
        if (!req.files || !req.files.image || req.files.image.length === 0) {
            return res.status(400).json({ message: "Profile image is required" });
        }
        const profileImage = req.files.image[0];
        const userFromDataBase = await userModel.findByPk(user.id);
        if (!userFromDataBase) {
            return res.status(404).json({ message: "User not found" });
        }
        const profile = await cloudinary.uploader.upload(profileImage.path);
        userFromDataBase.profilePic = profile.secure_url; // Use the secure URL from cloudinary 
        await userFromDataBase.save();
        return res.status(200).json({
            message: "Profile picture updated successfully",
            profilePic: userFromDataBase.profilePic
        });


    }catch(error){
        return res.status(500).json({message:"server error",error});
    }
}




export const resume = async (req, res) => {
    // try {
        const { user } = req.body;
        console.log("osama338");
        if (!req.file) {
            return res.status(400).json({ message: "Resume file is required" });
        }
        const resumeFile = req.file;
        const userFromDataBase = await userModel.findByPk(user.id);
        if (!userFromDataBase) {
            return res.status(404).json({ message: "User not found" });
        }
        const uploadedResume = await cloudinary.uploader.upload(resumeFile.path, {
    resource_type: "auto",  
    type: "upload"          
});

console.log("Resume uploaded to:", uploadedResume.secure_url);

userFromDataBase.resume = uploadedResume.secure_url;
await userFromDataBase.save();


        await userFromDataBase.save();
        console.log("osama343");
        return res.status(200).json({
            message: "Resume uploaded successfully",
            resume: userFromDataBase.resume
        });
    // } catch (error) {
    //     return res.status(500).json({ message: "Server error", error });
    // }
}