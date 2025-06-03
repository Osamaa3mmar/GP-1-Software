import React from 'react';
import { Box, Typography, Paper, Breadcrumbs, Link, Chip, Divider } from '@mui/material';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import QuizIcon from '@mui/icons-material/Quiz';
import SchoolIcon from '@mui/icons-material/School';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import { useNavigate } from 'react-router-dom';

const QuizPreviewHeader = ({ quiz, courseName, lessonName, submissionDate }) => {
  const navigate = useNavigate();
  
  if (!quiz) {
    return null;
  }
  
  // Format the submission date
  const formatDate = (dateString) => {
    if (!dateString) return 'Unknown date';
    
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };
  
  // Handle navigation to course or lesson
  const handleCourseClick = (e) => {
    e.preventDefault();
    if (quiz?.courseId) {
      navigate(`/classroom/course/${quiz.courseId}`);
    }
  };
  
  const handleLessonClick = (e) => {
    e.preventDefault();
    if (quiz?.lessonId && quiz?.courseId) {
      navigate(`/classroom/course/${quiz.courseId}/lesson/${quiz.lessonId}`);
    }
  };
  
  return (
    <Paper elevation={3} sx={{ p: 3, borderRadius: 2, mb: 4 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
        <QuizIcon color="primary" sx={{ fontSize: 40, mr: 2 }} />
        <Typography variant="h4" component="h1" sx={{ fontWeight: 'bold' }}>
          {quiz.title || 'Quiz Preview'}
        </Typography>
      </Box>
      <Box sx={{ display: 'flex', alignItems: 'center', mt: { xs: 2, md: 0 } }}>
        <CalendarTodayIcon sx={{ mr: 1, color: 'text.secondary' }} />
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          Submitted on: {formatDate(submissionDate)}
        </Typography>
      </Box>
      
      <Divider sx={{ my: 2 }} />
      
      <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, gap: 2, mb: 2 }}>
        {quiz?.description && (
          <Typography variant="body1" sx={{ flex: 1 }}>
            {quiz.description}
          </Typography>
        )}
        
        <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
          {quiz?.totalMarks && (
            <Chip 
              label={`Total: ${quiz.totalMarks} marks`}
              color="primary"
              variant="outlined"
              size="small"
            />
          )}
          {quiz?.passingScore && (
            <Chip 
              label={`Passing: ${quiz.passingScore} marks`}
              color="secondary"
              variant="outlined"
              size="small"
            />
          )}
          {quiz?.timeLimit && (
            <Chip 
              label={`Time: ${quiz.timeLimit} min`}
              color="info"
              variant="outlined"
              size="small"
            />
          )}
        </Box>
      </Box>
      
      <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />} aria-label="breadcrumb">
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <SchoolIcon sx={{ mr: 0.5, fontSize: 20, color: 'primary.main' }} />
          <Link color="inherit" href="#" onClick={handleCourseClick} underline="hover">
            {courseName || 'Course'}
          </Link>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <MenuBookIcon sx={{ mr: 0.5, fontSize: 20, color: 'primary.main' }} />
          <Link color="inherit" href="#" onClick={handleLessonClick} underline="hover">
            {lessonName || 'Lesson'}
          </Link>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <QuizIcon sx={{ mr: 0.5, fontSize: 20, color: 'primary.main' }} />
          <Typography color="text.primary">Quiz Preview</Typography>
        </Box>
      </Breadcrumbs>
    </Paper>
  );
};

export default QuizPreviewHeader;
