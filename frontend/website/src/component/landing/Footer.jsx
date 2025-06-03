import React from 'react';
import { Box, Container, Grid, Typography, Link, IconButton, Divider } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import YouTubeIcon from '@mui/icons-material/YouTube';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <Box sx={{ bgcolor: '#f5f5f5', color: '#333', pt: 8, pb: 4 }}>
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <Box sx={{ mb: 3 }}>
              <Box component="img" src="/Logo.png" alt="Logo" sx={{ height: 60, mr: 1 }} />
              <Typography variant="h5" component="div" fontWeight="bold" sx={{ mb: 1 }}>
                Thuraa
              </Typography>
            </Box>
            <Typography variant="body2" sx={{ mb: 2, opacity: 0.7 }}>
              Our education platform combines cutting-edge technology with expert-led courses to provide an exceptional learning experience. Join us to transform your skills and career.
            </Typography>
            <Box sx={{ display: 'flex', gap: 1 }}>
              <IconButton size="medium" sx={{ color: '#9a66ff' }}>
                <FacebookIcon />
              </IconButton>
              <IconButton size="medium" sx={{ color: '#9a66ff' }}>
                <TwitterIcon />
              </IconButton>
              <IconButton size="medium" sx={{ color: '#9a66ff' }}>
                <InstagramIcon />
              </IconButton>
              <IconButton size="medium" sx={{ color: '#9a66ff' }}>
                <LinkedInIcon />
              </IconButton>
              <IconButton size="medium" sx={{ color: '#9a66ff' }}>
                <YouTubeIcon />
              </IconButton>
            </Box>
          </Grid>
          
          <Grid item xs={6} sm={3} md={2}>
            <Typography variant="h6" fontWeight="bold" gutterBottom>
              Explore
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              <Link component={RouterLink} to="/main/courses" color="inherit" underline="hover" sx={{ color: '#555', '&:hover': { color: '#9a66ff' } }}>
                Courses
              </Link>
              <Link component={RouterLink} to="/main/instructors" color="primary" underline="hover">
                Instructors
              </Link>
              <Link component={RouterLink} to="/main/academies" color="primary" underline="hover">
                Academies
              </Link>
              <Link component={RouterLink} to="/main/about" color="primary" underline="hover">
                Events
              </Link>
            </Box>
          </Grid>
          
          <Grid item xs={6} sm={3} md={2}>
            <Typography variant="h6" fontWeight="bold" gutterBottom>
              Categories
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              <Link component={RouterLink} to="/main/courses?category=development" color="primary" underline="hover">
                Development
              </Link>
              <Link component={RouterLink} to="/main/courses?category=business" color="primary" underline="hover">
                Business
              </Link>
              <Link component={RouterLink} to="/main/courses?category=design" color="primary" underline="hover">
                Design
              </Link>
              <Link component={RouterLink} to="/main/courses?category=marketing" color="primary" underline="hover">
                Marketing
              </Link>
            </Box>
          </Grid>
          
          <Grid item xs={6} sm={3} md={2}>
            <Typography variant="h6" fontWeight="bold" gutterBottom>
              Support
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              <Link component={RouterLink} to="/help" color="primary" underline="hover">
                Help Center
              </Link>
              <Link component={RouterLink} to="/faq" color="primary" underline="hover">
                FAQ
              </Link>
              <Link component={RouterLink} to="/main/contact" color="primary" underline="hover">
                Contact Us
              </Link>
              <Link component={RouterLink} to="/feedback" color="primary" underline="hover">
                Feedback
              </Link>
            </Box>
          </Grid>
          
          <Grid item xs={6} sm={3} md={2}>
            <Typography variant="h6" fontWeight="bold" gutterBottom>
              Legal
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              <Link component={RouterLink} to="/terms" color="primary" underline="hover">
                Terms of Service
              </Link>
              <Link component={RouterLink} to="/privacy" color="primary" underline="hover">
                Privacy Policy
              </Link>
              <Link component={RouterLink} to="/cookies" color="primary" underline="hover">
                Cookie Policy
              </Link>
              <Link component={RouterLink} to="/accessibility" color="primary" underline="hover">
                Accessibility
              </Link>
            </Box>
          </Grid>
        </Grid>
        
        <Divider sx={{ my: 4, borderColor: 'rgba(0,0,0,0.1)' }} />
        
        <Box sx={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 2 }}>
          <Typography variant="body2" sx={{ opacity: 0.7 }}>
            © {currentYear} Thuraa. All rights reserved.
          </Typography>
          <Box sx={{ display: 'flex', gap: 3 }}>
            <Link component={RouterLink} to="/terms" color="primary" underline="hover" sx={{ fontSize: '0.875rem' }}>
              Terms
            </Link>
            <Link component={RouterLink} to="/privacy" color="primary" underline="hover" sx={{ fontSize: '0.875rem' }}>
              Privacy
            </Link>
            <Link component={RouterLink} to="/cookies" color="primary" underline="hover" sx={{ fontSize: '0.875rem' }}>
              Cookies
            </Link>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
