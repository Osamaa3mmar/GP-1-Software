import { 
  Paper, Typography, Box, Divider, Collapse 
} from '@mui/material';
import { ExpandLess, ExpandMore } from '@mui/icons-material';
import { useState } from 'react';

const CourseLearningOutcomes = ({ learningOutcomes }) => {
  const [expanded, setExpanded] = useState(true);
  const primaryColor = '#3f51b5'; // Primary color

  const toggleExpanded = () => setExpanded(!expanded);

  // Get the content as a single string
  const getContent = () => {
    if (!learningOutcomes) return '';
    if (typeof learningOutcomes === 'string') return learningOutcomes;
    if (Array.isArray(learningOutcomes)) {
      return learningOutcomes.join('\n');
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
          Learning Outcomes
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
              No learning outcomes specified for this course.
            </Typography>
          )}
        </Box>
      </Collapse>
    </Paper>
  );
};

export default CourseLearningOutcomes;