import { 
  Paper,
  Typography, 
  Box, 
  Divider,
  Collapse,
  List,
  ListItem,
  ListItemIcon,
  ListItemText
} from '@mui/material';
import { ExpandLess, ExpandMore, Check } from '@mui/icons-material';
import { useState } from 'react';

const CourseDescription = ({ course, courseTags }) => {
  const [expanded, setExpanded] = useState(true);
  const primaryColor = '#3f51b5'; // Primary color

  const toggleExpanded = () => {
    setExpanded(!expanded);
  };

  return (
    <Paper 
      elevation={3} 
      sx={{ 
        p: 3, 
        my: 4, 
        borderRadius: 2,
        border: `1px solid ${primaryColor}20`,
        transition: 'all 0.3s ease',
        '&:hover': {
          boxShadow: 4
        }
      }}
    >
      {/* Header with toggle */}
      <Box 
        onClick={toggleExpanded}
        sx={{ 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'space-between',
          cursor: 'pointer',
          mb: 2
        }}
      >
        <Typography 
          variant="h5" 
          fontWeight="600" 
          color={primaryColor}
        >
          Course Description
        </Typography>
        {expanded ? <ExpandLess color="primary" /> : <ExpandMore color="primary" />}
      </Box>
      
      <Divider sx={{ mb: 3, borderColor: `${primaryColor}20` }} />
      
      {/* Content */}
      <Collapse in={expanded} timeout="auto">
        <Box sx={{ 
          px: 2, 
          py: 1.5, 
          bgcolor: `${primaryColor}08`, 
          borderRadius: 2,
          mb: 3
        }}>
          <Typography 
            variant="body1" 
            sx={{ 
              fontWeight: 500, 
              lineHeight: 1.5,
              whiteSpace: 'pre-line'
            }}
          >
            {course.description || "No description available."}
          </Typography>
        </Box>
        
        {/* Requirements section */}
        {courseTags && courseTags.requirements && Array.isArray(courseTags.requirements) && courseTags.requirements.length > 0 && (
          <Box sx={{ mt: 3 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <Check fontSize="small" sx={{ color: primaryColor, mr: 1 }} />
              <Typography variant="h6" fontWeight="600" color={primaryColor}>
                Requirements
              </Typography>
            </Box>
            
            <List sx={{ 
              bgcolor: `${primaryColor}08`, 
              borderRadius: 2,
              py: 1
            }}>
              {courseTags.requirements.map((req, i) => (
                <ListItem 
                  key={i} 
                  sx={{ 
                    py: 1,
                    borderBottom: i < courseTags.requirements.length - 1 
                      ? `1px dashed ${primaryColor}20` 
                      : 'none',
                    transition: 'background-color 0.2s',
                    '&:hover': {
                      bgcolor: `${primaryColor}12`
                    }
                  }}
                >
                  <ListItemIcon>
                    <Check 
                      sx={{ 
                        color: primaryColor,
                        bgcolor: `${primaryColor}12`,
                        borderRadius: '50%',
                        p: 0.5,
                        boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
                      }} 
                    />
                  </ListItemIcon>
                  <ListItemText 
                    primary={req}
                    primaryTypographyProps={{
                      fontWeight: 500,
                      sx: { lineHeight: 1.5 }
                    }}
                  />
                </ListItem>
              ))}
            </List>
          </Box>
        )}
      </Collapse>
    </Paper>
  );
};

export default CourseDescription;