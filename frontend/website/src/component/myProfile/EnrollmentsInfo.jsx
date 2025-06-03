import { Box, Typography, Paper, Grid, CircularProgress } from '@mui/material';
import SchoolIcon from '@mui/icons-material/School';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import axios from 'axios';
import { useState, useEffect } from 'react';

export default function EnrollmentsInfo({ enrollments = [] }) {
  const [learningHours, setLearningHours] = useState({
    totalHours: 0,
    thisMonthHours: 0
  });
  const [loading, setLoading] = useState(true);
  
  // Fetch learning hours data
  useEffect(() => {
    const fetchLearningHours = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem('token');
        const { data } = await axios.get('http://localhost:4545/enrollments/user/learning-hours', {
          headers: { token }
        });
        
        setLearningHours({
          totalHours: data.totalHours || 0,
          thisMonthHours: data.thisMonthHours || 0
        });
      } catch (error) {
        console.error('Error fetching learning hours:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchLearningHours();
  }, []);
  
  // Calculate statistics
  const totalCourses = enrollments?.length || 0;
  const completedCourses = enrollments?.filter(e => (e.progress || 0) >= 100)?.length || 0;
  const inProgressCourses = totalCourses - completedCourses;
  const infoCards = [
    {
      title: "Total Courses",
      value: totalCourses,
      icon: SchoolIcon,
      color: "#665edf"  // Primary purple
    },
    {
      title: "In Progress",
      value: inProgressCourses,
      icon: MenuBookIcon,
      color: "#ff9800"  // Orange
    },
    {
      title: "Completed",
      value: completedCourses,
      icon: CheckCircleOutlineIcon,
      color: "#4caf50"  // Green
    },
    
    
  ];

  return (
    <Box sx={{ p: 2 }}>
      <Paper sx={{ p: 3, borderRadius: 3, boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
        <Typography variant="h5" sx={{ fontWeight: 700, color: '#333', mb: 3 }}>
          Learning Summary
        </Typography>
        
        {loading && (
          <Box display="flex" justifyContent="center" my={3}>
            <CircularProgress size={30} />
          </Box>
        )}

        {!loading && (
          <Grid container spacing={3}>
            {infoCards.map((card, index) => {
            const IconComponent = card.icon;
            
            return (
              <Grid item xs={12} sm={4} key={index}>
                <Paper 
                  elevation={1}
                  sx={{
                    p: 2,
                    borderRadius: 2,
                    display: 'flex',
                    alignItems: 'center',
                    borderLeft: `4px solid ${card.color}`,
                    bgcolor: 'background.paper',
                    transition: 'transform 0.2s',
                    '&:hover': {
                      transform: 'translateY(-2px)',
                    }
                  }}
                >
                  <Box
                    sx={{
                      mr: 2,
                      p: 1.5,
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      bgcolor: `${card.color}15`, // Transparent version of the color
                      color: card.color
                    }}
                  >
                    <IconComponent />
                  </Box>
                  
                  <Box>
                    <Typography variant="body2" color="text.secondary">
                      {card.title}
                    </Typography>
                    <Typography variant="h5" fontWeight="bold">
                      {card.value}
                    </Typography>
                  </Box>
                </Paper>
              </Grid>
            );
            })}
          </Grid>
        )}
      </Paper>
    </Box>
  );
}
