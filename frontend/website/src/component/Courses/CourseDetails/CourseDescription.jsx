import { Paper, Typography, Divider, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import { Check } from '@mui/icons-material';

const CourseDescription = ({ course, courseTags }) => {
  return (
    <Paper elevation={2} sx={{ p: 3, my: 4 }}>
      <Typography variant="h5" gutterBottom>Course Description</Typography>
      <Typography paragraph>{course.description || "No description available."}</Typography>
      
      {courseTags.requirements && Array.isArray(courseTags.requirements) && courseTags.requirements.length > 0 && (
        <>
          <Divider sx={{ my: 2 }} />
          <Typography variant="h5" gutterBottom>Requirements</Typography>
          <List>
            {courseTags.requirements.map((req, i) => (
              <ListItem key={i} sx={{ py: 0.5 }}>
                <ListItemIcon>
                  <Check color="primary" />
                </ListItemIcon>
                <ListItemText primary={req} />
              </ListItem>
            ))}
          </List>
        </>
      )}
      
      {/* Prerequisites if available */}
      {course.prerequisites && (
        <>
          <Divider sx={{ my: 2 }} />
          <Typography variant="h5" gutterBottom>Prerequisites</Typography>
          <Typography paragraph>{course.prerequisites}</Typography>
        </>
      )}
    </Paper>
  );
};

export default CourseDescription;
