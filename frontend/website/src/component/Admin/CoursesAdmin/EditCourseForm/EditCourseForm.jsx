import { Box, Stack } from "@mui/material";
import Header from "../AddCourseFrom/Header";
import EditCourseFormForm from "./EditCourseFormForm";
import { useEffect, useState } from "react";
import axios from "axios";

export default function EditCourseForm({reload,course,title,close}) {
    
    const[fullCourse,setFullCourse]=useState(null);
    const getFullCourse=async()=>{
    try{
        const {data}=await axios.get('http://localhost:4545/course/getdetailedinfo/'+course.id,{
            headers:{
                token:localStorage.getItem('token')
            }
        });
        setFullCourse(data.course);

    }
    catch(error){
        console.log(error);
    }
}
    useEffect(()=>{
        getFullCourse();
    },[])
  return (
        <Box sx={{position:"absolute",display:"flex",bgcolor:"white",alignItems:"center",justifyContent:"center",borderRadius:"15px",overflow:"hidden",width:"70%"}}>
          <Stack sx={{width:"100%"}} direction={"column"} spacing={2}>
                  <Header close={close} title={title}/>
                  {fullCourse?
                  
                  <EditCourseFormForm close={close} reload={reload} course={fullCourse}/>
                  :''}
          </Stack>
        </Box>
  )
}
