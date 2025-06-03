
import { 
  Box, 
  Typography, 
  Grid, 
  Paper, 
  LinearProgress 
} from '@mui/material';
import { useContext } from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../Context/UserContext';
import { useEffect } from 'react';

export default function Courses({ courses = [], onCourseClick,id }) {
  const navigate = useNavigate();

  const handleCourseClick = (courseId) => {
    if (onCourseClick) {
      onCourseClick(courseId);
    } else {
      // Fallback to direct navigation if no click handler provided
      navigate(`/main/course/${courseId}`);
    }
  };
const [me,setMe]=useState(false);
  const {user}=useContext(UserContext);
  useEffect(()=>{
    if(user?.id==id){
      setMe(true);
    }
  },[user]);
  if(me){
    return null;
  }
  return (
    <Box sx={{ p: 2 }}>
      <Paper sx={{ p: 3, borderRadius: 3, boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
        <Typography variant="h5" fontWeight={700} sx={{ mb: 3 }}>
           Courses
        </Typography>

        {courses && courses.length > 0 ? (
          <Grid container spacing={3}>
            {courses.map((enrollment, index) => {
              const course = enrollment.course || {};
              const progress = enrollment.progress || 0;
              
              return (
                <Grid item xs={12} sm={6} md={4} key={index}>
                  <Paper 
                    elevation={0} 
                    sx={{ 
                      borderRadius: 3, 
                      overflow: 'hidden',
                      border: '1px solid rgba(0, 0, 0, 0.06)',
                      transition: 'all 0.3s ease',
                      cursor: 'pointer',
                      '&:hover': {
                        transform: 'translateY(-5px)',
                        boxShadow: '0 10px 20px rgba(0, 0, 0, 0.08)'
                      }
                    }}
                    onClick={() => handleCourseClick(course.id)}
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
                      {course.duration && (
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
                            {course.duration} weeks
                          </Typography>
                        </Box>
                      )}
                    </Box>

                    <Box sx={{ p: 3 }}>
                      <Typography variant="h6" fontWeight={600} gutterBottom>
                        {course.title || 'Untitled Course'}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" gutterBottom sx={{ 
                        height: '3em', 
                        overflow: 'hidden', 
                        textOverflow: 'ellipsis', 
                        display: '-webkit-box', 
                        WebkitLineClamp: 2, 
                        WebkitBoxOrient: 'vertical' 
                      }}>
                        {course.description || 'No description available'}
                      </Typography>
                      
                      <Box sx={{ mt: 2 }}>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                          <Typography variant="caption" color="text.secondary">
                            Progress
                          </Typography>
                          <Typography variant="caption" fontWeight={500}>
                            {progress}%
                          </Typography>
                        </Box>
                        <LinearProgress 
                          variant="determinate" 
                          value={progress}
                          sx={{
                            height: 6,
                            borderRadius: 3,
                            backgroundColor: 'rgba(0,0,0,0.05)'
                          }}
                        />
                      </Box>
                      
                      {enrollment.lastActivity && (
                        <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mt: 2 }}>
                          Last activity: {new Date(enrollment.lastActivity).toLocaleDateString()}
                        </Typography>
                      )}
                    </Box>
                  </Paper>
                </Grid>
              );
            })}
          </Grid>
        ) : (
          <Box sx={{ py: 4, textAlign: 'center' }}>
            <Typography variant="body1" color="text.secondary">
              You are not enrolled in any courses yet.
            </Typography>
          </Box>
        )}
      </Paper>
    </Box>
  );
}
