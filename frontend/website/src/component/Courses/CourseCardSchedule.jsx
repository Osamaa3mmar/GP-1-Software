import { Box, Typography, Stack, Divider, useTheme } from '@mui/material';
import { CheckCircle, Schedule, CalendarMonth } from '@mui/icons-material';
import PropTypes from 'prop-types';

const CourseSchedule = ({ schedule = {} }) => {
  const theme = useTheme();
  const safeSchedule = {
    days: schedule.days || [],
    time: schedule.time || 'TBD',
    duration: schedule.duration || 'TBD',
    frequency: schedule.frequency || 'TBD'
  };

  return (
    <Box sx={{ mt: 3 }}>
      <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 3 }}>
        <CalendarMonth fontSize="small" />
        <Typography variant="subtitle1" fontWeight="600">
          Class Schedule
        </Typography>
      </Stack>

      <Stack direction="row" spacing={2} sx={{ mb: 2, px: 2, py: 1, 
        backgroundColor: theme.palette.action.hover, borderRadius: '4px' }}>
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
          <Box key={day} sx={{ 
            width: 56, 
            textAlign: 'center',
            color: safeSchedule.days.includes(day) ? 
              theme.palette.primary.main : 
              theme.palette.text.secondary
          }}>
            <Typography variant="overline">{day}</Typography>
          </Box>
        ))}
      </Stack>

      <Stack direction="row" alignItems="center" spacing={2} sx={{
        p: 2,
        border: `1px solid ${theme.palette.divider}`,
        borderRadius: '8px',
        position: 'relative',
        '&:hover': { backgroundColor: theme.palette.action.hover }
      }}>
        <Box sx={{
          position: 'absolute',
          left: -8,
          top: '50%',
          transform: 'translateY(-50%)',
          width: 16,
          height: 16,
          borderRadius: '2px',
          backgroundColor: theme.palette.primary.main
        }}/>

        <Stack spacing={0.5} sx={{ minWidth: 120 }}>
          <Typography variant="body2" fontWeight="500">
            {safeSchedule.time}
          </Typography>
          <Stack direction="row" spacing={1} alignItems="center">
            <Schedule fontSize="small" />
            <Typography variant="caption">
              {safeSchedule.duration} • {safeSchedule.frequency}
            </Typography>
          </Stack>
        </Stack>

        <Divider orientation="vertical" flexItem />

        <Stack direction="row" spacing={2} sx={{ flexGrow: 1 }}>
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
            <Box key={day} sx={{ width: 56, textAlign: 'center', position: 'relative' }}>
              {safeSchedule.days.includes(day) && (
                <CheckCircle fontSize="small" sx={{ 
                  color: theme.palette.success.main,
                  position: 'absolute',
                  top: -18,
                  left: '50%',
                  transform: 'translateX(-50%)'
                }} />
              )}
              <Box sx={{
                height: 8,
                borderRadius: 4,
                backgroundColor: safeSchedule.days.includes(day) ? 
                  theme.palette.primary.main : 
                  'transparent',
                mb: 1
              }}/>
            </Box>
          ))}
        </Stack>
      </Stack>
    </Box>
  );
};

CourseSchedule.propTypes = {
  schedule: PropTypes.shape({
    days: PropTypes.arrayOf(PropTypes.string),
    time: PropTypes.string,
    duration: PropTypes.string,
    frequency: PropTypes.string
  })
};

export default CourseSchedule;