import React, { useState } from 'react';
import { Box, Button, Typography } from '@mui/material';
import axios from 'axios';
import { toast } from 'react-toastify';
export default function EditResume({ update, onClose }) {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile && /\.(pdf|doc|docx)$/i.test(selectedFile.name)) {
      setFile(selectedFile);
    } else {
      alert("Please select a PDF or Word document.");
      e.target.value = null; // Reset file input
    }
  };

  const handleUpload = async () => {
    if (!file) return;

    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("resume", file);

      const token = localStorage.getItem('token');
      await axios.post("http://localhost:4545/user/upload/resume", formData, {
        headers: { token, "Content-Type": "multipart/form-data" }
      });

      toast.success("Resume uploaded successfully!");
      update();
      
      if (onClose) onClose();
    } catch (error) {
      console.error("Resume upload failed:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ p: 2, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <Typography variant="subtitle1" sx={{ mb: 2 }}>
        {file ? file.name : "No file selected"}
      </Typography>

      {/* File Input */}
      <Button
        variant="outlined"
        component="label"
        sx={{ mb: 2 }}
      >
        Select Resume
        <input
          type="file"
          hidden
          accept=".pdf,.doc,.docx"
          onChange={handleFileChange}
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
          disabled={!file || loading}
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
