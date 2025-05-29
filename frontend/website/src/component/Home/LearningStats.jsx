
import { useState, useEffect, useContext } from 'react';
import { Box, Typography, Grid, Paper, Stack, CircularProgress } from '@mui/material';
import axios from 'axios';
import { UserContext } from '../../Context/UserContext';

export default function LearningStats() {
  const { user } = useContext(UserContext);
  const [stats, setStats] = useState([
    {
      title: "Courses in Progress",
      value: "0",
      color: "#6366f1",
      subtext: "Keep learning!"
    },
    {
      title: "Completed Courses",
      value: "0",
      color: "#22c55e",
      subtext: "Great job!"
    },
    {
      title: "Hours Learned",
      value: "0",
      color: "#ec4899",
      subtext: "This month"
    },
    {
      title: "Achievement Points",
      value: "0",
      color: "#f97316",
      subtext: "Rank: Beginner"
    }
  ]);
  
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    const fetchStats = async () => {
      try {
        // Get token from localStorage
        const token = localStorage.getItem('token');
        
        if (!token) {
          setError('Authentication token not found');
          setLoading(false);
          return;
        }
        
        // Fetch in-progress courses count
        const inProgressResponse = await axios.get('http://localhost:4545/enrollments/user/inprogress/count', {
          headers: { token }
        });
        
        // Fetch completed courses count
        const completedResponse = await axios.get('http://localhost:4545/enrollments/user/completed/count', {
          headers: { token }
        });
        
        // Fetch user achievement points
        const pointsResponse = await axios.get('http://localhost:4545/enrollments/user/points', {
          headers: { token }
        });
        
        // Fetch user learning hours
        const hoursResponse = await axios.get('http://localhost:4545/enrollments/user/learning-hours', {
          headers: { token }
        });

        // User info is now retrieved from context, no need to parse from localStorage
        
        // Update stats with fetched data
        setStats(prevStats => {
          const newStats = [...prevStats];
          
          // Update courses in progress
          newStats[0] = {
            ...newStats[0],
            value: inProgressResponse.data.count.toString(),
            subtext: inProgressResponse.data.count === 1 ? 'Keep going!' : 'Keep learning!'
          };
          
          // Update completed courses
          newStats[1] = {
            ...newStats[1],
            value: completedResponse.data.count.toString(),
            subtext: completedResponse.data.count > 0 ? 'Completed successfully!' : 'Start completing courses!'
          };
          
          // Update hours learned
          newStats[2] = {
            ...newStats[2],
            value: hoursResponse.data.totalHours.toString(),
            subtext: `This month: ${hoursResponse.data.thisMonthHours} hours`
          };
          
          // Update achievement points
          newStats[3] = {
            ...newStats[3],
            value: pointsResponse.data.totalPoints.toString(),
            subtext: `Rank: ${pointsResponse.data.rank}`
          };
          
          return newStats;
        });
        
      } catch (err) {
        console.error('Error fetching stats:', err);
        setError('Failed to load your learning statistics');
      } finally {
        setLoading(false);
      }
    };
    
    fetchStats();
  }, []);
  
  if (loading) {
    return (
      <Box sx={{ mb: 4, mt: 6, display: 'flex', justifyContent: 'center', py: 4 }}>
        <CircularProgress />
      </Box>
    );
  }
  
  if (error) {
    return (
      <Box sx={{ mb: 4, mt: 6 }}>
        <Typography variant="h4" fontWeight={700} mb={3}>
          Welcome!
        </Typography>
        <Typography color="error">{error}</Typography>
      </Box>
    );
  }
  
  return (
    <Box sx={{ mb: 4, mt: 6 }}>
      <Typography variant="h4" fontWeight={700} mb={3}>
        Welcome back, {user?.username ? user.username.charAt(0).toUpperCase() + user.username.slice(1) : 'Learner'}!
      </Typography>
      
      <Typography variant="body1" color="text.secondary" mb={4}>
        Continue your learning journey and explore new courses.
      </Typography>
      
      <Grid container spacing={2}>
        {stats.map((stat, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Paper 
              elevation={0} 
              sx={{ 
                p: 3, 
                borderRadius: 3, 
                height: '100%',
                backgroundColor: 'rgba(255, 255, 255, 0.9)',
                border: '1px solid rgba(0, 0, 0, 0.06)'
              }}
            >
              <Stack spacing={1}>
                <Typography variant="body1" fontWeight={500} color="text.secondary">
                  {stat.title}
                </Typography>
                <Typography 
                  variant="h2" 
                  fontWeight={700} 
                  sx={{ color: stat.color }}
                >
                  {stat.value}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {stat.subtext}
                </Typography>
              </Stack>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
