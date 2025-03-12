export const validation=(schema)=>{

    return (req,res,next)=>{
        
        const result=schema.validate(req.body,{abortEarly:false});
        if(result.error){
            return res.status(400).json({message:"validation error",error:result.error})
        }
        else{
            return next();
        }
    }
}