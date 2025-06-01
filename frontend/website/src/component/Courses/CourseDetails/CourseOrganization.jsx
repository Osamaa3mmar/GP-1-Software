// React is needed for JSX
import { Paper, Typography, Box, Avatar, Chip, Divider } from '@mui/material';
import { Link } from 'react-router-dom';
import { School, ArrowForward } from '@mui/icons-material';

const CourseOrganization = ({ organization }) => {
  if (!organization) return null;
  
  return (
    <Paper 
      elevation={3} 
      sx={{ 
        p: 3, 
        my: 4, 
        borderRadius: 2,
        border: '1px solid #e0e0e0',
        transition: 'all 0.3s ease',
        '&:hover': {
          boxShadow: 6,
          borderColor: 'primary.light'
        }
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
        <School color="primary" sx={{ mr: 1 }} />
        <Typography 
          variant="h5" 
          fontWeight="600" 
          color="primary"
        >
          Offered By
        </Typography>
      </Box>
      
      <Divider sx={{ mb: 3 }} />
      
      {/* Organization Basic Info - Clickable */}
      <Link 
        to={`/main/academy/profile/${organization.id}`} 
        style={{ textDecoration: 'none', color: 'inherit' }}
      >
        <Box 
          sx={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: 3, 
            mb: 3, 
            p: 2,
            borderRadius: 2,
            border: '1px solid transparent',
            transition: 'all 0.2s ease',
            '&:hover': { 
              bgcolor: 'rgba(25, 118, 210, 0.04)', 
              borderColor: 'primary.light',
              transform: 'translateY(-2px)',
              cursor: 'pointer' 
            },
          }}
        >
          {organization.profile ? (
            <Avatar 
              src={organization.profile} 
              alt={organization.name}
              sx={{ 
                width: 110, 
                height: 110,
                border: '3px solid #e3f2fd',
                boxShadow: '0 4px 8px rgba(0,0,0,0.1)'
              }}
            />
          ) : (
            <Avatar 
              sx={{ 
                width: 110, 
                height: 110, 
                bgcolor: 'primary.main',
                border: '3px solid #e3f2fd',
                boxShadow: '0 4px 8px rgba(0,0,0,0.1)'
              }}
            >
              {organization.name?.charAt(0) || 'O'}
            </Avatar>
          )}
          <Box sx={{ flex: 1 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 0.5 }}>
              <Typography variant="h6" fontWeight="600">{organization.name}</Typography>
              <Chip 
                label="Organization" 
                size="small" 
                color="primary" 
                variant="outlined"
                sx={{ ml: 2, px: 1 }}
              />
            </Box>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
              Educational Institution
            </Typography>
            <Box sx={{ 
              display: 'flex', 
              alignItems: 'center', 
              color: 'primary.main',
              fontWeight: 'medium',
              '& svg': { transition: 'transform 0.2s ease' },
              '&:hover svg': { transform: 'translateX(3px)' }
            }}>
              <Typography variant="body2" fontWeight="500" color="primary.main">
                View Organization Profile
              </Typography>
              <ArrowForward fontSize="small" sx={{ ml: 0.5 }} />
            </Box>
          </Box>
        </Box>
      </Link>
      
      {/* Organization Description */}
      {organization.description && (
        <Box 
          sx={{ 
            px: 2, 
            py: 1.5, 
            bgcolor: 'background.paper',
            borderRadius: 2,
            borderLeft: '4px solid',
            borderColor: 'primary.main',
            boxShadow: '0 1px 3px rgba(0,0,0,0.05)'  
          }}
        >
          <Typography variant="body1" sx={{ lineHeight: 1.6 }}>
            {organization.description}
          </Typography>
        </Box>
      )}
    </Paper>
  );
};

export default CourseOrganization;
