import { organizationModel } from "../../../DB/models/organaization/organaization.js";
import { userModel } from "../../../DB/models/UserModel/user.model.js";



export const getByOrganizationID=async (req,res)=>{
    try{
        const {id}=req.params;
        const org=await organizationModel.findByPk(id,
            {
                attributes:['tags','description','name','id'],
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
