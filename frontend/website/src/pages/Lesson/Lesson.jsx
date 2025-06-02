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
  useTheme,
  Avatar,
  Chip
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
  Quiz as QuizIcon,
  ContentCopy as ContentCopyIcon,
  Check as CheckIcon,
  AutoFixHigh as AutoFixHighIcon
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
  const [copiedCode, setCopiedCode] = useState(null);
  const [generatingQuiz, setGeneratingQuiz] = useState(false);
  const [quizId, setQuizId] = useState(null);
  const [openAddDialog, setOpenAddDialog] = useState(false);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [currentSection, setCurrentSection] = useState(null);
  const [newSectionTitle, setNewSectionTitle] = useState('');
  const [newSectionType, setNewSectionType] = useState('text');
  const [newSectionContent, setNewSectionContent] = useState('');
  const [newSectionMediaUrl, setNewSectionMediaUrl] = useState('');
  const [newSectionImage, setNewSectionImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [menuAnchorEl, setMenuAnchorEl] = useState(null);
  const [selectedSectionId, setSelectedSectionId] = useState(null);

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
      
      // Check if there's a quiz for this lesson
      
      setLoading(false);
    } catch (error) {
      console.error('Error fetching lesson data:', error);
      setError('Failed to load lesson data. Please try again.');
      setLoading(false);
    }
  };

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

      toast.success('Section updated successfully');

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

  const handleDeleteSection = async () => {
    setOpenDeleteDialog(false);
    setOperationLoading(true);

    try {
      await axios.delete('http://localhost:4545/sections/delete', {
        headers: { token: localStorage.getItem('token') },
        data: { id: currentSection.id } 
      });

      toast.success('Section deleted successfully');

      fetchLessonData();
    } catch (error) {
      console.error('Error deleting section:', error);
      toast.error(error.response?.data?.message || 'Failed to delete section. Please try again.');
      setError(error.response?.data?.message || 'Failed to delete section. Please try again.');
    } finally {
      setOperationLoading(false);
    }
  };

  const navigateBack = () => {
    navigate(`/main/classrooms/${courseId}/lessons`);
  };

  // Render section content based on type
  const renderSectionContent = (section) => {
    switch (section.type) {
      case 'text':
        return (
          <Box sx={{ 
            p: 2, 
            borderLeft: '4px solid #e0e0e0',
            backgroundColor: 'rgba(245, 245, 245, 0.5)',
            borderRadius: '0 8px 8px 0',
            transition: 'all 0.3s ease',
            '&:hover': {
              borderLeftColor: theme.palette.primary.main,
              backgroundColor: 'rgba(245, 245, 245, 0.8)',
              boxShadow: '0 2px 8px rgba(0,0,0,0.05)'
            }
          }}>
            <Typography 
              variant="body1" 
              sx={{ 
                whiteSpace: 'pre-wrap',
                lineHeight: 1.7,
                color: 'text.primary',
                fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif'
              }}
            >
              {section.content}
            </Typography>
          </Box>
        );
      case 'video':
        return (
          <Box sx={{ 
            position: 'relative', 
            paddingTop: '56.25%', 
            width: '100%', 
            mb: 2,
            borderRadius: '12px',
            overflow: 'hidden',
            boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
            transition: 'box-shadow 0.3s ease',
            '&:hover': {
              boxShadow: '0 6px 25px rgba(0,0,0,0.15)'
            }
          }}>
            <iframe
              src={section.mediaUrl}
              style={{ 
                position: 'absolute', 
                top: 0, 
                left: 0, 
                width: '100%', 
                height: '100%', 
                border: 'none'
              }}
              title={section.title}
              allowFullScreen
            />
          </Box>
        );
      case 'image':
        return (
          <Box sx={{ 
            textAlign: 'center', 
            mb: 2,
            position: 'relative',
            overflow: 'hidden',
            borderRadius: '12px',
            boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
            transition: 'box-shadow 0.3s ease',
            '&:hover': {
              boxShadow: '0 10px 25px rgba(0,0,0,0.15)'
            },
            '&::after': {
              content: '""',
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              background: 'linear-gradient(to bottom, rgba(0,0,0,0) 80%, rgba(0,0,0,0.05))',
              pointerEvents: 'none'
            }
          }}>
            <img
              src={section.mediaUrl}
              alt={section.title}
              style={{ 
                maxWidth: '100%', 
                maxHeight: '500px', 
                display: 'block',
                margin: '0 auto'
              }}
            />
          </Box>
        );
      case 'code':
        return (
          <Paper
            elevation={0}
            sx={{
              p: 3,
              mb: 2,
              bgcolor: '#1e1e2e',
              color: '#f8f8f2',
              fontFamily: '"Fira Code", "Roboto Mono", monospace',
              fontSize: '0.9rem',
              whiteSpace: 'pre-wrap',
              overflowX: 'auto',
              borderRadius: '8px',
              boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
              position: 'relative',
              '&::before': {
                content: '"Code"',
                position: 'absolute',
                top: '8px',
                right: '12px',
                fontSize: '0.7rem',
                color: 'rgba(248, 248, 242, 0.5)',
                textTransform: 'uppercase',
                letterSpacing: '1px'
              }
            }}
          >
            <Box sx={{ position: 'relative' }}>
              {section.content}
              <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
                <Tooltip title={copiedCode === section.id ? "Copied!" : "Copy code"}>
                  <IconButton
                    onClick={() => {
                      navigator.clipboard.writeText(section.content)
                        .then(() => {
                          setCopiedCode(section.id);
                          setTimeout(() => setCopiedCode(null), 2000);
                          toast.success('Code copied to clipboard!');
                        })
                        .catch(err => {
                          console.error('Failed to copy code:', err);
                          toast.error('Failed to copy code');
                        });
                    }}
                    sx={{
                      bgcolor: 'rgba(255, 255, 255, 0.1)',
                      color: 'rgba(255, 255, 255, 0.8)',
                      '&:hover': {
                        bgcolor: 'rgba(255, 255, 255, 0.2)',
                      },
                      width: 36,
                      height: 36
                    }}
                  >
                    {copiedCode === section.id ? <CheckIcon fontSize="small" /> : <ContentCopyIcon fontSize="small" />}
                  </IconButton>
                </Tooltip>
              </Box>
            </Box>
          </Paper>
        );
      case 'quiz':
        return (
          <Box sx={{ 
            mb: 2, 
            p: 3, 
            borderRadius: '12px',
            background: 'linear-gradient(135deg, #f5f7fa 0%, #e4e8eb 100%)',
            boxShadow: '0 4px 15px rgba(0,0,0,0.05)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center'
          }}>
            <QuizIcon sx={{ fontSize: 48, color: theme.palette.primary.main, mb: 2 }} />
            <Typography variant="h6" gutterBottom>Test Your Knowledge</Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
              Take this quiz to check your understanding of the lesson content.
            </Typography>
            
            {allowEdit ? (
              <Button
                variant="contained"
                color="primary"
                startIcon={<AutoFixHighIcon />}
                onClick={() => {
                  const checkQuiz = async () => {
                    try {
                      const response = await axios.get(`http://localhost:4545/quiz/section/`+section.id, {
                        headers: {
                          token: localStorage.getItem('token')
                        }
                      });
                      console.log(response.data.quiz.id)
                      if (response.data && response.data.quiz.id) {
                        console.log("osama");
                        const quizId = response.data.quiz.id;
                        if (allowEdit) {
                        

                          navigate(`/classroom/quizmaker/${quizId}`);
                        } else {
                          navigate(`/classroom/quiz/${quizId}`);
                        }
                      } 
                      // else {
                      //   console.log("osama");
                      //   // No quiz exists yet, create a basic quiz
                      //   const createResponse = await axios.post(`http://localhost:4545/quiz/generate`, {
                      //     lessonId,
                      //     title: `Quiz for ${lesson.title}`,
                      //     description: `Test your knowledge of ${lesson.title}`
                      //   }, {
                      //     headers: {
                      //       token: localStorage.getItem('token')
                      //     }
                      //   });
                      //   console.log("osama");
                        
                      //   if (createResponse.data && createResponse.data.quizId) {
                      //     const newQuizId = createResponse.data.quizId;
                      //     toast.success('Quiz created successfully!');
                          
                      //     // Navigate to quiz maker for teachers/admins
                      //     if (allowEdit) {
                      //       navigate(`/classroom/quizmaker/${newQuizId}`);
                      //     } else {
                      //       navigate(`/classroom/quiz/${newQuizId}`);
                      //     }
                      //   } else {
                      //     toast.error('Failed to create quiz');
                      //   }
                      // }
                    } catch (error) {
                      console.error('Error checking/creating quiz:', error);
                      toast.error('Error accessing quiz');
                    }
                  };
                  
                  checkQuiz();
                }}
                sx={{ 
                  borderRadius: '8px', 
                  px: 3, 
                  py: 1,
                  boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                  transition: 'box-shadow 0.3s ease',
                  '&:hover': {
                    boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
                  }
                }}
              >
                {generatingQuiz ? 'Generating Quiz...' : 'Create Quiz'}
              </Button>
            ) : (
              <Button
                variant="contained"
                color="primary"
                startIcon={<QuizIcon />}
                onClick={() => {
                  // Check if a quiz already exists for this lesson
                  const checkQuiz = async () => {
                    try {
                      // First check if there's an existing quiz for this lesson
                      const response = await axios.get(`http://localhost:4545/quiz/section/`+section.id, {
                        headers: {
                          token: localStorage.getItem('token')
                        }
                      });
                      
                      if (response.data && response.data.quizId) {
                        // Quiz exists, navigate to the quiz page
                        const quizId = response.data.quizId;
                        navigate(`/classroom/quiz/${quizId}`);
                      } else {
                        // No quiz exists yet, show message
                        toast.info('No quiz available for this lesson yet');
                      }
                    } catch (error) {
                      console.error('Error checking for quiz:', error);
                      toast.info('No quiz available for this lesson yet');
                    }
                  };
                  
                  // Execute the function
                  checkQuiz();
                }}
                sx={{ 
                  borderRadius: '8px', 
                  px: 3, 
                  py: 1,
                  boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                  transition: 'box-shadow 0.3s ease',
                  '&:hover': {
                    boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
                  }
                }}
              >
                Start Quiz
              </Button>
            )}
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
          <Paper 
            elevation={3} 
            sx={{ 
              p: 4, 
              mb: 5, 
              borderRadius: '16px',
              background: 'linear-gradient(135deg, #ffffff 0%, #f9f9f9 100%)',
              boxShadow: '0 10px 30px rgba(0,0,0,0.05)',
              position: 'relative',
              overflow: 'hidden',
              '&::before': {
                content: '""',
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '5px',
                background: (theme) => `linear-gradient(to right, ${theme.palette.primary.main}, ${theme.palette.primary.light})`,
              }
            }}
          >
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <Box>
                <Typography 
                  variant="h4" 
                  component="h1" 
                  gutterBottom
                  sx={{ 
                    fontWeight: 700,
                    fontSize: { xs: '1.8rem', md: '2.2rem' },
                    background: (theme) => `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    mb: 2
                  }}
                >
                  {lesson?.title}
                </Typography>
                {lesson?.description && (
                  <Typography 
                    variant="body1" 
                    color="text.secondary"
                    sx={{ 
                      fontSize: '1.05rem',
                      lineHeight: 1.6,
                      maxWidth: '800px',
                      opacity: 0.85
                    }}
                  >
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
                  sx={{ 
                    borderRadius: '30px',
                    px: 3,
                    py: 1.2,
                    boxShadow: '0 4px 10px rgba(0,0,0,0.15)',
                    transition: 'box-shadow 0.3s ease',
                    '&:hover': {
                      boxShadow: '0 6px 15px rgba(0,0,0,0.2)'
                    }
                  }}
                >
                  Add Section
                </Button>
              )}
            </Box>
          </Paper>

          {/* Sections */}
          {sections.length === 0 ? 
          (
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
                  elevation={2}
                  sx={{
                    p: 0,
                    mb: 4,
                    borderRadius: '12px',
                    position: 'relative',
                    overflow: 'hidden',
                    transition: 'box-shadow 0.3s ease',
                    '&:hover': {
                      boxShadow: '0 8px 25px rgba(0,0,0,0.1)'
                    },
                    border: '1px solid rgba(0,0,0,0.05)'
                  }}
                >
                  {/* Section header with gradient background based on type */}
                  <Box 
                    sx={{ 
                      display: 'flex', 
                      alignItems: 'center', 
                      p: 2.5,
                      background: (theme) => {
                        const color = {
                          text: theme.palette.primary.light,
                          video: '#ff7043',
                          image: '#26a69a',
                          code: '#5c6bc0',
                          quiz: '#7e57c2'
                        }[section.type] || theme.palette.primary.light;
                        
                        return `linear-gradient(135deg, ${color}15 0%, ${color}30 100%)`;
                      },
                      borderBottom: '1px solid rgba(0,0,0,0.05)'
                    }}
                  >
                    <Avatar 
                      sx={{ 
                        bgcolor: (theme) => {
                          const color = {
                            text: theme.palette.primary.main,
                            video: '#ff7043',
                            image: '#26a69a',
                            code: '#5c6bc0',
                            quiz: '#7e57c2'
                          }[section.type] || theme.palette.primary.main;
                          return color;
                        },
                        width: 40,
                        height: 40,
                        mr: 2,
                        boxShadow: '0 3px 5px rgba(0,0,0,0.1)'
                      }}
                    >
                      {sectionTypeIcons[section.type]}
                    </Avatar>
                    
                    <Box sx={{ flexGrow: 1 }}>
                      <Typography 
                        variant="h6" 
                        sx={{ 
                          fontWeight: 600, 
                          fontSize: '1.1rem',
                          mb: 0.5
                        }}
                      >
                        {section.title}
                      </Typography>
                      
                      <Chip
                        label={sectionTypeLabels[section.type]}
                        size="small"
                        sx={{ 
                          borderRadius: '4px',
                          bgcolor: (theme) => {
                            const color = {
                              text: theme.palette.primary.main,
                              video: '#ff7043',
                              image: '#26a69a',
                              code: '#5c6bc0',
                              quiz: '#7e57c2'
                            }[section.type] || theme.palette.primary.main;
                            return `${color}30`;
                          },
                          color: (theme) => {
                            const color = {
                              text: theme.palette.primary.main,
                              video: '#ff7043',
                              image: '#26a69a',
                              code: '#5c6bc0',
                              quiz: '#7e57c2'
                            }[section.type] || theme.palette.primary.main;
                            return color;
                          },
                          fontWeight: 500,
                          fontSize: '0.7rem'
                        }}
                      />
                    </Box>

                    {allowEdit && (
                      <IconButton
                        edge="end"
                        aria-label="more"
                        onClick={(e) => handleMenuOpen(e, section.id)}
                        sx={{ 
                          ml: 'auto',
                          color: 'text.secondary',
                          '&:hover': {
                            bgcolor: 'rgba(0,0,0,0.05)'
                          }
                        }}
                      >
                        <MoreVertIcon />
                      </IconButton>
                    )}
                  </Box>
                  <Box sx={{ p: 3 }}>
                    {renderSectionContent(section)}
                  </Box>
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
