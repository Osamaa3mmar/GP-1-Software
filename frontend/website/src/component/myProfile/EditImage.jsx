import React, { useState } from 'react';
import { Box, Button, Avatar } from '@mui/material';
import axios from 'axios';

export default function EditImage({ update,onUpload, onClose }) {
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleUpload = async () => {
    if (!image) return;
    try {
      setLoading(true);
      // Replace this with your actual upload logic
      const formData = new FormData();
      formData.append("image", image);

      const token = localStorage.getItem('token');
      await axios.post("http://localhost:4545/user/upload/image", formData, {
        headers: { token, "Content-Type": "multipart/form-data" }
      });
      update();
      
      if (onUpload) onUpload(image);
      if (onClose) onClose();
    } catch (error) {
      console.error("Upload failed:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ p: 2, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      {/* Image Preview Square */}
      <Box
        sx={{
          width: 150,
          height: 150,
          borderRadius: 2,
          border: '2px dashed #aaa',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          mb: 2,
          overflow: 'hidden',
          bgcolor: '#f5f5f5',
        }}
      >
        {preview ? (
          <img src={preview} alt="preview" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        ) : (
          <Avatar sx={{ width: 60, height: 60 }} />
        )}
      </Box>

      {/* File Input */}
      <Button
        variant="outlined"
        component="label"
        sx={{ mb: 2 }}
      >
        Select Image
        <input
          type="file"
          hidden
          accept="image/*"
          onChange={handleImageChange}
        />
      </Button>

      {/* Action Buttons */}
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', width: '100%' }}>
        <Button
          onClick={onClose}
          sx={{ mr: 1 }}
          disabled={loading}
        >
          Cancel
        </Button>
        <Button
          variant="contained"
          onClick={handleUpload}
          disabled={!image || loading}
          sx={{
            bgcolor: 'rgba(102, 94, 223, 1)',
            '&:hover': {
              bgcolor: 'rgba(102, 94, 223, 0.9)',
            }
          }}
        >
          Upload
        </Button>
      </Box>
    </Box>
  );
}
