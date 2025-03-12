import multer from "multer";
import { nanoid } from "nanoid";

export const fileUpload = () => {
  const storage = multer.diskStorage({
    destination:(req,res,cb)=>{
        cb(null,'files');
    },
    filename:(req,file,cb)=>{
      
        const imageName=nanoid()+"_"+file.originalname;
        req.body.profile=imageName;
      cb(null,imageName);
    }
  });
  const upload = multer({ storage });
  return upload;
};
