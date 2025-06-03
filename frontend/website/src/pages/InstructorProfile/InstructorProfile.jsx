import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import {
  Container,
  Grid,
  Box,
  Typography,
  Avatar,
  Paper,
  Divider,
  Chip,
  Button,
  Card,
  CardContent,
  CardMedia,
  CardActionArea,
  Rating,
  CircularProgress,
  Alert,
  Stack,
  IconButton,
  Tooltip,
} from '@mui/material';
import {
  School,
  LinkedIn,
  Language,
  GitHub,
  Email,
  Book,
  People,
  AccessTime,
  VerifiedUser,
  FileCopyRounded,
} from '@mui/icons-material';

const InstructorProfile = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [instructor, setInstructor] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchInstructorData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`http://localhost:4545/user/teacher/${id}`);
        setInstructor(response.data.teacher);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching instructor data:', err);
        setError(err.message || 'Failed to load instructor profile');
        setLoading(false);
      }
    };

    fetchInstructorData();
  }, [id]);

  if (loading) {
    return (
      <Box 
        sx={{ 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center', 
          minHeight: '80vh' 
        }}
      >
        <CircularProgress size={60} />
        <Typography variant="h6" sx={{ ml: 2 }}>
          Loading instructor profile...
        </Typography>
      </Box>
    );
  }

  if (error) {
    return (
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
        <Button variant="contained" href="/courses" color="primary">
          Go to Courses
        </Button>
      </Container>
    );
  }

  if (!instructor) {
    return (
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Alert severity="warning" sx={{ mb: 3 }}>
          Instructor not found
        </Alert>
        <Button variant="contained" href="/courses" color="primary">
          Go to Courses
        </Button>
      </Container>
    );
  }

  const getSocialIcon = (type) => {
    switch (type.toLowerCase()) {
      case 'linkedin':
        return <LinkedIn color="primary" />;
      case 'github':
        return <GitHub />;
      case 'website':
        return <Language color="secondary" />;
      default:
        return <Language />;
    }
  };

  return (
    <Container maxWidth="lg" sx={{ py: 5 }}>
      {/* Hero Section */}
      <Paper 
        elevation={3} 
        sx={{
          p: { xs: 3, md: 5 },
          mb: 5,
          borderRadius: 2,
          backgroundImage: 'linear-gradient(135deg, #573f9d40 0%, #573f9d 100%)',
          color: 'white',
        }}
      >
        <Grid container spacing={4} alignItems="center">
          <Grid item xs={12} md={3} sx={{ display: 'flex', justifyContent: { xs: 'center', md: 'flex-start' } }}>
            <Avatar 
              src={instructor.profilePic} 
              alt={instructor.username}
              sx={{
                width: { xs: 120, sm: 160, md: 180 },
                height: { xs: 120, sm: 160, md: 180 },
                border: '5px solid rgba(255, 255, 255, 0.7)',
                boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
              }}
            />
          </Grid>
          <Grid item xs={12} md={9}>
            <Typography variant="h3" component="h1" sx={{ mb: 1, fontWeight: 700 }}>
              {instructor.username}
            </Typography>
            <Typography variant="h6" sx={{ mb: 2, opacity: 0.9 }}>
              {instructor.specialization || 'Instructor'}
            </Typography>
            
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 3 }}>
              <Chip 
                icon={<School />} 
                label={`${instructor.courses?.length || 0} Courses`} 
                sx={{ bgcolor: 'rgba(255,255,255,0.2)', color: 'white' }}
              />
              <Chip 
                icon={<People />} 
                label="Professional Instructor" 
                sx={{ bgcolor: 'rgba(255,255,255,0.2)', color: 'white' }}
              />
              <Chip 
                icon={<VerifiedUser />} 
                label="Verified" 
                sx={{ bgcolor: 'rgba(255,255,255,0.2)', color: 'white' }}
              />
            </Box>
            
            <Stack direction="row" spacing={2}>
              
              
              {instructor.links && instructor.links.urls && instructor.links.urls.length > 0 && (
                <Box sx={{ display: 'flex', gap: 1 }}>
                  {instructor.links.urls.map((link, index) => (
                    <Tooltip key={index} title={link.type || 'Website'}>
                      <IconButton 
                        href={link.url} 
                        target="_blank"
                        sx={{ 
                          bgcolor: 'rgba(255,255,255,0.2)', 
                          color: 'white',
                          '&:hover': {
                            bgcolor: 'rgba(255,255,255,0.3)',
                          }
                        }}
                      >
                        {getSocialIcon(link.type)}
                      </IconButton>
                    </Tooltip>
                  ))}
                </Box>
              )}
            </Stack>
          </Grid>
        </Grid>
      </Paper>

      <Grid container spacing={4}>
        {/* Left Column - About */}
        <Grid item xs={12} md={4}>
          <Paper elevation={2} sx={{ p: 3, borderRadius: 2, mb: 4 }}>
            <Typography variant="h5" component="h2" sx={{ mb: 2, fontWeight: 600 }}>
              About
            </Typography>
            <Divider sx={{ mb: 3 }} />
            <Typography variant="body1" sx={{ mb: 3, whiteSpace: 'pre-line' }}>
              {instructor.bio || 'No biography provided.'}
            </Typography>
            
            {instructor.specialization && (
              <Box sx={{ mb: 3 }}>
                <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1 }}>
                  Specialization
                </Typography>
                <Chip 
                  label={instructor.specialization} 
                  color="primary" 
                  variant="outlined"
                  sx={{ mr: 1 }}
                />
              </Box>
            )}
          </Paper>
          
          {instructor.resume && (
            <Paper elevation={2} sx={{ p: 3, borderRadius: 2 }}>
              <Typography variant="h5" component="h2" sx={{ mb: 2, fontWeight: 600 }}>
                Resume
              </Typography>
              <Divider sx={{ mb: 3 }} />
              {instructor?.resume?
              <Button 
              component="a"
                href={instructor.resume}
                target="_blank"
                rel="noopener noreferrer"
                
                variant="contained" 
                color="secondary"
                startIcon={<FileCopyRounded />}
                sx={{ 
                  bgcolor: 'white', 
                  color: 'primary.main',
                  '&:hover': {
                    bgcolor: 'rgba(255,255,255,0.9)',
                  }
                }}
              >
                Resume
              </Button>
              
              :""}
            </Paper>
          )}
        </Grid>

        {/* Right Column - Courses */}
        <Grid item xs={12} md={8}>
          <Paper elevation={2} sx={{ p: 3, borderRadius: 2 }}>
            <Typography variant="h5" component="h2" sx={{ mb: 2, fontWeight: 600 }}>
              Courses by {instructor.username}
            </Typography>
            <Divider sx={{ mb: 3 }} />
            
            {instructor.courses && instructor.courses.length > 0 ? (
              <Grid container spacing={3}>
                {instructor.courses.map((course) => (
                  <Grid item xs={12} sm={6} key={course.id}>
                    <Card 
                      elevation={2} 
                      sx={{ 
                        height: '100%', 
                        display: 'flex', 
                        flexDirection: 'column',
                        transition: 'transform 0.3s, box-shadow 0.3s',
                        '&:hover': {
                          transform: 'translateY(-5px)',
                          boxShadow: '0 12px 20px rgba(0,0,0,0.1)'
                        }
                      }}
                    >
                      <CardActionArea onClick={() => navigate(`/main/course/${course.id}`)}>
                        <CardMedia
                          component="img"
                          height="140"
                          image={course.thumbnail || 'https://via.placeholder.com/300x140?text=Course+Image'}
                          alt={course.title}
                        />
                        <CardContent sx={{ flexGrow: 1 }}>
                          <Typography gutterBottom variant="h6" component="div" noWrap>
                            {course.title}
                          </Typography>
                          
                          <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                            <Rating 
                              value={course.rating || 0} 
                              precision={0.5} 
                              readOnly 
                              size="small" 
                              sx={{ mr: 1 }}
                            />
                            <Typography variant="body2" color="text.secondary">
                              {course.rating || 0}
                            </Typography>
                          </Box>
                          
                          <Typography variant="body2" color="text.secondary" sx={{ 
                            height: '3em', 
                            overflow: 'hidden', 
                            display: '-webkit-box',
                            WebkitLineClamp: 2,
                            WebkitBoxOrient: 'vertical',
                            mb: 2
                          }}>
                            {course.description || 'No description available.'}
                          </Typography>
                          
                          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <Typography variant="h6" color="primary">
                              ${course.price || 0}
                            </Typography>
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                              <AccessTime fontSize="small" sx={{ mr: 0.5, color: 'text.secondary' }} />
                              <Typography variant="body2" color="text.secondary">
                                {course.duration || 0} hrs
                              </Typography>
                            </Box>
                          </Box>
                        </CardContent>
                      </CardActionArea>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            ) : (
              <Box sx={{ textAlign: 'center', py: 5 }}>
                <Book sx={{ fontSize: 60, color: 'text.disabled', mb: 2 }} />
                <Typography variant="h6" color="text.secondary">
                  No courses available from this instructor yet.
                </Typography>
              </Box>
            )}
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}

export default InstructorProfile;