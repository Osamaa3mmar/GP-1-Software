import { useState } from 'react';
import { Box, TextField, Button, Typography, Alert } from '@mui/material';
import axios from 'axios';

export default function EditName({ update, onClose }) {
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const handleSubmit = async () => {
    if (!name.trim()) {
      setError('Name cannot be empty');
      return;
    }
    
    try {
      setLoading(true);
      setError('');
      const token = localStorage.getItem('token');
      
      await axios.put('http://localhost:4545/user/profile', { name }, {
        headers: { token }
      });
      
      update();
      onClose();
    } catch (error) {
      console.error('Error updating name:', error);
      setError(error.response?.data?.message || 'Failed to update name. Please try again.');
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <Box sx={{ p: 2 }}>
      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}
      
      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
        Enter your new display name
      </Typography>
      
      <TextField
        fullWidth
        label="Display Name"
        placeholder="Enter your name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        sx={{ mb: 3 }}
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
