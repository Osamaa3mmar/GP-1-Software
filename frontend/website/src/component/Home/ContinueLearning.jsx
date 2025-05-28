
import { Box, Typography, Grid, Paper, Button, LinearProgress, IconButton } from '@mui/material';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

// Static data for the courses
const coursesData = [
  {
    id: 1,
    title: "Data Science Fundamentals",
    instructor: "Emily Rodriguez",
    progress: 35,
    lessonsCompleted: 22,
    totalLessons: 64,
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop",
    saved: true,
    level: "Intermediate"
  },
  {
    id: 2,
    title: "Mobile App Development with Flutter",
    instructor: "David Kim",
    progress: 68,
    lessonsCompleted: 35,
    totalLessons: 52,
    image: "https://images.unsplash.com/photo-1555774698-0b77e0d5fac6?q=80&w=2070&auto=format&fit=crop",
    saved: false,
    level: "Intermediate"
  }
];

export default function ContinueLearning() {
  return (
    <Box sx={{ mt: 6, mb: 8 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h5" fontWeight={700}>
          Continue Learning
        </Typography>
        <Button 
          endIcon={<ArrowForwardIcon />} 
          sx={{ color: 'primary.main', fontWeight: 600 }}
        >
          View All
        </Button>
      </Box>
      
      <Grid container spacing={3}>
        {coursesData.map((course) => (
          <Grid item xs={12} sm={6} md={6} key={course.id}>
            <Paper 
              elevation={0} 
              sx={{ 
                borderRadius: 3, 
                overflow: 'hidden',
                border: '1px solid rgba(0, 0, 0, 0.06)',
                transition: 'all 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-5px)',
                  boxShadow: '0 10px 20px rgba(0, 0, 0, 0.08)'
                }
              }}
            >
              <Box sx={{ position: 'relative' }}>
                <Box 
                  component="img" 
                  src={course.image} 
                  alt={course.title}
                  sx={{ 
                    width: '100%', 
                    height: 180, 
                    objectFit: 'cover',
                    filter: 'brightness(0.9)'
                  }}
                />
                <Box 
                  sx={{ 
                    position: 'absolute', 
                    top: 12, 
                    right: 12,
                    bgcolor: 'rgba(255, 255, 255, 0.9)',
                    borderRadius: '50%',
                    width: 36,
                    height: 36,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  <IconButton size="small">
                    {course.saved ? 
                      <BookmarkIcon color="primary" /> : 
                      <BookmarkBorderIcon />
                    }
                  </IconButton>
                </Box>
                <Box 
                  sx={{ 
                    position: 'absolute', 
                    top: 12, 
                    left: 12,
                    bgcolor: 'rgba(255, 255, 255, 0.9)',
                    borderRadius: 4,
                    px: 1.5,
                    py: 0.5
                  }}
                >
                  <Typography variant="caption" fontWeight={600} color="primary.main">
                    {course.level}
                  </Typography>
                </Box>
              </Box>

              <Box sx={{ p: 3 }}>
                <Typography variant="h6" fontWeight={600} gutterBottom>
                  {course.title}
                </Typography>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  {course.instructor}
                </Typography>
                
                <Box sx={{ mt: 2, mb: 1 }}>
                  <LinearProgress 
                    variant="determinate" 
                    value={course.progress} 
                    sx={{
                      height: 8,
                      borderRadius: 4,
                      backgroundColor: 'rgba(0, 0, 0, 0.06)',
                      '& .MuiLinearProgress-bar': {
                        backgroundColor: course.progress < 50 ? '#6366f1' : '#22c55e',
                      }
                    }}
                  />
                </Box>
                
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                  <Typography variant="body2" color="text.secondary">
                    {course.progress}% Complete
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {course.lessonsCompleted} / {course.totalLessons} lessons
                  </Typography>
                </Box>
                
                <Button 
                  variant="contained" 
                  fullWidth
                  startIcon={<ArrowForwardIcon />}
                  sx={{ 
                    borderRadius: 6,
                    py: 1.2,
                    bgcolor: '#6366f1',
                    '&:hover': {
                      bgcolor: '#4f46e5'
                    }
                  }}
                >
                  Continue
                </Button>
              </Box>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
