import jwt from "jsonwebtoken";

export const auth=()=>{




    return (req,res,next)=>{
        try{
            const {token}=req.headers;
            if(!token){
                return res.status(400).json({message:"No Token Provided !"});
            }
            const decoded=jwt.verify(token,"GP1");
            if(decoded){
                req.body.user=decoded;
                next();
            }
        }catch(error){
            return res.status(400).json({message:"Invalid credential Token !",error})
        }
    }
}