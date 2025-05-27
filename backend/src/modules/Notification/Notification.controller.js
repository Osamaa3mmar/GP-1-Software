import { where } from "sequelize";
import { notificationModel } from "../../../DB/models/NotificationsModel/Notification.js";



export const getUserNotifications=async(req,res)=>{
    try{
        const {id}=req.params;
         const notifications=await notificationModel.findAll({
            where:{userId:id},
            order: [['createdAt', 'DESC']],
        })
        return res.status(200).json({message:"nice!",notifications});
    }catch(error){
        return res.status(500).json({message:"Server Error",error});
    }
}


export const getOrgNotifications=async(req,res)=>{
    try{
        const {orgId}=req.params;
        const userRole = req.query.role;
        const userId = req.query.userId;
        
        // Build the where clause based on user role
        const whereClause = {
            organizationId: orgId
        };
        
        // If the user is a teacher, only show notifications that are relevant to them
        // This prevents teachers from seeing all company notifications
        if (userRole === 'teacher') {
            // Only show notifications that are either:
            // 1. Marked specifically for this teacher (using userId)
            // 2. Marked as public for all organization members (using a type field)
            whereClause['$or'] = [
                { userId: userId },
                { type: 'public' }  // Notifications marked as public for all org members
            ];
        }
        
        const notifications = await notificationModel.findAll({
            where: whereClause,
            order: [['createdAt', 'DESC']],
        });
        
        return res.status(200).json({message:"nice!",notifications});
    }catch(error){
        console.error("Error in getOrgNotifications:", error);
        return res.status(500).json({message:"Server Error",error});
    }
}





export const makeNotification=async(type,icon,message,actionUrl,orgId,isRead=false,userId)=>{
    const Notification=await notificationModel.create({
        type,
        icon,
        message,
        actionUrl,
        isRead,
        organizationId:orgId,
        userId
    })

    return !!Notification;

}


export const setReadNotification=async(req,res)=>{
    try{
        const {id}=req.params;
        const notification=await notificationModel.findByPk(id);
        notification.isRead=true;
        await notification.save();
        return res.status(200).json({message:"Marked as read !",id});

    }catch(error){
        return res.status(500).json({message:"Server Error",error});
    }
}


export const setReadNotificationAll = async (req, res) => {
    try {
        const { orgId, userId } = req.body;

        // Validate input
        if (!orgId && !userId) {
            return res.status(400).json({ message: "orgId or userId is required." });
        }

        // Build where clause for filtering unread notifications
        const whereClause = {
            isRead: false, // only unread
        };
        if (orgId) whereClause.organizationId = orgId;
        if (userId) whereClause.userId = userId;

        // Fetch unread notifications
        const notifications = await notificationModel.findAll({ where: whereClause });

        if (notifications.length === 0) {
            return res.status(404).json({ message: "No unread notifications to mark as read." });
        }

        // Mark each notification as read and save
        for (const noti of notifications) {
            noti.isRead = true;
            await noti.save();
        }

        return res.status(200).json({
            message: "All unread notifications marked as read!",
            updatedCount: notifications.length
        });

    } catch (error) {
        console.error("Error in setReadNotificationAll:", error);
        return res.status(500).json({ message: "Server Error", error });
    }
};
