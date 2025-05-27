import { Accordion, AccordionSummary, AccordionDetails, Typography, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import { ExpandMore, School } from '@mui/icons-material';

const CourseLearningPath = ({ learningPath }) => {
  return (
    <Accordion defaultExpanded sx={{ mb: 3 }}>
      <AccordionSummary expandIcon={<ExpandMore />}>
        <Typography variant="h5">Learning Path</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <List>
          {learningPath && Array.isArray(learningPath) ? (
            learningPath.map((path, index) => (
              <ListItem key={index}>
                <ListItemIcon>
                  <School color="primary" />
                </ListItemIcon>
                <ListItemText primary={path} />
              </ListItem>
            ))
          ) : (
            <Typography variant="body1" color="text.secondary">
              No learning path specified for this course.
            </Typography>
          )}
        </List>
      </AccordionDetails>
    </Accordion>
  );
};

export default CourseLearningPath;
