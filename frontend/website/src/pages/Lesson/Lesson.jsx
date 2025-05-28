import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
  Container,
  Typography,
  Box,
  Paper,
  Button,
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  ListItemSecondaryAction,
  IconButton,
  Menu,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  TextField,
  Select,
  FormControl,
  InputLabel,
  CircularProgress,
  Alert,
  Breadcrumbs,
  Fab,
  Tooltip,
  useTheme
} from '@mui/material';
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  MoreVert as MoreVertIcon,
  ArrowBack as ArrowBackIcon,
  NavigateNext as NavigateNextIcon,
  TextFields as TextFieldsIcon,
  VideoLibrary as VideoLibraryIcon,
  Image as ImageIcon,
  Code as CodeIcon,
  Quiz as QuizIcon
} from '@mui/icons-material';
import { UserContext } from '../../Context/userContext';

// Section type icons
const sectionTypeIcons = {
  text: <TextFieldsIcon />,
  video: <VideoLibraryIcon />,
  image: <ImageIcon />,
  code: <CodeIcon />,
  quiz: <QuizIcon />
};

// Section type labels
const sectionTypeLabels = {
  text: 'Text Content',
  video: 'Video',
  image: 'Image',
  code: 'Code Snippet',
  quiz: 'Quiz'
};

