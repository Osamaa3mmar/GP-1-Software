import { useEffect, useState, useCallback } from 'react';
import { 
  Box, 
  Container, 
  Divider, 
  useTheme,
  useMediaQuery,
  Typography,
  LinearProgress,
  Paper,
  Chip
} from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

// Import our profile components
import ProfileCircle from '../../component/myProfile/ProfileCircle';
import Bio from '../../component/myProfile/Bio';
import Links from '../../component/myProfile/Links';
import Courses from '../../component/myProfile/Courses';
import BackButton from '../../component/myProfile/BackButton';
import EditBio from '../../component/myProfile/EditBio';
import EditSpecialization from '../../component/myProfile/EditSpecialization';
import EditName from '../../component/myProfile/EditName';
import AddLink from '../../component/myProfile/AddLink';
import CustomDialog from '../../component/myProfile/CustomDialog';
import EnrollmentsInfo from '../../component/myProfile/EnrollmentsInfo';
import LearningStats from '../../component/myProfile/LearningStats';
import ContinueLearning from '../../component/myProfile/ContinueLearning';

// Profile Banner Component
const ProfileBanner = ({ image, children }) => {
  return (
    <Box
      sx={{
        position: 'relative',
        height: 200,
        width: '100%',
        backgroundImage: `url(${image})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0,0,0,0.4)',
          backdropFilter: 'blur(7px)',
        }
      }}
    >
      <Box sx={{ p: 2, position: 'relative', zIndex: 2 }}>
        <BackButton />
      </Box>
      {children}
    </Box>
  );
};

export default function RealProfile() {
  const { id } = useParams();
  const navigate = useNavigate(); // Keep navigate as it's used in children components
  const theme = useTheme();
  // We'll use isMobile for responsive adjustments to the layout
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  
  const [user, setUser] = useState(null);
  const [userId, setUserId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [token] = useState(localStorage.getItem('token')); // Remove setter as it's unused
  
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogContent, setDialogContent] = useState(null);
  const [dialogTitle, setDialogTitle] = useState('');
  
  // Determine if this is the current user's profile
  const [isMe, setIsMe] = useState(false);
  
  // No longer needed as BackButton component handles this
  // const handleBack = () => {
  //   navigate(-1);
  // };
  
  // These styles are no longer needed as we use MUI's responsive features directly
  // const responsiveStyles = {
  //   container: {
  //     padding: isMobile ? '8px' : '16px'
  //   }
  // };
  
  const handleDialog = (type) => {
    setDialogTitle(type === 'bio' ? 'Edit Bio' : 
                   type === 'specialization' ? 'Edit Specialization' : 
                   type === 'name' ? 'Edit Name' : 
                   'Add Link');
    
    if (type === 'bio') {
      setDialogContent(
        <EditBio 
          update={getProfileData} 
          onClose={() => setDialogOpen(false)} 
        />
      );
    } else if (type === 'specialization') {
      setDialogContent(
        <EditSpecialization 
          update={getProfileData} 
          onClose={() => setDialogOpen(false)} 
        />
      );
    } else if (type === 'name') {
      setDialogContent(
        <EditName 
          update={getProfileData} 
          onClose={() => setDialogOpen(false)} 
        />
      );
    } else if (type === 'Add Link') {
      setDialogContent(
        <AddLink 
          update={getProfileData} 
          onClose={() => setDialogOpen(false)} 
        />
      );
    }
    
    setDialogOpen(true);
  };
  
  // Use useCallback to memoize functions and prevent dependency cycle
  const getUserId = useCallback(async () => {
    try {
      if (!token) return;
      
      const { data } = await axios.get('/user/me', {
        headers: { token }
      });
      
      setUserId(data.user.id);
      setIsMe(id ? id === data.user.id : true);
    } catch (error) {
      console.error('Error getting user ID:', error);
    }
  }, [id, token]); // Stable dependencies
  
  const getProfileData = useCallback(async () => {
    // Don't fetch if already loading
    if (loading) return;
    
    try {
      setLoading(true);
      
      // Use different endpoints based on if it's the current user's profile or another user's profile
      let response;
      if (!id || id === userId) {
        // Fetch current user's profile with enhanced data
        response = await axios.get('http://localhost:4545/user/my-profile', {
          headers: { token }
        });
      } else {
        // Fetch another user's profile
        response = await axios.post('http://localhost:4545/user/fullprofile', {
          id
        }, {
          headers: { token }
        });
      }

      setUser(response.data.user);
      
      // If this is the current user, update userId
      if (!id && !userId && response.data.user.id) {
        setUserId(response.data.user.id);
      }
    } catch (error) {
      console.error('Error fetching profile data:', error);
    } finally {
      setLoading(false);
    }
  }, [id, userId, token, loading]); // Stable dependencies
  
  // Combined effect for initialization
  useEffect(() => {
    // Set axios base URL once
    axios.defaults.baseURL = 'http://localhost:4545';
    
    // First, get user ID
    if (!userId) {
      getUserId();
    }
    
    // Only fetch profile data if we have enough info
    if ((userId && !user) || id) {
      getProfileData();
    }
    
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, userId]); // Only re-run if ID changes
  
  // Add navigation function to view enrolled courses
  const navigateToCourse = useCallback((courseId) => {
    navigate(`/main/course/${courseId}`);
  }, [navigate]);
  
  return (
    <Container maxWidth="lg" disableGutters>
      {loading ? (
        // Loading skeleton
        <Box sx={{ p: 4 }}>
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', mt: 10 }}>
            <Typography variant="h5" sx={{ mb: 2 }}>Loading profile...</Typography>
            <LinearProgress sx={{ width: '80%', mb: 4 }} />
          </Box>
        </Box>
      ) : (
        <>
          <Box sx={{ position: 'relative', mb: isMobile ? 8 : 12 }}>
            <ProfileBanner image={user?.profilePic || 'https://source.unsplash.com/random/1200x600/?gradient'} />
            <ProfileCircle 
              image={user?.profilePic} 
              name={user?.username} 
              specialization={user?.specialization} 
              isEdit={isMe} 
              onEdit={handleDialog}
            />
          </Box>

          <Box sx={{ px: isMobile ? 2 : 4 }}>
            <Box sx={{ maxWidth: 900, mx: 'auto' }}>
              {/* User interests display */}
              {user?.interests && user.interests.length > 0 && (
                <Paper sx={{ p: 2, mb: 3, borderRadius: 2, boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
                  <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 1 }}>
                    Interests
                  </Typography>
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                    {user.interests.map((interest, index) => (
                      <Chip 
                        key={index}
                        label={`#${interest}`}
                        size="small"
                        sx={{ 
                          bgcolor: 'rgba(102, 94, 223, 0.1)', 
                          color: 'rgba(102, 94, 223, 1)',
                          fontWeight: 500
                        }}
                      />
                    ))}
                  </Box>
                </Paper>
              )}

              <Bio 
                text={user?.bio} 
                isEdit={isMe}
                onEdit={() => handleDialog('bio')}
              />
              
              <Links 
                links={user?.links || []} 
                isEdit={isMe}
                onPress={handleDialog}
              />
              
              <Paper sx={{ 
                p: 3, 
                mb: 3, 
                borderRadius: 2,
                bgcolor: 'rgba(102, 94, 223, 0.03)', 
                border: '1px solid rgba(102, 94, 223, 0.1)',
                boxShadow: '0 2px 8px rgba(0,0,0,0.05)'
              }}>
                <Typography variant="h6" sx={{ mb: 2, fontWeight: 500 }}>
                  Account Information
                </Typography>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
                  <Box>
                    <Typography variant="caption" color="text.secondary">
                      Username
                    </Typography>
                    <Typography variant="body1" sx={{ fontWeight: 500 }}>
                      {user?.username || 'N/A'}
                    </Typography>
                  </Box>
                  <Box>
                    <Typography variant="caption" color="text.secondary">
                      Member since
                    </Typography>
                    <Typography variant="body1">
                      {user?.createdAt ? new Date(user.createdAt).toLocaleDateString(undefined, {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      }) : 'N/A'}
                    </Typography>
                  </Box>
                  <Box>
                    <Typography variant="caption" color="text.secondary">
                      Email
                    </Typography>
                    <Typography variant="body1">
                      {user?.email || 'N/A'}
                    </Typography>
                  </Box>
                  <Box>
                    <Typography variant="caption" color="text.secondary">
                      Email Verified
                    </Typography>
                    <Typography variant="body1">
                      {user?.verifyEmail ? 'Yes' : 'No'}
                    </Typography>
                  </Box>
                  <Box>
                    <Typography variant="caption" color="text.secondary">
                      Role
                    </Typography>
                    <Typography variant="body1" sx={{ textTransform: 'capitalize' }}>
                      {user?.role || 'User'}
                    </Typography>
                  </Box>
                </Box>
              </Paper>
              
              <Divider sx={{ my: 3 }} />
              
              <EnrollmentsInfo enrollments={user?.enrollments || []} />
              
              <LearningStats userId={id} />
              
              <ContinueLearning />
              
              <Courses 
                courses={user?.enrollments || []} 
                onCourseClick={navigateToCourse}
              />
            </Box>
          </Box>
        </>
      )}
      
      {/* Dialog for editing profile elements */}
      <CustomDialog
        open={dialogOpen}
        onClose={() => {
          setDialogOpen(false);
        }}
        title={dialogTitle}
      >
        {dialogContent}
      </CustomDialog>
    </Container>
  );
}
