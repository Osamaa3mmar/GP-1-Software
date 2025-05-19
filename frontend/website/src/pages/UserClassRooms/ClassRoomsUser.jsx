import { useState } from 'react';
import { Box, Container , Typography } from '@mui/material';
import { ClassroomList } from '../../component/UserClassRooms/ClassroomList';
import { LessonAccordions } from '../../component/UserClassRooms/LessonAccordions';

const ClassRoomsUser = () => {
  const [selectedClassroom, setSelectedClassroom] = useState(null);

  // Mock data - replace with API call
  const classrooms = [
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

  const selectedClassroomData = classrooms.find(c => c.id === selectedClassroom);

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ 
        display: 'flex', 
        gap: 4, 
        flexDirection: { xs: 'column', md: 'row' } 
      }}>
        <ClassroomList
          classrooms={classrooms}
          selectedClassroom={selectedClassroom}
          onSelectClassroom={setSelectedClassroom}
        />
        
        {selectedClassroom ? (
          <LessonAccordions lessons={selectedClassroomData?.lessons || []} />
        ) : (
          <Box sx={{ 
            flex: 1, 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center',
            height: 300
          }}>
            <Typography variant="h6" color="text.secondary">
              Select a classroom to view lessons
            </Typography>
          </Box>
        )}
      </Box>
    </Container>
  );
};

export default ClassRoomsUser;