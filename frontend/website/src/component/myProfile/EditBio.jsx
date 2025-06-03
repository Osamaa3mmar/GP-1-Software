import React, { useState } from 'react';
import { Box, TextField, Button } from '@mui/material';
import axios from 'axios';

export default function EditBio({ update, onClose }) {
  const [bio, setBio] = useState('');
  const [loading, setLoading] = useState(false);
  
  const handleSubmit = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      await axios.post('http://localhost:4545/user/edit/bio', { bio }, {
        headers: { token }
      });
      update();
      onClose();
    } catch (error) {
      console.error('Error updating bio:', error);
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <Box sx={{ p: 2 }}>
      <TextField
        multiline
        rows={6}
        fullWidth
        placeholder="Write something about yourself..."
        value={bio}
        onChange={(e) => setBio(e.target.value)}
        sx={{ mb: 2 }}
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
          disabled={loading}
          sx={{
            bgcolor: 'rgba(102, 94, 223, 1)',
            '&:hover': {
              bgcolor: 'rgba(102, 94, 223, 0.9)',
            }
          }}
        >
          Save
        </Button>
      </Box>
    </Box>
  );
}
