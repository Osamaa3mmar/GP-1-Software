import { Box, Grid, Typography, Paper, CircularProgress } from '@mui/material';
import CourseCard from '../Courses/CourseCard';

const CourseList = ({ courses, isLoading }) => {
  return (
    <Grid container spacing={3}>
      {isLoading ? (
        <Grid item xs={12}>
          <Paper 
            elevation={2}
            sx={{
              gridColumn: '1 / -1',
              textAlign: 'center',
              padding: '4rem 2rem',
              backgroundColor: 'white',
              borderRadius: '10px',
            }}
          >
            <CircularProgress size={40} sx={{ color: '#4a90e2' }} />
            <Typography variant="h6" sx={{ mt: 2 }}>Loading...</Typography>
          </Paper>
        </Grid>
      ) : courses.length > 0 ? (
        courses.map((course) => (
          <Grid item xs={12} sm={6} md={4} lg={4} key={course.id}>
            <CourseCard course={course} />
          </Grid>
        ))
      ) : (
        <Grid item xs={12}>
          <Paper 
            elevation={2}
            sx={{
              gridColumn: '1 / -1',
              textAlign: 'center',
              padding: '4rem 2rem',
              backgroundColor: 'white',
              borderRadius: '10px',
            }}
          >
            <Typography 
              variant="h5" 
              component="h3"
              sx={{
                fontSize: '1.5rem',
                marginBottom: '0.8rem',
                color: '#333',
              }}
            >
              No courses found
            </Typography>
            <Typography variant="body1" sx={{ color: '#666' }}>
              Try adjusting your filters or search query
            </Typography>
          </Paper>
        </Grid>
      )}
    </Grid>
  );
};

export default CourseList;
