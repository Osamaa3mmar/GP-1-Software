import { Box, Typography, Paper } from '@mui/material';

const CourseHeader = ({ title, subtitle }) => {
  return (
    <Paper
      elevation={3}
      sx={{
        textAlign: 'center',
        marginBottom: '2rem',
        padding: '2rem 1rem',
        backgroundColor: '#4a90e2',
        color: 'white',
        borderRadius: '10px',
        boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
      }}
    >
      <Typography 
        variant="h3" 
        component="h1"
        sx={{
          fontSize: { xs: '1.8rem', sm: '2.2rem', md: '2.5rem' },
          marginBottom: '0.8rem',
          fontWeight: 700,
        }}
      >
        {title}
      </Typography>
      <Typography 
        variant="subtitle1"
        sx={{
          fontSize: '1.1rem',
          opacity: 0.9,
          maxWidth: '700px',
          margin: '0 auto',
        }}
      >
        {subtitle}
      </Typography>
    </Paper>
  );
};

export default CourseHeader;
