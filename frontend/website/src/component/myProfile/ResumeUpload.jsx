import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../Context/UserContext";
import { Button } from "@mui/material";

export default function ResumeUpload({ id,onOpen }) {
    const { user } = useContext(UserContext);
    // Check if the user is a tech
     const [me,setMe]=useState(false);
      useEffect(()=>{
        if(user?.id==id){
          setMe(true);
        }
      },[user]);
  return (
    <>
    {
    me && user?.role=="tech" ?
    <Button
    sx={{
        marginTop: 2,
    }}
        onClick={onOpen}
      variant="contained"
      color="primary"
      >
        Upload Resume
    </Button>
    :''
    }
    
    </>
  )
}
