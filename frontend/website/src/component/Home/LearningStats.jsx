
import { Box, Typography, Grid, Paper, Stack } from '@mui/material';

// Static data for the stats cards
const statsData = [
  {
    title: "Courses in Progress",
    value: "3",
    color: "#6366f1",
    subtext: "2 courses updated recently"
  },
  {
    title: "Completed Courses",
    value: "7",
    color: "#22c55e",
    subtext: "Certificates available: 5"
  },
  {
    title: "Hours Learned",
    value: "42",
    color: "#ec4899",
    subtext: "This month: 12 hours"
  },
  {
    title: "Achievement Points",
    value: "850",
    color: "#f97316",
    subtext: "Rank: Gold Scholar"
  }
];

export default function LearningStats() {
  return (
    <Box sx={{ mb: 4 }}>
      <Typography variant="h4" fontWeight={700} mb={3}>
        Welcome back, John!
      </Typography>
      
      <Typography variant="body1" color="text.secondary" mb={4}>
        Continue your learning journey and explore new courses.
      </Typography>
      
      <Grid container spacing={2}>
        {statsData.map((stat, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Paper 
              elevation={0} 
              sx={{ 
                p: 3, 
                borderRadius: 3, 
                height: '100%',
                backgroundColor: 'rgba(255, 255, 255, 0.9)',
                border: '1px solid rgba(0, 0, 0, 0.06)'
              }}
            >
              <Stack spacing={1}>
                <Typography variant="body1" fontWeight={500} color="text.secondary">
                  {stat.title}
                </Typography>
                <Typography 
                  variant="h2" 
                  fontWeight={700} 
                  sx={{ color: stat.color }}
                >
                  {stat.value}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {stat.subtext}
                </Typography>
              </Stack>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
