import { Paper, Typography, Box, Avatar, Chip, Button } from '@mui/material';
import { Person } from '@mui/icons-material';

const CourseInstructor = ({ teacher }) => {
  if (!teacher) return null;
  
  return (
    <Paper elevation={2} sx={{ p: 3, my: 4 }}>
      <Typography variant="h5" gutterBottom>Instructor</Typography>
      <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, gap: 3 }}>
        {/* Teacher Avatar */}
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <Avatar 
            src={teacher.profilePic} 
            sx={{ width: 120, height: 120, mb: 1 }}
          >
            <Person fontSize="large" />
          </Avatar>
          <Typography variant="h6" align="center">{teacher.username || "Instructor Name"}</Typography>
          <Typography variant="body2" color="text.secondary" align="center">
            {teacher.specialization || "Instructor"}
          </Typography>
        </Box>
        
        {/* Teacher Details */}
        <Box sx={{ flex: 1 }}>
          {teacher.bio && (
            <Box sx={{ mb: 2 }}>
              <Typography variant="subtitle1" fontWeight="bold" gutterBottom>About</Typography>
              <Typography variant="body2">{teacher.bio}</Typography>
            </Box>
          )}
          
          {/* Contact Information */}
          <Box sx={{ mb: 2 }}>
            <Typography variant="subtitle1" fontWeight="bold" gutterBottom>Contact</Typography>
            <Typography variant="body2">
              {teacher.email}
            </Typography>
          </Box>
          
          {/* Expertise Areas */}
          {teacher.interests && typeof teacher.interests === 'object' && (
            <Box sx={{ mb: 2 }}>
              <Typography variant="subtitle1" fontWeight="bold" gutterBottom>Areas of Expertise</Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                {teacher.interests.topics && Array.isArray(teacher.interests.topics) && 
                  teacher.interests.topics.map((topic, idx) => (
                    <Chip key={idx} label={topic} size="small" color="primary" variant="outlined" />
                  ))
                }
                {teacher.interests.categories && Array.isArray(teacher.interests.categories) && 
                  teacher.interests.categories.map((category, idx) => (
                    <Chip key={idx} label={category} size="small" color="secondary" variant="outlined" />
                  ))
                }
              </Box>
            </Box>
          )}
          
          {/* Professional Links */}
          {teacher.links && typeof teacher.links === 'object' && (
            <Box>
              <Typography variant="subtitle1" fontWeight="bold" gutterBottom>Professional Links</Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                {Object.entries(teacher.links).map(([platform, url], idx) => (
                  url && (
                    <Button 
                      key={idx} 
                      variant="outlined" 
                      size="small" 
                      href={url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                    >
                      {platform}
                    </Button>
                  )
                ))}
              </Box>
            </Box>
          )}
        </Box>
      </Box>
    </Paper>
  );
};

export default CourseInstructor;
