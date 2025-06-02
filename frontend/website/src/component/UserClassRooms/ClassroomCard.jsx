import { Box, Card, CardMedia, CardContent, Button, Typography, LinearProgress, Chip, Avatar, useTheme } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';

export default function ClassroomCard({ course, isTeaching = false }) {
  const navigate = useNavigate();
  const theme = useTheme();
  const [isLoaded, setIsLoaded] = useState(false);
  
  // Extract course data
  const courseData = course?.course || {};
  const progress = course?.progress || 0;
  const teacher = courseData?.teacher || {};
  
  // Format date for display
  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };
  
  // Get initials for avatar
  const getInitials = (name) => {
    if (!name) return '?';
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  const handleCardClick = () => {
    navigate(`/main/classrooms/${courseData?.id}/lessons`);
  };
  
  // Animation effect on load
  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <Box
      className={isLoaded ? 'card-loaded' : ''}
      sx={{
        m: 3,
        position: 'relative',
        height: '100%',
        opacity: 0,
        transform: 'translateY(20px)',
        transition: 'opacity 0.5s ease, transform 0.5s ease',
        '&.card-loaded': {
          opacity: 1,
          transform: 'translateY(0)',
        }
      }}
    >
      <Card
        sx={{
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
          borderRadius: 3,
          boxShadow: theme.shadows[3],
          position: 'relative',
          transition: 'transform 0.3s ease, box-shadow 0.3s ease',
          '&:hover': {
            transform: 'translateY(-8px)',
            boxShadow: theme.shadows[10],
          }
        }}
      >
        {/* Progress indicator */}
        <Box sx={{ position: 'absolute', top: 0, left: 0, right: 0, zIndex: 2 }}>
          <LinearProgress 
            variant="determinate" 
            value={progress} 
            sx={{ 
              height: 6, 
              '& .MuiLinearProgress-bar': {
                backgroundColor: progress >= 70 ? theme.palette.success.main : theme.palette.primary.main
              }
            }} 
          />
        </Box>
        
        {/* Course image with overlay gradient */}
        <Box sx={{ position: 'relative' }}>
          <CardMedia
            component="img"
            height="180"
            image={courseData?.thumbnail || 'https://via.placeholder.com/400x200'}
            alt={courseData?.title}
            sx={{ 
              objectFit: 'cover',
            }}
          />
          <Box
            sx={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              height: '50%',
              background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0) 100%)',
              display: 'flex',
              alignItems: 'flex-end',
              p: 2,
            }}
          >
            <Chip
              label={courseData?.tags?.topics?.[0] || 'Course'}
              color="primary"
              size="small"
              sx={{ 
                fontWeight: 'bold',
                backdropFilter: 'blur(5px)',
                backgroundColor: 'rgba(25, 118, 210, 0.8)',
              }}
            />
            
            {isTeaching && (
              <Chip
                label="Teaching"
                color="success"
                size="small"
                sx={{ 
                  ml: 1,
                  fontWeight: 'bold',
                  backdropFilter: 'blur(5px)',
                  backgroundColor: 'rgba(46, 125, 50, 0.8)',
                }}
              />
            )}
            
            {courseData?.certification && (
              <Chip
                icon={<EmojiEventsIcon />}
                label="Certificate"
                color="secondary"
                size="small"
                sx={{ 
                  ml: 1,
                  fontWeight: 'bold',
                  backdropFilter: 'blur(5px)',
                  backgroundColor: 'rgba(156, 39, 176, 0.8)',
                }}
              />
            )}
          </Box>
        </Box>
        
        <CardContent
          sx={{
            flexGrow: 1,
            display: 'flex',
            flexDirection: 'column',
            p: 3,
          }}
        >
          {/* Course title */}
          <Typography 
            variant="h6" 
            component="h2" 
            gutterBottom
            sx={{ 
              fontWeight: 'bold',
              display: '-webkit-box',
              overflow: 'hidden',
              WebkitBoxOrient: 'vertical',
              WebkitLineClamp: 2,
              lineHeight: 1.3,
              height: '2.6em',
            }}
          >
            {courseData?.title}
          </Typography>
          
          {/* Teacher info */}
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <Avatar 
              sx={{ 
                width: 36, 
                height: 36, 
                bgcolor: theme.palette.primary.main,
                mr: 1.5,
              }}
            >
              {getInitials(teacher?.username)}
            </Avatar>
            <Box>
              <Typography variant="body2" fontWeight="medium">
                {teacher?.username || 'Instructor'}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                {teacher?.specialization || 'Teacher'}
              </Typography>
            </Box>
          </Box>
          
          {/* Course info */}
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <AccessTimeIcon fontSize="small" color="action" sx={{ mr: 0.5 }} />
              <Typography variant="body2" color="text.secondary">
                {courseData?.duration || 0} {courseData?.duration === 1 ? 'hour' : 'hours'}
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <CalendarTodayIcon fontSize="small" color="action" sx={{ mr: 0.5 }} />
              <Typography variant="body2" color="text.secondary">
                {formatDate(courseData?.startDate)}
              </Typography>
            </Box>
          </Box>
          
          {/* Progress indicator or teaching status */}
          <Box sx={{ mt: 'auto' }}>
            {isTeaching ? (
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                <Typography variant="body2" fontWeight="medium">
                  Status
                </Typography>
                <Typography variant="body2" color="success.main" fontWeight="bold">
                  Teaching
                </Typography>
              </Box>
            ) : (
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                <Typography variant="body2" fontWeight="medium">
                  Progress
                </Typography>
                <Typography variant="body2" color={progress >= 70 ? 'success.main' : 'primary.main'} fontWeight="bold">
                  {progress}%
                </Typography>
              </Box>
            )}
            
            <Button
              variant="contained"
              fullWidth
              sx={{
                mt: 2,
                py: 1.2,
                borderRadius: 2,
                textTransform: 'none',
                fontWeight: 'bold',
                boxShadow: theme.shadows[2],
                background: theme.palette.primary.main,
                '&:hover': {
                  background: theme.palette.primary.dark,
                  transform: 'translateY(-2px)',
                  boxShadow: theme.shadows[4],
                },
                transition: 'all 0.3s ease',
              }}
              onClick={handleCardClick}
            >
              {isTeaching ? 'Manage Course' : 'Continue Learning'}
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}
