import React from 'react';
import { Box, Container, Grid, Typography, Paper } from '@mui/material';
import { motion } from 'framer-motion';
import QuizIcon from '@mui/icons-material/Quiz';
import MessageIcon from '@mui/icons-material/Message';
import SchoolIcon from '@mui/icons-material/School';
import SmartToyIcon from '@mui/icons-material/SmartToy';

const featureItems = [
  {
    icon: <SchoolIcon sx={{ fontSize: 50, color: '#9a66ff' }} />,
    title: 'Interactive Courses',
    description: 'Engage with comprehensive courses designed by industry experts. Learn at your own pace with interactive content and practical exercises.'
  },
  {
    icon: <QuizIcon sx={{ fontSize: 50, color: '#9a66ff' }} />,
    title: 'Smart Quizzes',
    description: 'Test your knowledge with our intelligent quiz system that adapts to your learning progress and provides personalized feedback.'
  },
  {
    icon: <MessageIcon sx={{ fontSize: 50, color: '#9a66ff' }} />,
    title: 'Messaging System',
    description: 'Connect directly with instructors and fellow students through our integrated messaging platform for collaborative learning.'
  },
  {
    icon: <SmartToyIcon sx={{ fontSize: 50, color: '#9a66ff' }} />,
    title: 'AI-Powered Insights',
    description: 'Benefit from AI-driven analytics that provide personalized recommendations and insights to optimize your learning journey.'
  }
];

const Features = () => {
  return (
    <Box id="features" sx={{ py: 10, bgcolor: '#f8f9fa' }}>
      <Container maxWidth="lg">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <Typography 
            variant="h3" 
            component="h2" 
            align="center" 
            fontWeight="bold"
            gutterBottom
            sx={{ mb: 2 }}
          >
            Powerful Learning Features
          </Typography>
          <Typography 
            variant="h6" 
            align="center" 
            color="text.secondary"
            sx={{ mb: 6, maxWidth: 700, mx: 'auto' }}
          >
            Our platform combines cutting-edge technology with proven educational methods to deliver an exceptional learning experience
          </Typography>
        </motion.div>

        <Grid container spacing={4}>
          {featureItems.map((feature, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Paper
                  elevation={2}
                  sx={{
                    p: 4,
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    textAlign: 'center',
                    borderRadius: 4,
                    transition: 'transform 0.3s, box-shadow 0.3s',
                    '&:hover': {
                      transform: 'translateY(-8px)',
                      boxShadow: 8
                    }
                  }}
                >
                  <Box sx={{ mb: 2 }}>
                    {feature.icon}
                  </Box>
                  <Typography variant="h5" component="h3" fontWeight="bold" gutterBottom>
                    {feature.title}
                  </Typography>
                  <Typography color="text.secondary">
                    {feature.description}
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

export default Features;