export default function Lesson() {
  const { courseId, lessonId } = useParams();
  const navigate = useNavigate();
  const theme = useTheme();
  const { user } = useContext(UserContext);

  // State variables
  const [lesson, setLesson] = useState(null);
  const [sections, setSections] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [allowEdit, setAllowEdit] = useState(false);
  const [imageUploading, setImageUploading] = useState(false);
  const [operationLoading, setOperationLoading] = useState(false);

  // Dialog states
  const [openAddDialog, setOpenAddDialog] = useState(false);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [currentSection, setCurrentSection] = useState(null);

  // New section form state
  const [newSectionTitle, setNewSectionTitle] = useState('');
  const [newSectionType, setNewSectionType] = useState('text');
  const [newSectionContent, setNewSectionContent] = useState('');
  const [newSectionMediaUrl, setNewSectionMediaUrl] = useState('');
  const [newSectionImage, setNewSectionImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);

  // Menu state
  const [menuAnchorEl, setMenuAnchorEl] = useState(null);
  const [selectedSectionId, setSelectedSectionId] = useState(null);

  // Fetch lesson and sections data
  const fetchLessonData = async () => {
    setLoading(true);
    setError(null);
    try {
      // Get lesson sections from the API
      const { data } = await axios.get(`http://localhost:4545/sections/getall/${lessonId}`, {
        headers: { token: localStorage.getItem('token') }
      });

      setLesson(data.lesson);
      setSections(data.sections || []);
      setAllowEdit(data.control);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching lesson data:', error);
      setError('Failed to load lesson data. Please try again.');
      setLoading(false);
    }
  };

  // Handle opening the menu
  const handleMenuOpen = (event, sectionId) => {
    setMenuAnchorEl(event.currentTarget);
    setSelectedSectionId(sectionId);
  };

  // Handle closing the menu
  const handleMenuClose = () => {
    setMenuAnchorEl(null);
    setSelectedSectionId(null);
  };

  // Handle opening the edit dialog
  const handleOpenEditDialog = (section) => {
    setCurrentSection(section);
    setNewSectionTitle(section.title);
    setNewSectionType(section.type);
    setNewSectionContent(section.content || '');
    setNewSectionMediaUrl(section.mediaUrl || '');
    setPreviewImage(section.type === 'image' ? section.mediaUrl : null);
    setNewSectionImage(null);
    setOpenEditDialog(true);
    handleMenuClose();
  };

  // Handle opening the delete dialog
  const handleOpenDeleteDialog = (section) => {
    setCurrentSection(section);
    setOpenDeleteDialog(true);
    handleMenuClose();
  };

  // Handle opening the add section dialog
  const handleOpenAddDialog = () => {
    setNewSectionTitle('');
    setNewSectionType('text');
    setNewSectionContent('');
    setNewSectionMediaUrl('');
    setNewSectionImage(null);
    setPreviewImage(null);
    setOpenAddDialog(true);
  };

  // Handle adding a new section
  const handleAddSection = async () => {
    // Close the dialog
    setOpenAddDialog(false);
    setOperationLoading(true);

    try {
      // Create FormData for file upload
      const formData = new FormData();
      formData.append('lessonId', lessonId);
      formData.append('title', newSectionTitle);
      formData.append('type', newSectionType);
      formData.append('order', sections.length + 1);

      // Handle different content types
      if (newSectionType === 'text' || newSectionType === 'code') {
        formData.append('content', newSectionContent);
      } else if (newSectionType === 'video') {
        formData.append('mediaUrl', newSectionMediaUrl);
      } else if (newSectionType === 'image') {
        if (newSectionImage) {
          // Append the image file for upload to Cloudinary
          formData.append('sectionImage', newSectionImage);
          console.log('Image file added to form data for Cloudinary upload');
          setImageUploading(true);
        } else if (newSectionMediaUrl) {
          // If no file but URL is provided
          formData.append('mediaUrl', newSectionMediaUrl);
        }
      }

      // Make API call to add a new section
      await axios.post('http://localhost:4545/sections/add', formData, {
        headers: {
          token: localStorage.getItem('token'),
          'Content-Type': 'multipart/form-data'
        }
      });

      // Show success message with toast
      toast.success('Section added successfully');

      // Reset form
      setNewSectionTitle('');
      setNewSectionType('text');
      setNewSectionContent('');
      setNewSectionMediaUrl('');
      setNewSectionImage(null);
      setPreviewImage(null);

      // Refresh the sections list
      fetchLessonData();
    } catch (error) {
      console.error('Error adding section:', error);
      toast.error(error.response?.data?.message || 'Failed to add section. Please try again.');
      setError(error.response?.data?.message || 'Failed to add section. Please try again.');
    } finally {
      setOperationLoading(false);
      setImageUploading(false);
    }
  };

  // Handle editing a section
  const handleEditSection = async () => {
    // Close the dialog
    setOpenEditDialog(false);
    setOperationLoading(true);

    try {
      // Create FormData for file upload
      const formData = new FormData();
      formData.append('id', currentSection.id);
      formData.append('title', newSectionTitle);
      formData.append('type', newSectionType);

      // Handle different content types
      if (newSectionType === 'text' || newSectionType === 'code') {
        formData.append('content', newSectionContent);
      } else if (newSectionType === 'video') {
        formData.append('mediaUrl', newSectionMediaUrl);
      } else if (newSectionType === 'image') {
        if (newSectionImage) {
          // Append the new image file for upload to Cloudinary
          formData.append('sectionImage', newSectionImage);
          console.log('Image file added to form data for Cloudinary upload');
          setImageUploading(true);
        } else if (newSectionMediaUrl) {
          // Keep the existing image URL if no new image is selected
          formData.append('mediaUrl', newSectionMediaUrl);
        }
      }

      // Make API call to update the section
      await axios.put('http://localhost:4545/sections/update', formData, {
        headers: {
          token: localStorage.getItem('token'),
          'Content-Type': 'multipart/form-data'
        }
      });

      // Show success message with toast
      toast.success('Section updated successfully');

      // Refresh the sections list
      fetchLessonData();
    } catch (error) {
      console.error('Error updating section:', error);
      toast.error(error.response?.data?.message || 'Failed to update section. Please try again.');
      setError(error.response?.data?.message || 'Failed to update section. Please try again.');
    } finally {
      setOperationLoading(false);
      setImageUploading(false);
    }
  };

  // Handle deleting a section
  const handleDeleteSection = async () => {
    // Close the dialog
    setOpenDeleteDialog(false);
    setOperationLoading(true);

    try {
      // Make API call to delete the section
      await axios.delete('http://localhost:4545/sections/delete', {
        headers: { token: localStorage.getItem('token') },
        data: { id: currentSection.id } // Send data in the request body for DELETE
      });

      // Show success message with toast
      toast.success('Section deleted successfully');

      // Refresh the sections list
      fetchLessonData();
    } catch (error) {
      console.error('Error deleting section:', error);
      toast.error(error.response?.data?.message || 'Failed to delete section. Please try again.');
      setError(error.response?.data?.message || 'Failed to delete section. Please try again.');
    } finally {
      setOperationLoading(false);
    }
  };

  // Navigate back to lessons list
  const navigateBack = () => {
    navigate(`/main/classrooms/${courseId}/lessons`);
  };

  // Render section content based on type
  const renderSectionContent = (section) => {
    switch (section.type) {
      case 'text':
        return (
          <Typography variant="body1" sx={{ whiteSpace: 'pre-wrap' }}>
            {section.content}
          </Typography>
        );
      case 'video':
        return (
          <Box sx={{ position: 'relative', paddingTop: '56.25%', width: '100%', mb: 2 }}>
            <iframe
              src={section.mediaUrl}
              style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', borderRadius: '8px' }}
              title={section.title}
              allowFullScreen
            />
          </Box>
        );
      case 'image':
        return (
          <Box sx={{ textAlign: 'center', mb: 2 }}>
            <img
              src={section.mediaUrl}
              alt={section.title}
              style={{ maxWidth: '100%', maxHeight: '400px', borderRadius: '8px' }}
            />
          </Box>
        );
      case 'code':
        return (
          <Paper
            elevation={0}
            sx={{
              p: 2,
              mb: 2,
              bgcolor: '#f5f5f5',
              fontFamily: 'monospace',
              whiteSpace: 'pre-wrap',
              overflowX: 'auto',
              borderRadius: '8px'
            }}
          >
            {section.content}
          </Paper>
        );
      case 'quiz':
        return (
          <Box sx={{ mb: 2 }}>
            <Button
              variant="contained"
              color="primary"
              startIcon={<QuizIcon />}
              sx={{ borderRadius: '8px' }}
            >
              Start Quiz
            </Button>
          </Box>
        );
      default:
        return null;
    }
  };

  useEffect(() => {
    fetchLessonData();
  }, [lessonId]);

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Breadcrumb navigation */}
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
        <Button
          startIcon={<ArrowBackIcon />}
          onClick={navigateBack}
          sx={{ mr: 2 }}
        >
          Back to Lessons
        </Button>
        <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />}>
          <Link to="/main/classrooms" style={{ textDecoration: 'none', color: theme.palette.text.secondary }}>
            Classrooms
          </Link>
          <Link to={`/main/classrooms/${courseId}/lessons`} style={{ textDecoration: 'none', color: theme.palette.text.secondary }}>
            Lessons
          </Link>
          <Typography color="text.primary" fontWeight="medium">
            {lesson?.title || 'Lesson'}
          </Typography>
        </Breadcrumbs>
      </Box>

      {/* Error message */}
      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}

      {/* Loading state */}
      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', my: 5 }}>
          <CircularProgress />
        </Box>
      ) : (
        <>
          {/* Lesson header */}
          <Paper elevation={2} sx={{ p: 3, mb: 4, borderRadius: 2 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <Box>
                <Typography variant="h4" component="h1" gutterBottom>
                  {lesson?.title}
                </Typography>
                {lesson?.description && (
                  <Typography variant="body1" color="text.secondary">
                    {lesson.description}
                  </Typography>
                )}
              </Box>

              {allowEdit && (
                <Button
                  variant="contained"
                  color="primary"
                  startIcon={<AddIcon />}
                  onClick={handleOpenAddDialog}
                >
                  Add Section
                </Button>
              )}
            </Box>
          </Paper>

          {/* Sections */}
          {sections.length === 0 ? (
            <Paper sx={{ p: 4, textAlign: 'center', borderRadius: 2 }}>
              <Box sx={{ mb: 2 }}>
                <Typography variant="h6" color="text.secondary" gutterBottom>
                  No Content Available
                </Typography>
                <Typography variant="body2" color="text.secondary" paragraph>
                  {allowEdit
                    ? 'Start by adding your first section to this lesson.'
                    : 'There is no content available for this lesson yet.'}
                </Typography>

                {allowEdit && (
                  <Button
                    variant="contained"
                    startIcon={<AddIcon />}
                    onClick={handleOpenAddDialog}
                    sx={{ mt: 2 }}
                  >
                    Add First Section
                  </Button>
                )}
              </Box>
            </Paper>
          ) : (
            <Box sx={{ mb: 4 }}>
              {sections.map((section, index) => (
                <Paper
                  key={section.id}
                  elevation={1}
                  sx={{
                    p: 3,
                    mb: 3,
                    borderRadius: 2,
                    position: 'relative'
                  }}
                >
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <ListItemIcon sx={{ minWidth: 40 }}>
                      {sectionTypeIcons[section.type]}
                    </ListItemIcon>
                    <Typography variant="h6">
                      {section.title}
                    </Typography>
                    <Typography
                      variant="caption"
                      color="text.secondary"
                      sx={{ ml: 1, bgcolor: 'background.default', px: 1, py: 0.5, borderRadius: 1 }}
                    >
                      {sectionTypeLabels[section.type]}
                    </Typography>

                    {allowEdit && (
                      <IconButton
                        edge="end"
                        aria-label="more"
                        onClick={(e) => handleMenuOpen(e, section.id)}
                        sx={{ ml: 'auto' }}
                      >
                        <MoreVertIcon />
                      </IconButton>
                    )}
                  </Box>

                  <Divider sx={{ mb: 2 }} />

                  {renderSectionContent(section)}
                </Paper>
              ))}
            </Box>
          )}

          {/* Floating action button for adding sections */}
          {allowEdit && (
            <Tooltip title="Add section">
              <Fab
                color="primary"
                aria-label="add section"
                sx={{ position: 'fixed', bottom: 20, left: 20 }}
                onClick={handleOpenAddDialog}
              >
                <AddIcon />
              </Fab>
            </Tooltip>
          )}

          {/* Add Section Dialog */}
          <Dialog open={openAddDialog} onClose={() => setOpenAddDialog(false)} maxWidth="sm" fullWidth>
            <DialogTitle>Add New Section</DialogTitle>
            <DialogContent>
              <DialogContentText sx={{ mb: 2 }}>
                Add a new content section to this lesson.
              </DialogContentText>

              <TextField
                autoFocus
                margin="dense"
                label="Section Title"
                type="text"
                fullWidth
                value={newSectionTitle}
                onChange={(e) => setNewSectionTitle(e.target.value)}
                sx={{ mb: 2 }}
              />

              <FormControl fullWidth sx={{ mb: 2 }}>
                <InputLabel>Section Type</InputLabel>
                <Select
                  value={newSectionType}
                  label="Section Type"
                  onChange={(e) => setNewSectionType(e.target.value)}
                >
                  <MenuItem value="text">Text Content</MenuItem>
                  <MenuItem value="video">Video</MenuItem>
                  <MenuItem value="image">Image</MenuItem>
                  <MenuItem value="code">Code Snippet</MenuItem>
                  <MenuItem value="quiz">Quiz</MenuItem>
                </Select>
              </FormControl>

              {(newSectionType === 'text' || newSectionType === 'code') && (
                <TextField
                  margin="dense"
                  label={newSectionType === 'text' ? 'Content' : 'Code'}
                  multiline
                  rows={4}
                  fullWidth
                  value={newSectionContent}
                  onChange={(e) => setNewSectionContent(e.target.value)}
                />
              )}

              {newSectionType === 'video' && (
                <TextField
                  margin="dense"
                  label="Video URL"
                  type="text"
                  fullWidth
                  value={newSectionMediaUrl}
                  onChange={(e) => setNewSectionMediaUrl(e.target.value)}
                  helperText="Enter YouTube embed URL"
                />
              )}

              {newSectionType === 'image' && (
                <Box sx={{ mt: 2 }}>
                  <Typography variant="subtitle2" gutterBottom>
                    Choose an option to add an image:
                  </Typography>

                  {/* Image URL input */}
                  <TextField
                    margin="dense"
                    label="Image URL"
                    type="text"
                    fullWidth
                    value={newSectionMediaUrl}
                    onChange={(e) => {
                      setNewSectionMediaUrl(e.target.value);
                      setNewSectionImage(null);
                      setPreviewImage(null);
                    }}
                    helperText="Enter image URL or upload an image below"
                    sx={{ mb: 2 }}
                  />

                  <Typography variant="subtitle2" gutterBottom>
                    OR
                  </Typography>

                  {/* Image upload */}
                  <Box sx={{ mt: 2, mb: 2 }}>
                    <input
                      accept="image/*"
                      id="section-image-upload"
                      type="file"
                      style={{ display: 'none' }}
                      onChange={(e) => {
                        const file = e.target.files[0];
                        if (file) {
                          setNewSectionImage(file);
                          setPreviewImage(URL.createObjectURL(file));
                          setNewSectionMediaUrl(''); // Clear URL if file is selected
                        }
                      }}
                    />
                    <label htmlFor="section-image-upload">
                      <Button
                        variant="contained"
                        component="span"
                        startIcon={imageUploading ? <CircularProgress size={20} color="inherit" /> : <ImageIcon />}
                        disabled={imageUploading}
                      >
                        {imageUploading ? 'Uploading...' : 'Upload Image'}
                      </Button>
                    </label>
                  </Box>

                  {/* Preview image */}
                  {previewImage && (
                    <Box sx={{ mt: 2, textAlign: 'center' }}>
                      <img
                        src={previewImage}
                        alt="Preview"
                        style={{ maxWidth: '100%', maxHeight: '200px', borderRadius: '8px' }}
                      />
                    </Box>
                  )}
                </Box>
              )}

              {newSectionType === 'quiz' && (
                <Alert severity="info" sx={{ mt: 2 }}>
                  You'll be able to create or select a quiz after adding this section.
                </Alert>
              )}
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setOpenAddDialog(false)}>Cancel</Button>
              <Button
                onClick={handleAddSection}
                variant="contained"
                disabled={!newSectionTitle.trim() || operationLoading}
                startIcon={operationLoading ? <CircularProgress size={20} color="inherit" /> : <AddIcon />}
              >
                {operationLoading ? 'Adding...' : 'Add Section'}
              </Button>
            </DialogActions>
          </Dialog>

          {/* Edit Section Dialog */}
          <Dialog open={openEditDialog} onClose={() => setOpenEditDialog(false)} maxWidth="sm" fullWidth>
            <DialogTitle>Edit Section</DialogTitle>
            <DialogContent>
              <TextField
                autoFocus
                margin="dense"
                label="Section Title"
                type="text"
                fullWidth
                value={newSectionTitle}
                onChange={(e) => setNewSectionTitle(e.target.value)}
                sx={{ mb: 2 }}
              />

              <FormControl fullWidth sx={{ mb: 2 }}>
                <InputLabel>Section Type</InputLabel>
                <Select
                  value={newSectionType}
                  label="Section Type"
                  onChange={(e) => setNewSectionType(e.target.value)}
                >
                  <MenuItem value="text">Text Content</MenuItem>
                  <MenuItem value="video">Video</MenuItem>
                  <MenuItem value="image">Image</MenuItem>
                  <MenuItem value="code">Code Snippet</MenuItem>
                  <MenuItem value="quiz">Quiz</MenuItem>
                </Select>
              </FormControl>

              {(newSectionType === 'text' || newSectionType === 'code') && (
                <TextField
                  margin="dense"
                  label={newSectionType === 'text' ? 'Content' : 'Code'}
                  multiline
                  rows={4}
                  fullWidth
                  value={newSectionContent}
                  onChange={(e) => setNewSectionContent(e.target.value)}
                />
              )}

              {newSectionType === 'video' && (
                <TextField
                  margin="dense"
                  label="Video URL"
                  type="text"
                  fullWidth
                  value={newSectionMediaUrl}
                  onChange={(e) => setNewSectionMediaUrl(e.target.value)}
                  helperText="Enter YouTube embed URL"
                />
              )}

              {newSectionType === 'image' && (
                <Box sx={{ mt: 2 }}>
                  <Typography variant="subtitle2" gutterBottom>
                    Choose an option to add an image:
                  </Typography>

                  {/* Image URL input */}
                  <TextField
                    margin="dense"
                    label="Image URL"
                    type="text"
                    fullWidth
                    value={newSectionMediaUrl}
                    onChange={(e) => {
                      setNewSectionMediaUrl(e.target.value);
                      setNewSectionImage(null);
                      setPreviewImage(null);
                    }}
                    helperText="Enter image URL or upload a new image below"
                    sx={{ mb: 2 }}
                  />

                  <Typography variant="subtitle2" gutterBottom>
                    OR
                  </Typography>

                  {/* Image upload */}
                  <Box sx={{ mt: 2, mb: 2 }}>
                    <input
                      accept="image/*"
                      id="section-image-edit-upload"
                      type="file"
                      style={{ display: 'none' }}
                      onChange={(e) => {
                        const file = e.target.files[0];
                        if (file) {
                          setNewSectionImage(file);
                          setPreviewImage(URL.createObjectURL(file));
                          setNewSectionMediaUrl(''); // Clear URL if file is selected
                        }
                      }}
                    />
                    <label htmlFor="section-image-edit-upload">
                      <Button
                        variant="contained"
                        component="span"
                        startIcon={imageUploading ? <CircularProgress size={20} color="inherit" /> : <ImageIcon />}
                        disabled={imageUploading}
                      >
                        {imageUploading ? 'Uploading...' : 'Upload New Image'}
                      </Button>
                    </label>
                  </Box>

                  {/* Preview image */}
                  {previewImage && (
                    <Box sx={{ mt: 2, textAlign: 'center' }}>
                      <img
                        src={previewImage}
                        alt="Preview"
                        style={{ maxWidth: '100%', maxHeight: '200px', borderRadius: '8px' }}
                      />
                    </Box>
                  )}
                </Box>
              )}
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setOpenEditDialog(false)}>Cancel</Button>
              <Button
                onClick={handleEditSection}
                variant="contained"
                disabled={!newSectionTitle.trim() || operationLoading}
                startIcon={operationLoading ? <CircularProgress size={20} color="inherit" /> : <EditIcon />}
              >
                {operationLoading ? 'Saving...' : 'Save Changes'}
              </Button>
            </DialogActions>
          </Dialog>

          {/* Delete Section Dialog */}
          <Dialog open={openDeleteDialog} onClose={() => setOpenDeleteDialog(false)}>
            <DialogTitle>Delete Section</DialogTitle>
            <DialogContent>
              <DialogContentText>
                Are you sure you want to delete the section "{currentSection?.title}"? This action cannot be undone.
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setOpenDeleteDialog(false)}>Cancel</Button>
              <Button 
                onClick={handleDeleteSection} 
                color="error" 
                variant="contained"
                disabled={operationLoading}
                startIcon={operationLoading ? <CircularProgress size={20} color="inherit" /> : <DeleteIcon />}
              >
                {operationLoading ? 'Deleting...' : 'Delete'}
              </Button>
            </DialogActions>
          </Dialog>

          {/* Section Options Menu */}
          <Menu
            anchorEl={menuAnchorEl}
            open={Boolean(menuAnchorEl)}
            onClose={handleMenuClose}
          >
            <MenuItem onClick={() => {
              const section = sections.find(s => s.id === selectedSectionId);
              if (section) handleOpenEditDialog(section);
            }}>
              <ListItemIcon>
                <EditIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText>Edit</ListItemText>
            </MenuItem>
            <MenuItem onClick={() => {
              const section = sections.find(s => s.id === selectedSectionId);
              if (section) handleOpenDeleteDialog(section);
            }}>
              <ListItemIcon>
                <DeleteIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText>Delete</ListItemText>
            </MenuItem>
          </Menu>
        </>
      )}
    </Container>
  );
}
