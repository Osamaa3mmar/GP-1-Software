import { useState } from 'react';
import { 
  Box, 
  Avatar, 
  Typography, 
  Paper, 
  Divider, 
  List, 
  ListItem, 
  ListItemIcon, 
  ListItemText,
  Button,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  CircularProgress
} from '@mui/material';
import { 
  Email as EmailIcon,
  Phone as PhoneIcon,
  School as SchoolIcon,
  Work as WorkIcon,
  LocationOn as LocationIcon,
  Edit as EditIcon,
  CloudUpload as CloudUploadIcon
} from '@mui/icons-material';
import axios from 'axios';
import { toast } from 'react-toastify';

export default function LeftComponent({ user, isCurrentUser }) {
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [profileImage, setProfileImage] = useState(null);
  
  // Get user initials for avatar fallback
  const getInitials = (name) => {
    if (!name) return 'U';
    return name.split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase();
  };

  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;
    
    try {
      setUploading(true);
      
      // For now, we'll just show a message that this feature is coming soon
      // since we need to implement the backend endpoint for image uploads
      
      // Simulate a delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Show a message to the user
      toast.info('Profile image upload will be available in the next update!');
      
      // For demo purposes, we'll use a placeholder image
      const demoImageUrl = `https://ui-avatars.com/api/?name=${encodeURIComponent(user?.name || 'User')}&background=random&color=fff&size=200`;
      setProfileImage(demoImageUrl);
      
    } catch (error) {
      console.error('Error handling profile image:', error);
      toast.error('Failed to process profile image');
    } finally {
      setUploading(false);
      setOpenEditDialog(false);
    }
  };

  return (
    <Paper elevation={2} sx={{ p: 3, borderRadius: 2 }}>
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 3 }}>
        <Avatar
          src={profileImage || user?.profilePic || user?.avatar}
          alt={user?.username || 'User'}
          sx={{ width: 120, height: 120, mb: 2, fontSize: 40 }}
        >
          {getInitials(user?.username)}
        </Avatar>
        
        <Typography variant="h5" gutterBottom>
          {user?.username || 'User Name'}
        </Typography>
        
        <Typography variant="body1" color="text.secondary" gutterBottom>
          {user?.role || 'Student'}
        </Typography>
        
        {isCurrentUser && (
          <Button 
            variant="outlined" 
            startIcon={<EditIcon />} 
            size="small"
            onClick={() => setOpenEditDialog(true)}
            sx={{ mt: 1 }}
          >
            Change Photo
          </Button>
        )}
      </Box>
      
      <Divider sx={{ mb: 2 }} />
      
      <List>
        {user?.email && (
          <ListItem>
            <ListItemIcon>
              <EmailIcon color="primary" />
            </ListItemIcon>
            <ListItemText 
              primary="Email" 
              secondary={user.email} 
            />
          </ListItem>
        )}
        
        {user?.phone && (
          <ListItem>
            <ListItemIcon>
              <PhoneIcon color="primary" />
            </ListItemIcon>
            <ListItemText 
              primary="Phone" 
              secondary={user.phone} 
            />
          </ListItem>
        )}
        
        {user?.location && (
          <ListItem>
            <ListItemIcon>
              <LocationIcon color="primary" />
            </ListItemIcon>
            <ListItemText 
              primary="Location" 
              secondary={user.location} 
            />
          </ListItem>
        )}
        
        {user?.education && (
          <ListItem>
            <ListItemIcon>
              <SchoolIcon color="primary" />
            </ListItemIcon>
            <ListItemText 
              primary="Education" 
              secondary={user.education} 
            />
          </ListItem>
        )}
        
        {user?.occupation && (
          <ListItem>
            <ListItemIcon>
              <WorkIcon color="primary" />
            </ListItemIcon>
            <ListItemText 
              primary="Occupation" 
              secondary={user.occupation} 
            />
          </ListItem>
        )}
      </List>
      
      {/* Profile Image Upload Dialog */}
      <Dialog open={openEditDialog} onClose={() => setOpenEditDialog(false)}>
        <DialogTitle>Update Profile Picture</DialogTitle>
        <DialogContent>
          <Box sx={{ textAlign: 'center', py: 2 }}>
            <input
              accept="image/*"
              style={{ display: 'none' }}
              id="profile-image-upload"
              type="file"
              onChange={handleImageUpload}
            />
            <label htmlFor="profile-image-upload">
              <Button
                variant="contained"
                component="span"
                startIcon={uploading ? <CircularProgress size={20} /> : <CloudUploadIcon />}
                disabled={uploading}
              >
                {uploading ? 'Uploading...' : 'Upload Image'}
              </Button>
            </label>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenEditDialog(false)}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </Paper>
  );
}
