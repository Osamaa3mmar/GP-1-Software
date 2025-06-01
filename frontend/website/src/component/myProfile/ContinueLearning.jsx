import { useState, useEffect } from 'react';
import { 
  Box, 
  Typography, 
  Grid, 
  Paper, 
  Button, 
  LinearProgress, 
  CircularProgress 
} from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

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
      <Box sx={{ mt: 2, mb: 2, display: 'flex', justifyContent: 'center', alignItems: 'center', height: '200px' }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ mt: 2, mb: 2 }}>
        <Typography color="error" align="center">{error}</Typography>
      </Box>
    );
  }

  if (courses.length === 0) {
    return (
      <Box sx={{ p: 2 }}>
        <Paper sx={{ p: 3, borderRadius: 3, boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
          <Typography variant="h5" fontWeight={700} gutterBottom>
            Continue Learning
          </Typography>
          <Typography align="center" sx={{ mt: 4 }}>
            You don't have any courses in progress.
          </Typography>
        </Paper>
      </Box>
    );
  }

  return (
    <Box sx={{ p: 2 }}>
      <Paper sx={{ p: 3, borderRadius: 3, boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
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
          {courses.map((enrollment, index) => {
            const course = enrollment.course;
            return (
              <Grid item xs={12} sm={6} md={4} key={enrollment.id || index}>
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
                      src={course.thumbnail || course.image || 'https://via.placeholder.com/640x360?text=Course+Thumbnail'} 
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
                    
                    <Box sx={{ mt: 2, mb: 3 }}>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                        <Typography variant="caption" color="text.secondary">
                          Progress
                        </Typography>
                        <Typography variant="caption" fontWeight={500}>
                          {enrollment.progress || 0}%
                        </Typography>
                      </Box>
                      <LinearProgress 
                        variant="determinate" 
                        value={enrollment.progress || 0}
                        sx={{
                          height: 6,
                          borderRadius: 3,
                          backgroundColor: 'rgba(0,0,0,0.05)'
                        }}
                      />
                    </Box>
                    
                    <Button
                      fullWidth
                      variant="contained"
                      color="primary"
                      size="medium"
                      startIcon={<PlayArrowIcon />}
                      onClick={() => handleContinue(course.id)}
                      sx={{
                        borderRadius: 2,
                        py: 1,
                        textTransform: 'none',
                        fontWeight: 600
                      }}
                    >
                      Continue Learning
                    </Button>
                  </Box>
                </Paper>
              </Grid>
            );
          })}

        </Grid>
      </Paper>
    </Box>
  );
}
