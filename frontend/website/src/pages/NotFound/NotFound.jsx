import React from 'react';
import { Box, Button, Container, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';

export default function NotFound() {
  return (
    <Container maxWidth="md">
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '70vh',
          textAlign: 'center',
          py: 5
        }}
      >
        <ErrorOutlineIcon sx={{ fontSize: 100, color: 'primary.main', mb: 2 }} />
        <Typography variant="h1" component="h1" sx={{ mb: 2, fontSize: { xs: '4rem', md: '6rem' } }}>
          404
        </Typography>
        <Typography variant="h4" component="h2" sx={{ mb: 3 }}>
          Page Not Found
        </Typography>
        <Typography variant="body1" sx={{ mb: 4, maxWidth: '600px' }}>
          The page you are looking for might have been removed, had its name changed, 
          or is temporarily unavailable.
        </Typography>
        <Button 
          component={Link} 
          to="/main" 
          variant="contained" 
          color="primary" 
          size="large"
          sx={{ px: 4, py: 1 }}
        >
          Back to Home
        </Button>
      </Box>
    </Container>
  );
}
