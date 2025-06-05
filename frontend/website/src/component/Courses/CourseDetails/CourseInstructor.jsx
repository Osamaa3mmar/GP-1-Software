import { Paper, Typography, Box, Avatar, Chip, Divider, Badge } from '@mui/material';
import { Person, School, Verified, ArrowForward } from '@mui/icons-material';
import { Link } from 'react-router-dom';

const CourseInstructor = ({ instructor }) => {
  if (!instructor) return null;
  console.log(instructor,"osama")
  return (
    <Paper 
      elevation={3} 
      sx={{ 
        p: 3, 
        my: 4, 
        borderRadius: 2,
        border: '1px solid #e0e0e0',
        transition: 'all 0.3s ease',
        '&:hover': {
          boxShadow: 6,
          borderColor: 'primary.light'
        }
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
        <School color="primary" sx={{ mr: 1 }} />
        <Typography 
          variant="h5" 
          fontWeight="600" 
          color="primary"
        >
          Course Instructor
        </Typography>
      </Box>
      
      <Divider sx={{ mb: 3 }} />
      
      {/* Instructor Information - Clickable */}
      <Link 
        to={`/main/instructor/profile/${instructor.id}`}
        style={{ textDecoration: 'none', color: 'inherit' }}
      >
        <Box 
          sx={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: 3,
            p: 2,
            borderRadius: 2,
            border: '1px solid transparent',
            transition: 'all 0.2s ease',
            '&:hover': { 
              bgcolor: 'rgba(25, 118, 210, 0.04)', 
              borderColor: 'primary.light',
              transform: 'translateY(-2px)',
              cursor: 'pointer' 
            },
          }}
        >
          {/* Instructor Avatar */}
          <Badge
            overlap="circular"
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            badgeContent={
              <Avatar
                sx={{ width: 22, height: 22, bgcolor: 'primary.main', border: '2px solid white' }}
              >
                <Verified sx={{ fontSize: 14 }} />
              </Avatar>
            }
          >
            {instructor.profilePic ? (
              <Avatar 
                src={instructor.profilePic}
                alt={instructor.username}
                sx={{ 
                  width: 110, 
                  height: 110,
                  border: '3px solid #e3f2fd',
                  boxShadow: '0 4px 8px rgba(0,0,0,0.1)'
                }}
              />
            ) : (
              <Avatar 
                sx={{ 
                  width: 110, 
                  height: 110, 
                  bgcolor: 'primary.main',
                  border: '3px solid #e3f2fd',
                  boxShadow: '0 4px 8px rgba(0,0,0,0.1)'
                }}
              >
                <Person fontSize="large" />
              </Avatar>
            )}
          </Badge>
          
          {/* Instructor Details - Only Username and Specialization */}
          <Box sx={{ flex: 1 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 0.5 }}>
              <Typography variant="h6" fontWeight="600">{instructor.username}</Typography>
              <Chip 
                label="Instructor" 
                size="small" 
                color="primary" 
                variant="outlined"
                sx={{ ml: 2, px: 1 }}
              />
            </Box>
            
            {instructor.specialization && (
              <Typography 
                variant="body2" 
                color="text.secondary"
                sx={{ 
                  mb: 1,
                  bgcolor: 'rgba(25, 118, 210, 0.08)',
                  display: 'inline-block',
                  px: 1.5,
                  py: 0.5,
                  borderRadius: 10,
                  fontWeight: 500
                }}
              >
                {instructor.specialization}
              </Typography>
            )}
            
            <Box sx={{ 
              display: 'flex', 
              alignItems: 'center', 
              color: 'primary.main',
              fontWeight: 'medium',
              mt: 1,
              '& svg': { transition: 'transform 0.2s ease' },
              '&:hover svg': { transform: 'translateX(3px)' }
            }}>
              <Typography variant="body2" fontWeight="500" color="primary.main">
                View Instructor Profile
              </Typography>
              <ArrowForward fontSize="small" sx={{ ml: 0.5 }} />
            </Box>
          </Box>
        </Box>
      </Link>
    </Paper>
  );
};

export default CourseInstructor;
