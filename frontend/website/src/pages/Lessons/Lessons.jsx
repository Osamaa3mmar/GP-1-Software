import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import {
  Container,
  Typography,
  Box,
  Paper,
  List,
  Button,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Fab,
  CircularProgress,
  Alert,
  Breadcrumbs,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
  useTheme
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import VideoLibraryIcon from '@mui/icons-material/VideoLibrary';

// Import the LessonCard component
import LessonCard from '../../components/Lessons/LessonCard';

export default function Lessons() {
    const { courseId } = useParams();
    const navigate = useNavigate();
    const theme = useTheme();
    
    // State variables
    const [allowEdit, setAllowEdit] = useState(false);
    const [lessons, setLessons] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [courseDetails, setCourseDetails] = useState(null);
    
    // Dialog states
    const [openAddDialog, setOpenAddDialog] = useState(false);
    const [openEditDialog, setOpenEditDialog] = useState(false);
    const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
    const [currentLesson, setCurrentLesson] = useState(null);
    const [newLessonTitle, setNewLessonTitle] = useState('');
    
    // Menu state
    const [menuAnchorEl, setMenuAnchorEl] = useState(null);
    const [selectedLessonId, setSelectedLessonId] = useState(null);
    
    // Fetch all lessons for the course
    const getallLessons = async () => {
        setLoading(true);
        setError(null);
        try {
            const { data } = await axios.get(`http://localhost:4545/lesson/getall/${courseId}`, {
                headers: {
                    token: localStorage.getItem("token")
                }
            });
            
            if (data.control) {
                setAllowEdit(true);
            }
            
            
            setLessons(data.lessons || []);
            setCourseDetails(data.course || { title: 'Course Lessons' });
            setLoading(false);
        } catch (error) {
            console.error("Error fetching lessons:", error);
            setError("Failed to load lessons. Please try again later.");
            setLoading(false);
        }
    };
    
    // Function to add a new lesson
    const handleAddLesson = async () => {
        setOpenAddDialog(false);
        
        try {
            // Make API call to add a new lesson
            await axios.post('http://localhost:4545/lesson/add', {
                courseId,
                title: newLessonTitle,
                description: '', // Default empty description
                order: lessons.length + 1 // Set order to be after existing lessons
            }, {
                headers: {
                    token: localStorage.getItem('token')
                }
            });
            
            // Show success message (you could add a toast notification here)
            console.log('Lesson added successfully');
            
            // Reset the form
            setNewLessonTitle('');
            
            // Refresh the lessons list
            getallLessons();
        } catch (error) {
            console.error('Error adding lesson:', error);
            setError(error.response?.data?.message || 'Failed to add lesson. Please try again.');
        }
    };
    
    // Function to edit an existing lesson
    const handleEditLesson = async () => {
        setOpenEditDialog(false);
        
        try {
            // Make API call to update the lesson
            await axios.put('http://localhost:4545/lesson/update', {
                id: currentLesson.id,
                title: newLessonTitle,
                // Keep other properties the same
                description: currentLesson.description,
                order: currentLesson.order
            }, {
                headers: {
                    token: localStorage.getItem('token')
                }
            });
            
            // Show success message (you could add a toast notification here)
            console.log('Lesson updated successfully');
            
            // Refresh the lessons list
            getallLessons();
        } catch (error) {
            console.error('Error updating lesson:', error);
            setError(error.response?.data?.message || 'Failed to update lesson. Please try again.');
        }
    };
    
    // Function to delete a lesson
    const handleDeleteLesson = async () => {
        setOpenDeleteDialog(false);
        
        try {
            // Make API call to delete the lesson
            await axios.delete('http://localhost:4545/lesson/delete', {
                headers: {
                    token: localStorage.getItem('token')
                },
                data: { id: currentLesson.id } // Send data in the request body for DELETE
            });
            
            // Show success message (you could add a toast notification here)
            console.log('Lesson deleted successfully');
            
            // Refresh the lessons list
            getallLessons();
        } catch (error) {
            console.error('Error deleting lesson:', error);
            setError(error.response?.data?.message || 'Failed to delete lesson. Please try again.');
        }
    };
    
    const handleMenuOpen = (event, lessonId) => {
        setMenuAnchorEl(event.currentTarget);
        setSelectedLessonId(lessonId);
    };
    
    // Handle closing the menu
    const handleMenuClose = () => {
        setMenuAnchorEl(null);
        setSelectedLessonId(null);
    };
    
    // Handle opening the edit dialog
    const handleOpenEditDialog = (lesson) => {
        setCurrentLesson(lesson);
        setNewLessonTitle(lesson.title);
        setOpenEditDialog(true);
        handleMenuClose();
    };
    
    // Handle opening the delete dialog
    const handleOpenDeleteDialog = (lesson) => {
        setCurrentLesson(lesson);
        setOpenDeleteDialog(true);
        handleMenuClose();
    };
    
    // Navigate to lesson details
    const navigateToLesson = (lessonId) => {
        navigate(`/main/classrooms/${courseId}/lessons/lesson/${lessonId}`);
    };
    
    // Navigate back to classrooms
    const navigateBack = () => {
        navigate('/main/classrooms');
    };
    
    useEffect(() => {
        getallLessons();
    }, [courseId]);
    
    return (
        <Container maxWidth="lg" sx={{ py: 4 }}>
            {/* Breadcrumb navigation */}
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                <Button 
                    startIcon={<ArrowBackIcon />} 
                    onClick={navigateBack}
                    sx={{ mr: 2 }}
                >
                    Back to Classrooms
                </Button>
                <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />}>
                    <Link to="/main/classrooms" style={{ textDecoration: 'none', color: theme.palette.text.secondary }}>
                        Classrooms
                    </Link>
                    <Typography color="text.primary" fontWeight="medium">
                        {courseDetails?.title || 'Course Lessons'}
                    </Typography>
                </Breadcrumbs>
            </Box>
            
            {/* Page header */}
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
                <Typography variant="h4" component="h1" fontWeight="bold">
                    {courseDetails?.title || 'Course Lessons'}
                </Typography>
                
                {allowEdit && (
                    <Button
                        variant="contained"
                        color="primary"
                        startIcon={<AddIcon />}
                        onClick={() => setOpenAddDialog(true)}
                    >
                        Add Lesson
                    </Button>
                )}
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
                    {lessons.length === 0 ? (
                        <Paper sx={{ p: 4, textAlign: 'center', borderRadius: 2 }}>
                            <VideoLibraryIcon sx={{ fontSize: 60, color: 'text.secondary', opacity: 0.5, mb: 2 }} />
                            <Typography variant="h6" color="text.secondary" gutterBottom>
                                No Lessons Available
                            </Typography>
                            <Typography variant="body2" color="text.secondary" paragraph>
                                {allowEdit 
                                    ? 'Start by adding your first lesson to this course.'
                                    : 'There are no lessons available for this course yet.'}
                            </Typography>
                            
                            {allowEdit && (
                                <Button
                                    variant="contained"
                                    startIcon={<AddIcon />}
                                    onClick={() => setOpenAddDialog(true)}
                                    sx={{ mt: 2 }}
                                >
                                    Add First Lesson
                                </Button>
                            )}
                        </Paper>
                    ) : (
                        <Paper elevation={0} sx={{ borderRadius: 2, overflow: 'hidden', border: `1px solid ${theme.palette.divider}` }}>
                            <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
                                {lessons.map((lesson, index) => (
                                    <LessonCard
                                        key={lesson.id}
                                        lesson={lesson}
                                        index={index}
                                        isLast={index === lessons.length - 1}
                                        allowEdit={allowEdit}
                                        onNavigate={navigateToLesson}
                                        onMenuOpen={handleMenuOpen}
                                    />
                                ))}
                            </List>
                        </Paper>
                    )}
                </>
            )}
            
            {/* Add Lesson Dialog */}
            <Dialog open={openAddDialog} onClose={() => setOpenAddDialog(false)} maxWidth="sm" fullWidth>
                <DialogTitle>Add New Lesson</DialogTitle>
                <DialogContent>
                    <DialogContentText sx={{ mb: 2 }}>
                        Enter the title for your new lesson. You can add content after creating it.
                    </DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        label="Lesson Title"
                        type="text"
                        fullWidth
                        value={newLessonTitle}
                        onChange={(e) => setNewLessonTitle(e.target.value)}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpenAddDialog(false)}>Cancel</Button>
                    <Button 
                        onClick={handleAddLesson} 
                        variant="contained" 
                        disabled={!newLessonTitle.trim()}
                    >
                        Add Lesson
                    </Button>
                </DialogActions>
            </Dialog>
            
            {/* Edit Lesson Dialog */}
            <Dialog open={openEditDialog} onClose={() => setOpenEditDialog(false)} maxWidth="sm" fullWidth>
                <DialogTitle>Edit Lesson</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        label="Lesson Title"
                        type="text"
                        fullWidth
                        value={newLessonTitle}
                        onChange={(e) => setNewLessonTitle(e.target.value)}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpenEditDialog(false)}>Cancel</Button>
                    <Button 
                        onClick={handleEditLesson} 
                        variant="contained" 
                        disabled={!newLessonTitle.trim() || newLessonTitle === currentLesson?.title}
                    >
                        Save Changes
                    </Button>
                </DialogActions>
            </Dialog>
            
            {/* Delete Lesson Dialog */}
            <Dialog open={openDeleteDialog} onClose={() => setOpenDeleteDialog(false)}>
                <DialogTitle>Delete Lesson</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Are you sure you want to delete the lesson "{currentLesson?.title}"? This action cannot be undone.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpenDeleteDialog(false)}>Cancel</Button>
                    <Button onClick={handleDeleteLesson} color="error" variant="contained">
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>
            
            {/* Lesson Options Menu */}
            <Menu
                anchorEl={menuAnchorEl}
                open={Boolean(menuAnchorEl)}
                onClose={handleMenuClose}
            >
                <MenuItem onClick={() => {
                    const lesson = lessons.find(l => l.id === selectedLessonId);
                    if (lesson) handleOpenEditDialog(lesson);
                }}>
                    <ListItemIcon>
                        <EditIcon fontSize="small" />
                    </ListItemIcon>
                    <ListItemText>Edit</ListItemText>
                </MenuItem>
                <MenuItem onClick={() => {
                    const lesson = lessons.find(l => l.id === selectedLessonId);
                    if (lesson) handleOpenDeleteDialog(lesson);
                }}>
                    <ListItemIcon>
                        <DeleteIcon fontSize="small" />
                    </ListItemIcon>
                    <ListItemText>Delete</ListItemText>
                </MenuItem>
            </Menu>
            
            {/* Floating action button for adding lessons (mobile view) */}
            {allowEdit && (
                <Fab 
                    color="primary" 
                    aria-label="add lesson"
                    onClick={() => setOpenAddDialog(true)}
                    sx={{ 
                        position: 'fixed', 
                        bottom: 16, 
                        right: 16,
                        display: { sm: 'none' }
                    }}
                >
                    <AddIcon />
                </Fab>
            )}
        </Container>
    )
}
