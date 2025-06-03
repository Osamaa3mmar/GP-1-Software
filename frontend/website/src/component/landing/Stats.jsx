import React, { useState, useEffect } from 'react';
import { Box, Container, Grid, Typography, Paper } from '@mui/material';
import { motion } from 'framer-motion';
import PeopleIcon from '@mui/icons-material/People';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import SchoolIcon from '@mui/icons-material/School';
import WorkspacePremiumIcon from '@mui/icons-material/WorkspacePremium';

const statsData = [
  {
    icon: <MenuBookIcon sx={{ fontSize: 50, color: '#9a66ff' }} />,
    value: 250,
    label: 'Courses',
    suffix: '+'
  },
  {
    icon: <PeopleIcon sx={{ fontSize: 50, color: '#9a66ff' }} />,
    value: 15000,
    label: 'Students',
    suffix: '+'
  },
  {
    icon: <SchoolIcon sx={{ fontSize: 50, color: '#9a66ff' }} />,
    value: 120,
    label: 'Instructors',
    suffix: '+'
  },
  {
    icon: <WorkspacePremiumIcon sx={{ fontSize: 50, color: '#9a66ff' }} />,
    value: 98,
    label: 'Satisfaction Rate',
    suffix: '%'
  }
];

const Stats = () => {
  return (
    <Box sx={{ py: 10, bgcolor: 'white' }}>
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          {statsData.map((stat, index) => (
            <Grid item xs={6} md={3} key={index}>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Paper
                  elevation={2}
                  sx={{
                    p: 3,
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    textAlign: 'center',
                    borderRadius: 4,
                    transition: 'transform 0.3s, box-shadow 0.3s',
                    '&:hover': {
                      transform: 'translateY(-5px)',
                      boxShadow: 4
                    }
                  }}
                >
                  <Box sx={{ mb: 2 }}>
                    {stat.icon}
                  </Box>
                  <CountUp 
                    end={stat.value} 
                    suffix={stat.suffix} 
                    duration={2.5} 
                    style={{ 
                      fontSize: '2.5rem', 
                      fontWeight: 'bold',
                      color: '#9a66ff'
                    }} 
                  />
                  <Typography variant="h6" color="text.secondary" sx={{ mt: 1 }}>
                    {stat.label}
                  </Typography>
                </Paper>
              </motion.div>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

// Simple CountUp component
const CountUp = ({ end, suffix = '', duration = 2.5, ...props }) => {
  const [count, setCount] = useState(0);
  
  useEffect(() => {
    let startTime;
    let animationFrame;
    
    const updateCount = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);
      setCount(Math.floor(progress * end));
      
      if (progress < 1) {
        animationFrame = requestAnimationFrame(updateCount);
      }
    };
    
    animationFrame = requestAnimationFrame(updateCount);
    
    return () => cancelAnimationFrame(animationFrame);
  }, [end, duration]);
  
  return <Typography {...props}>{count}{suffix}</Typography>;
};

export default Stats;
