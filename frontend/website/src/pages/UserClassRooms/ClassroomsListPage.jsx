import { Container, Box, Grid } from "@mui/material";
import ClassroomCard from "../../component/UserClassRooms/ClassroomCard";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
// import mockClassrooms from "../data/mockClassrooms";
import { UserContext } from "../../Context/userContext";

const ClassroomsListPage = () => {
  const [courses, setCourses] = useState([]);
  const {user}=useContext(UserContext);
  
  const fetchCourses = async () => {
    try {
      const response = await axios.post("http://localhost:4545/user/fullprofile",{
        id:user.id
      },{
        headers:{
          token: localStorage.getItem("token")
        }
      });
      setCourses(response.data.user.enrollments || []);
    } catch (error) {
      console.error("Failed to fetch courses:", error);
    }
  };
    useEffect(() => {
      if(user)
      fetchCourses();
    }, [user]);
  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={1}>
          {courses.map((course) => (
            <Grid item key={course.course.id} xs={12} sm={12} md={6} lg={4}>
              <ClassroomCard course={course} />
            </Grid>
          ))}
        </Grid>
      </Box>
    </Container>
  );
};
export default ClassroomsListPage;