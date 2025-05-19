import Grid from "@mui/material/Grid2";
import CourseCardAdmin from "./CourseCardAdmin";
import { Box, CircularProgress } from "@mui/material";
import placeHolder from '../../../../../public/coursesPlaceholderAdmin.png';
import { useEffect, useState } from "react";

export default function CoursesArea({ courses,setCourses,setCurrentCourse ,openModal}) {
  const [loading,setLoading]=useState(true);

const dellay=async()=>{
  await new Promise((resolve)=> setTimeout(resolve,1000))
  setLoading(false);
}

  useEffect(()=>{
    dellay()
  },[])


  return (<>
  {loading?<Box sx={{display:"flex",alignItems:"center",justifyContent:"center",width:"100%",height:"500px"}}><CircularProgress size="150px" /></Box>:
  <Grid sx={{padding:"5px"}} container spacing={3}>
  {courses.length>0
    ? courses.map((course,index) => {
        return (
          <CourseCardAdmin setCurrentCourse={setCurrentCourse} openModal={openModal} setCourses={setCourses} key={index} course={course} />
        );
      })
    : <Box sx={{margin:"auto",width:"50%",overflow:"hidden"}}>
      <img src={placeHolder} style={{width:"100%",}} alt="" />
      </Box>}
</Grid>}
    
    </>
  );
}
