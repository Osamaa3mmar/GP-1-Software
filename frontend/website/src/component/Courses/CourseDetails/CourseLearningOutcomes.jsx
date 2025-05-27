import { Accordion, AccordionSummary, AccordionDetails, Typography, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import { ExpandMore, Check } from '@mui/icons-material';

const CourseLearningOutcomes = ({ learningOutcomes }) => {
  return (
    <Accordion defaultExpanded sx={{ mb: 3 }}>
      <AccordionSummary expandIcon={<ExpandMore />}>
        <Typography variant="h5">Learning Outcomes</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <List>
          {learningOutcomes && Array.isArray(learningOutcomes) ? (
            learningOutcomes.map((outcome, index) => (
              <ListItem key={index}>
                <ListItemIcon>
                  <Check color="success" />
                </ListItemIcon>
                <ListItemText primary={outcome} />
              </ListItem>
            ))
          ) : (
            <Typography variant="body1" color="text.secondary">
              No learning outcomes specified for this course.
            </Typography>
          )}
        </List>
      </AccordionDetails>
    </Accordion>
  );
};

export default CourseLearningOutcomes;
