import PropTypes from 'prop-types';
import { Box, Grid, Typography } from '@mui/material';

export default function CourseSchedule({ schedule }) {
  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const formatTime = (time) => {
    const [hours, minutes] = time.split(':').map(Number);
    const period = hours >= 12 ? 'PM' : 'AM';
    const formattedHours = hours % 12 || 12;
    return `${formattedHours}${minutes > 0 ? `:${minutes.toString().padStart(2, '0')}` : ''} ${period}`;
  };

  return (
    <Grid container spacing={0} sx={{ border: 1, borderColor: 'divider', borderRadius: 1 }}>
      {daysOfWeek.map((day) => {
        const scheduleItem = schedule.find((item) => item.day === day);
        const shortDay = day.substring(0, 3);

        return (
          <Grid item xs={12 / 7} key={day} sx={{ textAlign: 'center' }}>
            <Box
              sx={{
                p: 1,
                bgcolor: scheduleItem ? 'primary.light' : 'background.default',
                borderRight: 1,
                borderColor: 'divider',
                minHeight: 100,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center'
              }}
            >
              <Typography variant="caption" sx={{ fontWeight: 'bold', mb: 0.5 }}>
                {shortDay}
              </Typography>
              {scheduleItem ? (
                <>
                  <Typography variant="caption" display="block">
                    {formatTime(scheduleItem.startTime)}
                  </Typography>
                  <Typography variant="caption" color="text.secondary" display="block">
                    to
                  </Typography>
                  <Typography variant="caption" display="block">
                    {formatTime(scheduleItem.endTime)}
                  </Typography>
                </>
              ) : (
                <Typography variant="caption" color="text.disabled">
                  -
                </Typography>
              )}
            </Box>
          </Grid>
        );
      })}
    </Grid>
  );
}

CourseSchedule.propTypes = {
  schedule: PropTypes.arrayOf(
    PropTypes.shape({
      day: PropTypes.string.isRequired,
      startTime: PropTypes.string.isRequired,
      endTime: PropTypes.string.isRequired
    })
  ).isRequired
};