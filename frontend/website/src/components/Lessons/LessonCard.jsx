import React from 'react';
import {
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Typography,
  Box,
  Chip,
  Tooltip,
  Divider,
  useTheme
} from '@mui/material';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import MoreVertIcon from '@mui/icons-material/MoreVert';

const LessonCard = ({ 
  lesson, 
  index, 
  isLast, 
  allowEdit, 
  onNavigate, 
  onMenuOpen 
}) => {
  const theme = useTheme();
  
  // Format date for display
  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  return (
    <>
      <ListItem 
        button 
        onClick={() => onNavigate(lesson.id)}
        sx={{ 
          py: 2,
          '&:hover': { bgcolor: 'action.hover' },
          transition: 'background-color 0.2s ease',
        }}
      >
        <ListItemIcon>
          <Box 
            sx={{ 
              width: 40, 
              height: 40, 
              borderRadius: '50%', 
              bgcolor: 'primary.main', 
              color: 'white',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 'bold',
              boxShadow: theme.shadows[2]
            }}
          >
            {index + 1}
          </Box>
        </ListItemIcon>
        <ListItemText
          primary={
            <Typography variant="subtitle1" fontWeight="medium">
              {lesson.title || 'Untitled Lesson'}
            </Typography>
          }
          secondary={
            <Box sx={{ display: 'flex', alignItems: 'center', mt: 0.5, flexWrap: 'wrap' }}>
              <Chip 
                label={lesson.type || 'Video'} 
                size="small" 
                color="primary" 
                variant="outlined"
                sx={{ mr: 1, mb: { xs: 0.5, sm: 0 } }}
              />
              <Typography variant="body2" color="text.secondary">
                {lesson.duration || '00:00'} • {formatDate(lesson.createdAt || Date.now())}
              </Typography>
            </Box>
          }
        />
        
        <ListItemSecondaryAction>
          {allowEdit ? (
            <IconButton edge="end" onClick={(e) => onMenuOpen(e, lesson.id)}>
              <MoreVertIcon />
            </IconButton>
          ) : (
            <Tooltip title="Start Lesson">
              <IconButton edge="end" color="primary" onClick={() => onNavigate(lesson.id)}>
                <PlayCircleOutlineIcon />
              </IconButton>
            </Tooltip>
          )}
        </ListItemSecondaryAction>
      </ListItem>
      {!isLast && <Divider component="li" />}
    </>
  );
};

export default LessonCard;
