import { useState, useEffect } from 'react';
import { 
  Box, 
  Typography, 
  Paper, 
  Tabs, 
  Tab,
  Divider,
  Button,
  TextField,
  Grid,
  Card,
  CardContent,
  CardMedia,
  CardActionArea,
  Chip,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  CircularProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions
} from '@mui/material';
import { 
  Edit as EditIcon,
  Save as SaveIcon,
  School as SchoolIcon,
  Book as BookIcon,
  Quiz as QuizIcon,
  Assignment as AssignmentIcon
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

export default function RightComponent({ user, isCurrentUser }) {
  const [tabValue, setTabValue] = useState(0);
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(false);
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [activities, setActivities] = useState([]);
  const [userForm, setUserForm] = useState({
    name: '',
    email: '',
    phone: '',
    location: '',
    education: '',
    occupation: '',
    bio: ''
  });
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      setUserForm({
        name: user.username || '',
        email: user.email || '',
        phone: user.phone || '',
        location: user.location || '',
        education: user.education || '',
        occupation: user.specialization || '',
        bio: user.bio || ''
      });
      
      // Fetch enrolled courses
      fetchEnrolledCourses();
      
      // Fetch user activities
      fetchUserActivities();
    }
  }, [user]);

  const fetchEnrolledCourses = async () => {
    if (!user?.id) return;
    
    try {
      // Enrollments are already included in the user data from the backend
      if (user.enrollments) {
        setEnrolledCourses(user.enrollments);
      }
    } catch (error) {
      console.error('Error processing enrolled courses:', error);
    }
  };

  const fetchUserActivities = async () => {
    if (!user?.id) return;
    
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/v1/user/${user.id}/activities`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        }
      );
      
      if (response.data && response.data.activities) {
        setActivities(response.data.activities);
      }
    } catch (error) {
      console.error('Error fetching user activities:', error);
    }
  };

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSaveProfile = async () => {
    try {
      setLoading(true);
      
      // Update bio first
      const bioResponse = await axios.post(
        `http://localhost:4545/user/edit/bio`,
        { bio: userForm.bio },
        {
          headers: {
            token: localStorage.getItem('token')
          }
        }
      );
      
      // Update specialization if available
      if (userForm.occupation) {
        await axios.post(
          `http://localhost:4545/user/edit/specialization`,
          { specialization: userForm.occupation },
          {
            headers: {
              token: localStorage.getItem('token')
            }
          }
        );
      }
      
      toast.success('Profile updated successfully!');
      setEditMode(false);
      
      // Refresh user data
      window.location.reload();
      
    } catch (error) {
      console.error('Error updating profile:', error);
      toast.error('Failed to update profile: ' + (error.response?.data?.message || error.message));
    } finally {
      setLoading(false);
    }
  };

  const renderProfileTab = () => (
    <Box sx={{ mt: 2 }}>
      {editMode ? (
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Name"
              name="name"
              value={userForm.name}
              onChange={handleInputChange}
              margin="normal"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Email"
              name="email"
              value={userForm.email}
              onChange={handleInputChange}
              margin="normal"
              disabled
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Phone"
              name="phone"
              value={userForm.phone}
              onChange={handleInputChange}
              margin="normal"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Location"
              name="location"
              value={userForm.location}
              onChange={handleInputChange}
              margin="normal"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Education"
              name="education"
              value={userForm.education}
              onChange={handleInputChange}
              margin="normal"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Occupation"
              name="occupation"
              value={userForm.occupation}
              onChange={handleInputChange}
              margin="normal"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Bio"
              name="bio"
              value={userForm.bio}
              onChange={handleInputChange}
              margin="normal"
              multiline
              rows={4}
            />
          </Grid>
          <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
            <Button 
              variant="outlined" 
              onClick={() => setEditMode(false)} 
              sx={{ mr: 1 }}
            >
              Cancel
            </Button>
            <Button 
              variant="contained" 
              startIcon={loading ? <CircularProgress size={20} /> : <SaveIcon />}
              onClick={handleSaveProfile}
              disabled={loading}
            >
              {loading ? 'Saving...' : 'Save Changes'}
            </Button>
          </Grid>
        </Grid>
      ) : (
        <Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
            <Typography variant="h6">Profile Information</Typography>
            {isCurrentUser && (
              <Button 
                variant="outlined" 
                startIcon={<EditIcon />}
                onClick={() => setEditMode(true)}
                size="small"
              >
                Edit Profile
              </Button>
            )}
          </Box>
          
          <Divider sx={{ mb: 3 }} />
          
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant="body1" sx={{ mb: 2 }}>
                {userForm.bio || 'No bio provided yet.'}
              </Typography>
            </Grid>
            
            <Grid item xs={12} sm={6}>
              <Typography variant="subtitle2" color="text.secondary">
                Name
              </Typography>
              <Typography variant="body1" sx={{ mb: 2 }}>
                {userForm.name || 'Not provided'}
              </Typography>
            </Grid>
            
            <Grid item xs={12} sm={6}>
              <Typography variant="subtitle2" color="text.secondary">
                Email
              </Typography>
              <Typography variant="body1" sx={{ mb: 2 }}>
                {userForm.email || 'Not provided'}
              </Typography>
            </Grid>
            
            <Grid item xs={12} sm={6}>
              <Typography variant="subtitle2" color="text.secondary">
                Phone
              </Typography>
              <Typography variant="body1" sx={{ mb: 2 }}>
                {userForm.phone || 'Not provided'}
              </Typography>
            </Grid>
            
            <Grid item xs={12} sm={6}>
              <Typography variant="subtitle2" color="text.secondary">
                Location
              </Typography>
              <Typography variant="body1" sx={{ mb: 2 }}>
                {userForm.location || 'Not provided'}
              </Typography>
            </Grid>
            
            <Grid item xs={12} sm={6}>
              <Typography variant="subtitle2" color="text.secondary">
                Education
              </Typography>
              <Typography variant="body1" sx={{ mb: 2 }}>
                {userForm.education || 'Not provided'}
              </Typography>
            </Grid>
            
            <Grid item xs={12} sm={6}>
              <Typography variant="subtitle2" color="text.secondary">
                Occupation
              </Typography>
              <Typography variant="body1" sx={{ mb: 2 }}>
                {userForm.occupation || 'Not provided'}
              </Typography>
            </Grid>
          </Grid>
        </Box>
      )}
    </Box>
  );

  const renderCoursesTab = () => (
    <Box sx={{ mt: 2 }}>
      {enrolledCourses.length === 0 ? (
        <Typography variant="body1" color="text.secondary" sx={{ textAlign: 'center', py: 4 }}>
          No enrolled courses found.
        </Typography>
      ) : (
        <Grid container spacing={2}>
          {enrolledCourses.map((enrollment) => (
            <Grid item xs={12} sm={6} md={4} key={enrollment.id}>
              <Card sx={{ height: '100%' }}>
                <CardActionArea onClick={() => navigate(`/main/course/${enrollment.course.id}`)}>
                  <CardMedia
                    component="img"
                    height="140"
                    image={enrollment.course.coverImage || 'https://source.unsplash.com/random?education'}
                    alt={enrollment.course.title}
                  />
                  <CardContent>
                    <Typography variant="h6" noWrap>
                      {enrollment.course.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                      {enrollment.course.instructor}
                    </Typography>
                    <Chip 
                      size="small" 
                      label={enrollment.status} 
                      color={enrollment.status === 'completed' ? 'success' : 'primary'}
                      sx={{ mr: 1 }}
                    />
                    <Chip 
                      size="small" 
                      label={`${enrollment.progress || 0}% Complete`} 
                      variant="outlined"
                    />
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );

  const renderActivityTab = () => (
    <Box sx={{ mt: 2 }}>
      {activities.length === 0 ? (
        <Typography variant="body1" color="text.secondary" sx={{ textAlign: 'center', py: 4 }}>
          No recent activities found.
        </Typography>
      ) : (
        <List>
          {activities.map((activity) => (
            <ListItem key={activity.id} alignItems="flex-start" sx={{ borderBottom: '1px solid #eee', py: 2 }}>
              <ListItemAvatar>
                <Avatar sx={{ bgcolor: getActivityIconColor(activity.type) }}>
                  {getActivityIcon(activity.type)}
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={activity.title}
                secondary={
                  <>
                    <Typography component="span" variant="body2" color="text.primary">
                      {activity.description}
                    </Typography>
                    <br />
                    <Typography component="span" variant="caption" color="text.secondary">
                      {new Date(activity.timestamp).toLocaleString()}
                    </Typography>
                  </>
                }
              />
            </ListItem>
          ))}
        </List>
      )}
    </Box>
  );

  const getActivityIcon = (type) => {
    switch (type) {
      case 'course':
        return <BookIcon />;
      case 'quiz':
        return <QuizIcon />;
      case 'assignment':
        return <AssignmentIcon />;
      default:
        return <SchoolIcon />;
    }
  };

  const getActivityIconColor = (type) => {
    switch (type) {
      case 'course':
        return 'primary.main';
      case 'quiz':
        return 'secondary.main';
      case 'assignment':
        return 'warning.main';
      default:
        return 'info.main';
    }
  };

  return (
    <Paper elevation={2} sx={{ p: 3, borderRadius: 2 }}>
      <Tabs 
        value={tabValue} 
        onChange={handleTabChange}
        indicatorColor="primary"
        textColor="primary"
        variant="fullWidth"
      >
        <Tab label="Profile" />
        <Tab label="Courses" />
        <Tab label="Activity" />
      </Tabs>
      
      <Box sx={{ mt: 3 }}>
        {tabValue === 0 && renderProfileTab()}
        {tabValue === 1 && renderCoursesTab()}
        {tabValue === 2 && renderActivityTab()}
      </Box>
    </Paper>
  );
}
