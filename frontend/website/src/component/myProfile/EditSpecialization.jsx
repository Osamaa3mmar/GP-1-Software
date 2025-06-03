import React, { useState } from 'react';
import { Box, TextField, Button } from '@mui/material';
import axios from 'axios';

export default function EditSpecialization({ update, onClose }) {
  const [specialization, setSpecialization] = useState('');
  const [loading, setLoading] = useState(false);
  
  const handleSubmit = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      await axios.post('http://localhost:4545/user/edit/specialization', { specialization }, {
        headers: { token }
      });
      update();
      onClose();
    } catch (error) {
      console.error('Error updating specialization:', error);
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <Box sx={{ p: 2 }}>
      <TextField
        fullWidth
        label="Your Specialization"
        placeholder="e.g. Web Development, Data Science, UI/UX Design"
        value={specialization}
        onChange={(e) => setSpecialization(e.target.value)}
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
