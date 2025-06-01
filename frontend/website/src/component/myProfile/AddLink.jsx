import React, { useState } from 'react';
import { Box, TextField, Button, MenuItem, InputAdornment } from '@mui/material';
import axios from 'axios';
import GitHubIcon from '@mui/icons-material/GitHub';
import FacebookIcon from '@mui/icons-material/Facebook';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import TwitterIcon from '@mui/icons-material/Twitter';
import YouTubeIcon from '@mui/icons-material/YouTube';
import LanguageIcon from '@mui/icons-material/Language';

export default function AddLink({ update, onClose }) {
  const [title, setTitle] = useState('');
  const [url, setUrl] = useState('');
  const [type, setType] = useState('');
  const [loading, setLoading] = useState(false);
  
  // Link types with their corresponding icons
  const linkTypes = [
    { value: 'github', label: 'GitHub', icon: <GitHubIcon /> },
    { value: 'linkedin', label: 'LinkedIn', icon: <LinkedInIcon /> },
    { value: 'facebook', label: 'Facebook', icon: <FacebookIcon /> },
    { value: 'twitter', label: 'Twitter', icon: <TwitterIcon /> },
    { value: 'youtube', label: 'YouTube', icon: <YouTubeIcon /> },
    { value: 'other', label: 'Other', icon: <LanguageIcon /> },
  ];
  
  const handleSubmit = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      await axios.post('http://localhost:4545/user/links', { 
        title, 
        url: url.startsWith('http') ? url : `https://${url}`,
        type 
      }, {
        headers: { token }
      });
      update();
      onClose();
    } catch (error) {
      console.error('Error adding link:', error);
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <Box sx={{ p: 2 }}>
      <TextField
        fullWidth
        label="Link Title"
        placeholder="e.g. My GitHub Profile"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        sx={{ mb: 2 }}
        variant="outlined"
      />
      
      <TextField
        select
        fullWidth
        label="Link Type"
        value={type}
        onChange={(e) => setType(e.target.value)}
        sx={{ mb: 2 }}
        variant="outlined"
      >
        {linkTypes.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Box sx={{ mr: 1 }}>{option.icon}</Box>
              {option.label}
            </Box>
          </MenuItem>
        ))}
      </TextField>
      
      <TextField
        fullWidth
        label="URL"
        placeholder="e.g. https://github.com/username"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        sx={{ mb: 2 }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <LanguageIcon fontSize="small" />
            </InputAdornment>
          ),
        }}
        variant="outlined"
      />
      
      <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
        <Button 
          onClick={onClose}
          sx={{ mr: 1 }}
          disabled={loading}
        >
          Cancel
        </Button>
        <Button 
          variant="contained" 
          onClick={handleSubmit}
          disabled={loading || !url.trim()}
          sx={{
            bgcolor: 'rgba(102, 94, 223, 1)',
            '&:hover': {
              bgcolor: 'rgba(102, 94, 223, 0.9)',
            }
          }}
        >
          Add Link
        </Button>
      </Box>
    </Box>
  );
}
