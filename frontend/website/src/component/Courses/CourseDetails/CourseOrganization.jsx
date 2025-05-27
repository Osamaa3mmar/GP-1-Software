// React is needed for JSX
import { Paper, Typography, Box, Avatar, Chip, Grid } from '@mui/material';

const CourseOrganization = ({ organization, formatDate }) => {
  if (!organization) return null;
  
  return (
    <Paper elevation={2} sx={{ p: 3, my: 4 }}>
      <Typography variant="h5" gutterBottom>Offered By</Typography>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
        {organization.profile ? (
          <Avatar 
            src={organization.profile} 
            alt={organization.name}
            sx={{ width: 100, height: 100 }}
          />
        ) : (
          <Avatar sx={{ width: 100, height: 100, bgcolor: 'primary.main' }}>
            {organization.name?.charAt(0) || 'O'}
          </Avatar>
        )}
        <Box>
          <Typography variant="h6">{organization.name}</Typography>
          {organization.isVerified && (
            <Chip size="small" color="success" label="Verified Organization" sx={{ mt: 0.5 }} />
          )}
        </Box>
      </Box>
      
      {organization.description && (
        <Box sx={{ mb: 2 }}>
          <Typography variant="body1">{organization.description}</Typography>
        </Box>
      )}
      
      <Grid container spacing={2} sx={{ mt: 1 }}>
        {organization.website && (
          <Grid item xs={12} sm={6}>
            <Typography variant="body2" color="text.secondary">
              <strong>Website:</strong> <a href={organization.website} target="_blank" rel="noopener noreferrer">{organization.website}</a>
            </Typography>
          </Grid>
        )}
        {organization.contactEmail && (
          <Grid item xs={12} sm={6}>
            <Typography variant="body2" color="text.secondary">
              <strong>Contact Email:</strong> {organization.contactEmail}
            </Typography>
          </Grid>
        )}
        {organization.phoneNumber && (
          <Grid item xs={12} sm={6}>
            <Typography variant="body2" color="text.secondary">
              <strong>Phone:</strong> {organization.phoneNumber}
            </Typography>
          </Grid>
        )}
        {organization.location && (
          <Grid item xs={12} sm={6}>
            <Typography variant="body2" color="text.secondary">
              <strong>Location:</strong> {organization.location}
            </Typography>
          </Grid>
        )}
        {organization.foundedDate && (
          <Grid item xs={12} sm={6}>
            <Typography variant="body2" color="text.secondary">
              <strong>Founded:</strong> {formatDate(organization.foundedDate)}
            </Typography>
          </Grid>
        )}
      </Grid>
    </Paper>
  );
};

export default CourseOrganization;
