import Grid from "@mui/material/Grid2";
import CourseCardAdmin from "./CourseCardAdmin";


export default function CoursesArea({ courses,setCourses }) {
 
  return (
    <Grid sx={{padding:"5px"}} container spacing={3}>
      {courses
        ? courses.map((course,index) => {
            return (
              <CourseCardAdmin setCourses={setCourses} key={index} course={course} />
            );
          })
        : ""}
    </Grid>
  );
}
