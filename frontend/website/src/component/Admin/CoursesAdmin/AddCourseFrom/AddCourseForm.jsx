import { Box, Stack } from "@mui/material";
import Header from "./Header";
import CourseForm from "./CourseForm";

export default function AddCourseForm({close,getCorses,title}) {
  return (
    <Box sx={{position:"absolute",display:"flex",bgcolor:"white",alignItems:"center",justifyContent:"center",borderRadius:"15px",overflow:"hidden",width:"70%"}}>
      <Stack sx={{width:"100%"}} direction={"column"} spacing={2}>
      <Header close={close} title={title}/>
      <CourseForm getCourses={getCorses} close={close}/>
      </Stack>
    </Box>
  )
}
