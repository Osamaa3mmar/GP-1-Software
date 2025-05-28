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