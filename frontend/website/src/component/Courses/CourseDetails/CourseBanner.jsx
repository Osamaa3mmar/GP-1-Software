import { Box, Typography, useTheme } from '@mui/material';

const CourseBanner = ({ course }) => {
  const theme = useTheme();
  return (
    <Box sx={{ 
      borderRadius: 2,
      overflow: 'hidden',
      boxShadow: 3,
      mb: 4,
      position: 'relative'
    }}>
      <img
        width="100%"
        height="450"
        src={course.backImage || course.thumbnail}
        alt={course.title}
        title={course.title}
        style={{ height: 450, objectFit: 'cover' }}
      />
      <Box sx={{ 
        position: 'absolute', 
        bottom: 0, 
        left: 0, 
        right: 0,
        p: 2,
        background: `linear-gradient(transparent, ${theme.palette.primary.main}cc)`,
        color: 'white'
      }}>
        <Typography variant="h4">{course.title}</Typography>
      </Box>
    </Box>
  );
};

export default CourseBanner;
