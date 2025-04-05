import { Box, IconButton } from "@mui/material";
import ImageIcon from '@mui/icons-material/Image';
import { useState } from "react";

export default function ImageUploader({register,title,regName,value}) {
      const [image,setImage]=useState(null);
    
    const handleImage=(e)=>{
        const file=e.target.files[0];
        if(file){
            const currentImage=URL.createObjectURL(file);
            setImage(currentImage);
        }
      }
  return (
    <>
       <label htmlFor={regName}>
            <h3 style={{fontSize:"18px",marginBottom:"6px",fontWeight:"600"}}>
            {title}
          </h3>
          </label>
            <Box sx={{overflow:"hidden",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",bgcolor:"#6366f108" ,width:"100%",height:"200px",borderRadius:"20px",borderColor:"primary.main",borderWidth:"1px",borderStyle:"dashed"}}>
              <input type="file" hidden {...register(regName)} id={regName} onInput={handleImage}/>
              {image||value?
              <img src={image||value} style={{width:"100%"}} alt="" />:<><label htmlFor={regName}>
          <IconButton component="span">
          <ImageIcon sx={{fontSize:"36px",color:"primary.main"}}/>

          </IconButton>
          </label>
          <p style={{fontSize:"16px",fontWeight:"500",}}>Upload an Image</p></>}
              
            </Box>
    </>
  )
}
