import { 
  Paper, Typography, Box, Divider, Collapse 
} from '@mui/material';
import { ExpandLess, ExpandMore } from '@mui/icons-material';
import { useState } from 'react';

const CourseLearningPath = ({ learningPath }) => {
  const [expanded, setExpanded] = useState(true);
  const primaryColor = '#3f51b5'; // Primary color

  const toggleExpanded = () => setExpanded(!expanded);

  // Get the content as a single string
  const getContent = () => {
    if (!learningPath) return '';
    if (typeof learningPath === 'string') return learningPath;
    if (Array.isArray(learningPath)) {
      return learningPath.join('\n');
    }
    return '';
  };

  const content = getContent();

  return (
    <Paper 
      elevation={3} 
      sx={{ 
        p: 3, 
        my: 4, 
        borderRadius: 2,
        border: `1px solid ${primaryColor}20`,
        transition: 'all 0.3s ease',
        '&:hover': { boxShadow: 4 }
      }}
    >
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
        <Typography variant="h5" fontWeight="600" color={primaryColor}>
          Learning Path
        </Typography>
        {expanded ? <ExpandLess color="primary" /> : <ExpandMore color="primary" />}
      </Box>
      
      <Divider sx={{ mb: 3, borderColor: `${primaryColor}20` }} />
      
      <Collapse in={expanded} timeout="auto">
        <Box sx={{ 
          bgcolor: `${primaryColor}08`, 
          borderRadius: 2,
          p: 2
        }}>
          {content ? (
            <Typography 
              variant="body1" 
              sx={{ 
                fontWeight: 500, 
                lineHeight: 1.5,
                whiteSpace: 'pre-line'
              }}
            >
              {content}
            </Typography>
          ) : (
            <Typography variant="body1" color="text.secondary" sx={{ fontStyle: 'italic' }}>
              No learning path specified for this course.
            </Typography>
          )}
        </Box>
      </Collapse>
    </Paper>
  );
};

export default CourseLearningPath;