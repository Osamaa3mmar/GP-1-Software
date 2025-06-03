import React from 'react';
import { Box, Container, Grid, Typography, Paper, useTheme, useMediaQuery } from '@mui/material';
import { motion } from 'framer-motion';
import AutoFixHighIcon from '@mui/icons-material/AutoFixHigh';
import ImageIcon from '@mui/icons-material/Image';

const AIFeatures = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const features = [
    {
      icon: <AutoFixHighIcon sx={{ fontSize: 50, color: '#9a66ff' }} />,
      title: 'AI Quiz Generator',
      description: 'Our advanced AI automatically creates comprehensive quizzes from your course content. Generate challenging questions with varying difficulty levels to test knowledge effectively.'
    },
    {
      icon: <ImageIcon sx={{ fontSize: 50, color: '#9a66ff' }} />,
      title: 'Course Thumbnail Generator',
      description: 'Create professional and eye-catching thumbnails for your courses with our AI image generator. Stand out with custom visuals that perfectly represent your course content.'
    }
  ];

  return (
    <Box id="ai-features" sx={{ py: 10, bgcolor: '#f5f5f5' }}>
      <Container maxWidth="lg">
        <Grid container spacing={6} alignItems="center">
          <Grid item xs={12} md={12}>
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <Typography 
                variant="h3" 
                component="h2" 
                fontWeight="bold"
                gutterBottom
                sx={{ mb: 2 }}
              >
                AI-Powered Learning Experience
              </Typography>
              <Typography 
                variant="h6" 
                color="text.secondary"
                sx={{ mb: 4 }}
              >
                Our platform leverages cutting-edge artificial intelligence to enhance your learning journey and provide personalized support.
              </Typography>



              <Grid container spacing={3} sx={{ mt: 2 }}>
                {features.map((feature, index) => (
                  <Grid item xs={12} key={index}>
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      viewport={{ once: true }}
                    >
                      <Paper
                        elevation={2}
                        sx={{
                          p: 3,
                          borderRadius: 4,
                          display: 'flex',
                          alignItems: 'flex-start',
                          gap: 2,
                          transition: 'transform 0.3s, box-shadow 0.3s',
                          '&:hover': {
                            transform: 'translateY(-5px)',
                            boxShadow: 4
                          }
                        }}
                      >
                        <Box>
                          {feature.icon}
                        </Box>
                        <Box>
                          <Typography variant="h6" component="h3" fontWeight="bold" gutterBottom>
                            {feature.title}
                          </Typography>
                          <Typography color="text.secondary">
                            {feature.description}
                          </Typography>
                        </Box>
                      </Paper>
                    </motion.div>
                  </Grid>
                ))}
              </Grid>
            </motion.div>
          </Grid>

        </Grid>
      </Container>
    </Box>
  );
};

export default AIFeatures;
