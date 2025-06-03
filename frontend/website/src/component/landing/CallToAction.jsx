import React from 'react';
import { Box, Container, Typography, Button, Paper } from '@mui/material';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

const CallToAction = () => {
  return (
    <Box sx={{ py: 10, bgcolor: '#f8f9fa' }}>
      <Container maxWidth="md">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <Paper
            elevation={3}
            sx={{
              p: { xs: 4, md: 6 },
              borderRadius: 4,
              bgcolor: 'primary.main',
              color: 'white',
              textAlign: 'center',
              position: 'relative',
              overflow: 'hidden'
            }}
          >
            {/* Decorative elements */}
            <Box 
              sx={{ 
                position: 'absolute',
                width: '200px',
                height: '200px',
                borderRadius: '50%',
                background: 'rgba(255,255,255,0.1)',
                top: '-100px',
                right: '-50px',
                zIndex: 0
              }}
            />
            <Box 
              sx={{ 
                position: 'absolute',
                width: '150px',
                height: '150px',
                borderRadius: '50%',
                background: 'rgba(255,255,255,0.1)',
                bottom: '-70px',
                left: '-70px',
                zIndex: 0
              }}
            />
            
            <Box sx={{ position: 'relative', zIndex: 1 }}>
              <Typography 
                variant="h3" 
                component="h2" 
                fontWeight="bold"
                gutterBottom
                sx={{ mb: 2 }}
              >
                Ready to Transform Your Learning?
              </Typography>
              <Typography 
                variant="h6" 
                sx={{ mb: 4, opacity: 0.9, maxWidth: 700, mx: 'auto' }}
              >
                Join thousands of students who are already benefiting from our interactive courses, 
                AI-powered insights, and supportive community.
              </Typography>
              <Button 
                component={Link} 
                to="/auth/signup" 
                variant="contained" 
                size="large"
                endIcon={<ArrowForwardIcon />}
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
                Get Started Now
              </Button>
            </Box>
          </Paper>
        </motion.div>
      </Container>
    </Box>
  );
};

export default CallToAction;
