import { Paper, Typography, Grid, Box } from '@mui/material';
import { Event, AccessTime, EmojiEvents } from '@mui/icons-material';

const CourseScheduleInfo = ({ course, formatDate }) => {
  return (
    <Paper elevation={2} sx={{ p: 3, mb: 4 }}>
      <Typography variant="h5" gutterBottom>Course Schedule</Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Event sx={{ mr: 1, color: 'primary.main' }} />
            <Typography variant="body1">
              <strong>Start Date:</strong> {formatDate(course.startDate)}
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Event sx={{ mr: 1, color: 'primary.main' }} />
            <Typography variant="body1">
              <strong>End Date:</strong> {formatDate(course.endDate)}
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <AccessTime sx={{ mr: 1, color: 'primary.main' }} />
            <Typography variant="body1">
              <strong>Duration:</strong> {course.duration} weeks
            </Typography>
          </Box>
        </Grid>
        {course.certification && (
          <Grid item xs={12} sm={6}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <EmojiEvents sx={{ mr: 1, color: 'primary.main' }} />
              <Typography variant="body1">
                <strong>Certification:</strong> Available
              </Typography>
            </Box>
          </Grid>
        )}
      </Grid>
    </Paper>
  );
};

export default CourseScheduleInfo;
