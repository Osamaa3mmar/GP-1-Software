
import { useState, useEffect } from 'react';
import { Box, Typography, Grid, Paper, Button, LinearProgress, CircularProgress } from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function ContinueLearning() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        setLoading(true);
        // Get token from localStorage
        const token = localStorage.getItem('token');
        
        if (!token) {
          setError('Authentication token not found. Please log in again.');
          setLoading(false);
          return;
        }
        
        const response = await axios.get('http://localhost:4545/enrollments/user/enrolled', {
          headers: {
            token: token
          }
        });
        
        if (response.data.courses) {
          setCourses(response.data.courses);
        }
      } catch (err) {
        console.error('Error fetching enrolled courses:', err);
        setError('Failed to load your courses. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  const handleViewAll = () => {
    navigate('/main/classrooms');
  };

  const handleContinue = (courseId) => {
    navigate(`/main/classrooms/${courseId}`);
  };

  if (loading) {
    return (
      <Box sx={{ mt: 6, mb: 8, display: 'flex', justifyContent: 'center', alignItems: 'center', height: '200px' }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ mt: 6, mb: 8 }}>
        <Typography color="error" align="center">{error}</Typography>
      </Box>
    );
  }

  if (courses.length === 0) {
    return (
      <Box sx={{ mt: 6, mb: 8 }}>
        <Typography variant="h5" fontWeight={700} gutterBottom>
          Continue Learning
        </Typography>
        <Typography align="center" sx={{ mt: 4 }}>
          You don&apos;t have any courses in progress.
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ mt: 6, mb: 8 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h5" fontWeight={700}>
          Continue Learning
        </Typography>
        <Button 
          endIcon={<ArrowForwardIcon />} 
          sx={{ color: 'primary.main', fontWeight: 600 }}
          onClick={handleViewAll}
        >
          View All
        </Button>
      </Box>
      
      <Grid container spacing={3}>
        {courses.map((enrollment) => {
          const course = enrollment.course;
          return (
            <Grid item xs={12} sm={6} md={4} key={enrollment.id}>
              <Paper 
                elevation={0} 
                sx={{ 
                  borderRadius: 3, 
                  overflow: 'hidden',
                  border: '1px solid rgba(0, 0, 0, 0.06)',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-5px)',
                    boxShadow: '0 10px 20px rgba(0, 0, 0, 0.08)'
                  }
                }}
              >
                <Box sx={{ position: 'relative' }}>
                  <Box 
                    component="img" 
                    src={course.thumbnail || 'https://via.placeholder.com/640x360?text=Course+Thumbnail'} 
                    alt={course.title}
                    sx={{ 
                      width: '100%', 
                      height: 180, 
                      objectFit: 'cover',
                      filter: 'brightness(0.9)'
                    }}
                  />
                  <Box 
                    sx={{ 
                      position: 'absolute', 
                      top: 12, 
                      left: 12,
                      bgcolor: 'rgba(255, 255, 255, 0.9)',
                      borderRadius: 4,
                      px: 1.5,
                      py: 0.5
                    }}
                  >
                    <Typography variant="caption" fontWeight={600} color="primary.main">
                      {course.duration ? `${course.duration} weeks` : 'Self-paced'}
                    </Typography>
                  </Box>
                </Box>

                <Box sx={{ p: 3 }}>
                  <Typography variant="h6" fontWeight={600} gutterBottom>
                    {course.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" gutterBottom>
                    {course.teacher?.username || 'Instructor'}
                  </Typography>
                  
                  <Box sx={{ mt: 2, mb: 1 }}>
                    <LinearProgress 
                      variant="determinate" 
                      value={enrollment.progress} 
                      sx={{
                        height: 8,
                        borderRadius: 4,
                        backgroundColor: 'rgba(0, 0, 0, 0.06)',
                        '& .MuiLinearProgress-bar': {
                          backgroundColor: enrollment.progress < 50 ? '#6366f1' : '#22c55e',
                        }
                      }}
                    />
                  </Box>
                  
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                    <Typography variant="body2" color="text.secondary">
                      {enrollment.progress}% Complete
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Updated: {new Date(enrollment.updatedAt || enrollment.createdAt).toLocaleDateString()}
                    </Typography>
                  </Box>
                  
                  <Button 
                    variant="contained" 
                    fullWidth
                    startIcon={<ArrowForwardIcon />}
                    onClick={() => handleContinue(course.id)}
                    sx={{ 
                      borderRadius: 6,
                      py: 1.2,
                      bgcolor: '#6366f1',
                      '&:hover': {
                        bgcolor: '#4f46e5'
                      }
                    }}
                  >
                    Continue
                  </Button>
                </Box>
              </Paper>
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
}
