// pages/ClassroomPage.jsx
import { Container, Box, Typography, Button } from "@mui/material";
import { useParams } from "react-router-dom";
// import LessonAccordions from "../../component/UserClassRooms/LessonAccordions";
// import mockClassrooms from "../data/mockClassrooms"; // Your mock data

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

const ClassroomPage = () => {
  const { classroomId } = useParams();
  const classroom = mockClassrooms.find(c => c.id === classroomId);

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h3" fontWeight="600" gutterBottom>
          {classroom?.title}
        </Typography>
        <Typography variant="subtitle1" color="text.secondary">
          {classroom?.courseCode} • Instructor: {classroom?.instructor}
        </Typography>
      </Box>

      {classroom?.lessons?.length > 0 ? (
        <LessonAccordions lessons={classroom.lessons} />
      ) : (
        <Box sx={{ 
          height: '60vh', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center' 
        }}>
          <Typography variant="h6" color="text.secondary">
            No lessons available for this classroom
          </Typography>
        </Box>
      )}
    </Container>
  );
};

export default ClassroomPage;