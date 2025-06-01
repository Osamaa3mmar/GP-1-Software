import React, { useState } from 'react';
import { Box, Typography, Paper, Button, IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';

export default function Bio({ text, isEdit, onPress }) {
  const [expanded, setExpanded] = useState(false);
  const bioText = text || "No Bio Yet";
  const truncatedBio = text ? (expanded ? bioText : `${bioText.substring(0, 150)}...`) : bioText;
  const showReadMore = text && text.length > 150;

  return (
    <Box sx={{ p: 2 }}>
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        mb: 2 
      }}>
        <Typography variant="h5" sx={{ fontWeight: 700, color: '#333' }}>
          About Me
        </Typography>
        {isEdit && (
          <IconButton 
            onClick={() => onPress("bio")} 
            color="primary"
            sx={{ color: 'rgba(102, 94, 223, 1)' }}
          >
            <EditIcon />
          </IconButton>
        )}
      </Box>
      <Paper 
        elevation={1} 
        sx={{ 
          borderRadius: 3, 
          p: 3, 
          backgroundColor: 'white', 
          boxShadow: '0 2px 8px rgba(0,0,0,0.05)'
        }}
      >
        <Typography variant="body1" sx={{ fontSize: 16, lineHeight: 1.6, color: '#555' }}>
          {truncatedBio}
        </Typography>
        {showReadMore && (
          <Button 
            onClick={() => setExpanded(!expanded)} 
            sx={{ 
              mt: 2, 
              color: 'rgba(102, 94, 223, 1)', 
              fontWeight: 600,
              '&:hover': {
                backgroundColor: 'rgba(102, 94, 223, 0.08)'
              }
            }}
          >
            {expanded ? "Show Less" : "Read More"}
          </Button>
        )}
      </Paper>
    </Box>
  );
}
