import React from 'react';
import { Box, Typography, Button, Container, Grid } from '@mui/material';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import SchoolIcon from '@mui/icons-material/School';

const Hero = () => {
  return (
    <Box 
      id="hero"
      sx={{ 
        background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)',
        color: 'white',
        py: 10,
        overflow: 'hidden',
        position: 'relative'
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4} alignItems="center">
          <Grid item xs={12} md={6}>
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <Typography 
                variant="h2" 
                component="h1" 
                fontWeight="bold"
                gutterBottom
                sx={{ fontSize: { xs: '2.5rem', md: '3.5rem' } }}
              >
                Transform Your Learning Journey
              </Typography>
              <Typography 
                variant="h5" 
                sx={{ mb: 4, opacity: 0.9 }}
              >
                Discover expert-led courses and interactive learning experiences designed to help you succeed
              </Typography>
              <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                <Button 
                  component={Link} 
                  to="/auth/signup" 
                  variant="contained" 
                  size="large"
                  sx={{ 
                    bgcolor: '#9a66ff', 
                    color: 'white',
                    '&:hover': {
                      bgcolor: '#8a56ef',
                    },
                    px: 4,
                    py: 1.5,
                    borderRadius: 2,
                    fontWeight: 'bold'
                  }}
                >
                  Get Started
                </Button>
                <Button 
                  component={Link} 
                  to="/main/courses" 
                  variant="outlined" 
                  size="large"
                  sx={{ 
                    borderColor: 'white', 
                    color: 'white',
                    '&:hover': {
                      borderColor: 'white',
                      bgcolor: 'rgba(255,255,255,0.1)',
                    },
                    px: 4,
                    py: 1.5,
                    borderRadius: 2,
                    fontWeight: 'bold'
                  }}
                >
                  Explore Courses
                </Button>
              </Box>
            </motion.div>
          </Grid>
          <Grid item xs={12} md={6}>
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              style={{ display: 'flex', justifyContent: 'center' }}
            >
              <Box 
                sx={{ 
                  position: 'relative',
                  width: '100%',
                  height: { xs: '300px', md: '400px' },
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center'
                }}
              >
                <Box 
                  component="img"
                  src="/Logo.png"
                  alt="Education Platform"
                  sx={{ 
                    maxWidth: '100%',
                    maxHeight: '100%',
                    objectFit: 'contain',
                    filter: 'drop-shadow(0px 10px 20px rgba(0,0,0,0.2))'
                  }}
                />
                <SchoolIcon 
                  sx={{ 
                    position: 'absolute',
                    fontSize: '4rem',
                    color: 'white',
                    opacity: 0.2,
                    top: '10%',
                    right: '10%',
                    transform: 'rotate(15deg)'
                  }}
                />
              </Box>
            </motion.div>
          </Grid>
        </Grid>
      </Container>
      
      {/* Decorative elements */}
      <Box 
        sx={{ 
          position: 'absolute',
          width: '300px',
          height: '300px',
          borderRadius: '50%',
          background: 'rgba(255,255,255,0.1)',
          top: '-150px',
          right: '-100px',
          zIndex: 0
        }}
      />
      <Box 
        sx={{ 
          position: 'absolute',
          width: '200px',
          height: '200px',
          borderRadius: '50%',
          background: 'rgba(255,255,255,0.1)',
          bottom: '-100px',
          left: '-50px',
          zIndex: 0
        }}
      />
    </Box>
  );
};

export default Hero;
