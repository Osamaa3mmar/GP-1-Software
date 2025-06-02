import { courseModel } from "../../../DB/models/CourseModel/course.model.js";
import { organizationModel } from "../../../DB/models/organaization/organaization.js";
import { userModel } from "../../../DB/models/UserModel/user.model.js";
import { courseModel } from "../../../DB/models/CourseModel/course.model.js";
import cloudinary from "../../utils/Claoudinary.js";
import { makeNotification } from "../Notification/Notification.controller.js";
import { sequelize } from "../../../DB/Connection.js";
import { Op } from "sequelize";



export const getByOrganizationID=async (req,res)=>{
    try{
        const {id}=req.params;
        const org=await organizationModel.findByPk(id,
            {
                attributes:['tags','description','name','id','profile','backGroundImage'],
                include:[{
                    model:userModel,
                    as:"owner",
                    attributes:['id','username','profilePic','bio']
                }
                ]
            }
        );
        if(org){
            return res.status(200).json({message: "Organization found",org});

        }
        return res.status(404).json({message: "Organization not found"});
    }
    catch(error){
        return res.status(500).json({message:"server error",error});
    }
   
}

export const getinstructors=async(req,res)=>{
    const {id}=req.params;
    
    return res.status(200).json({message:req.body});
}

export const getOrgCategories = async (req, res) => {
    try {
        const { id } = req.params;
        
        // Find all courses for this organization
        const courses = await courseModel.findAll({
            where: { orgId: id },
            attributes: ['tags']
        });
        
        if (!courses || courses.length === 0) {
            return res.status(200).json({ 
                message: "No courses found for this organization", 
                categories: [] 
            });
        }
        
        // Extract unique categories from all courses' tags
        const allCategories = new Set();
        
        courses.forEach(course => {
            if (course.tags && typeof course.tags === 'object') {
                // Extract category from tags if it exists
                const categoryArray = course.tags.category || [];
                if (Array.isArray(categoryArray)) {
                    categoryArray.forEach(category => {
                        if (category) allCategories.add(category);
                    });
                }
            }
        });
        
        return res.status(200).json({
            message: "Categories retrieved successfully",
            categories: Array.from(allCategories)
        });
    } catch (error) {
        console.error("Error getting organization categories:", error);
        return res.status(500).json({ message: "Server error", error });
    }
}


export const editOrgName=async(req,res)=>{
    try{
        const {id}=req.params;
        console.log(req.body);
        const {user,name}=req.body;
        if(id!=user.orgId){
            console.log(id);
            console.log(user.orgId);
            return res.status(301).json({message:"you are not allowed !"});
        }
        const org=await organizationModel.findByPk(id);
        org.name=name;
        await org.save();
        let message=user.username+` Edit Organization Name !`;
        let actionUrl='/';
        makeNotification("Edit","edit",message,actionUrl,id);
        return res.status(200).json({message:"Name Change To "+name+" Successfully"})
    } catch(error){
        return res.status(500).json({message:"server error",error});
    }
}


export const editOrgDescription=async(req,res)=>{
    try{
        const {id}=req.params;
        console.log(req.body);
        const {user,description}=req.body;
        if(id!=user.orgId){
            
            return res.status(301).json({message:"you are not allowed !"});
        }
        const org=await organizationModel.findByPk(id);
        org.description=description;
        await org.save();
         let message=user.username+` Edit Organization Description !`;
        let actionUrl='/';
        makeNotification("Edit","edit",message,actionUrl,id);

        return res.status(200).json({message:"Description Changed !"});
    } catch(error){
        return res.status(500).json({message:"server error",error});
    }
}


export const editOrgImages=async(req,res)=>{
    try{
        const {id}=req.params;
        console.log(req.body);
        const {user,description}=req.body;
        if(id!=user.orgId){
            
            return res.status(301).json({message:"you are not allowed !"});
        }
        let profile=null;
        let background=null;
        const org=await organizationModel.findByPk(id);
        if(req.files){
            console.log("92")
            if(req.files.profile){
            console.log("94")
                profile=await cloudinary.uploader.upload(req.files.profile[0].path);
                org.profile = profile.secure_url; // fixed
                profile=profile.secure_url;
            }
            if(req.files.background){
                console.log("100");
                background=await cloudinary.uploader.upload(req.files.background[0].path);
                org.backGroundImage = background.secure_url; // fixed
                background=background.secure_url;
            }
        }
        
        await org.save();
        let message=user.username+` Edit Organization ${background?"Background ":''} ${profile?background?"and":'':''} ${profile?"Profile":''}!`;
        let actionUrl='/';
        makeNotification("Edit","edit",message,actionUrl,id);

        return res.status(200).json({message:"Images Changed !",images:{profile,background}});
    } catch(error){
        return res.status(500).json({message:"server error",error});
    }
}

export const getTopOrganizations = async (req, res) => {
    try {
        const orgs = await organizationModel.findAll({            attributes: [
                'id',
                'name',
                'profile',
                'description',
                'isVerified',
                [sequelize.fn('COUNT', sequelize.col('courses.id')), 'courseCount'],
                [sequelize.fn('COALESCE', sequelize.fn('AVG', sequelize.col('courses.rating')), 0), 'avgRating']
            ],
            subQuery: false,            include: [{
                model: courseModel,
                as: 'courses',
                attributes: [],
                required: false,
                where: {
                    completionStatus: {
                        [Op.in]: ['inProgress', 'completed']
                    }
                }
            }],            group: [
                'id',
                'name',
                'profile',
                'description',
                'isVerified'
            ],
            having: sequelize.literal('COUNT(courses.id) > 0'),
            order: [
                [sequelize.fn('AVG', sequelize.col('courses.rating')), 'DESC'],
                [sequelize.fn('COUNT', sequelize.col('courses.id')), 'DESC']
            ],
            limit: 5
        });

        if (!orgs.length) {
            return res.status(200).json({
                message: "No organizations found with active courses",
                orgs: []
            });
        }

        // Format the response data
        const formattedOrgs = orgs.map(org => ({
            ...org.toJSON(),
            avgRating: Number(org.getDataValue('avgRating') || 0).toFixed(1),
            courseCount: Number(org.getDataValue('courseCount') || 0)
        }));

        return res.status(200).json({
            message: "Successfully retrieved top organizations",
            orgs: formattedOrgs
        });
    } catch (error) {
        console.error('Error in getTopOrganizations:', error);
        return res.status(500).json({
            message: "Error retrieving top organizations",
            error: error.message
        });
    }
};

export const getOrganizations=async(req,res)=>{
    try {
        const organizations = await organizationModel.findAll({
            attributes: [
                'id', 
                'name', 
                'description', 
                'profile', 
                'backGroundImage',
                'location',
                'website',
                'contactEmail',
                'isVerified',
                'status',
                'tags'
            ],
            include: [{
                model: userModel,
                as: "owner",
                attributes: ['id', 'username', 'profilePic']
            }]
        });

        if (!organizations.length) {
            return res.status(200).json({ 
                message: "No organizations found", 
                organizations: [] 
            });
        }

        return res.status(200).json({
            message: "Successfully retrieved organizations",
            organizations: organizations
        });
    } catch (error) {
        console.error('Error in getOrganizations:', error);
        return res.status(500).json({ 
            message: "Error retrieving organizations",
            error: error.message 
        });
    }
}