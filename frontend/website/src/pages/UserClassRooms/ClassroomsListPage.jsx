import { Container, Box, Grid } from "@mui/material";
import ClassroomCard from "../../component/UserClassRooms/ClassroomCard";
import { useEffect, useState } from "react";
import axios from "axios";
// import mockClassrooms from "../data/mockClassrooms";

const mockClassrooms = [
    {
      id: '1',
      title: 'Mathematics 101',
      courseCode: 'MATH-101',
      instructor: 'Dr. Smith',
      lessons: [
        {
          id: '1',
          title: 'Introduction to Algebra',
          description: 'Basic algebraic concepts and equations',
          recordingLink: '#',
          quizLink: '#',
          duration: '45m'
        },
        {
          id: '2',
          title: 'Linear Equations',
          description: 'Solving linear equations with practical examples',
          recordingLink: '#',
          quizLink: '#',
          duration: '55m'
        }
      ]
    },
    {
      id: '2',
      title: 'Physics Fundamentals',
      courseCode: 'PHYS-101',
      instructor: 'Dr. Johnson',
      lessons: [
        {
          id: '3',
          title: 'Newtonian Mechanics',
          description: 'Understanding Newton\'s laws of motion',
          recordingLink: '#',
          quizLink: '#',
          duration: '60m'
        }
      ]
    }
  ];

const ClassroomsListPage = () => {
  const [courses, setCourses] = useState([]);
  
    useEffect(() => {
      const fetchCourses = async () => {
        try {
          const response = await axios.get("http://localhost:4545/course/getall");
          setCourses(response.data.courses || []);
        } catch (error) {
          console.error("Failed to fetch courses:", error);
        }
      };
  
      fetchCourses();
    }, []);
  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={1}>
          {courses.map((course) => (
            <Grid item key={course.id} xs={12} sm={6} md={4} lg={3}>
              <ClassroomCard course={course} />
            </Grid>
          ))}
        </Grid>
      </Box>
    </Container>
  );
};
export default ClassroomsListPage;