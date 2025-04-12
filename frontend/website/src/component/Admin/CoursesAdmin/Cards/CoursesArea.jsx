import Grid from "@mui/material/Grid2";
import CourseCardAdmin from "./CourseCardAdmin";
import { Box } from "@mui/material";
import placeHolder from '../../../../../public/coursesPlaceholderAdmin.png';

export default function CoursesArea({ courses,setCourses }) {
 
  return (
    <Grid sx={{padding:"5px"}} container spacing={3}>
      {courses.length>0
        ? courses.map((course,index) => {
            return (
              <CourseCardAdmin setCourses={setCourses} key={index} course={course} />
            );
          })
        : <Box sx={{margin:"auto",width:"50%",overflow:"hidden"}}>
          <img src={placeHolder} style={{width:"100%",}} alt="" />
          </Box>}
    </Grid>
  );
}
