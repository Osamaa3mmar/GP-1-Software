import { Accordion, AccordionSummary, AccordionDetails, Typography, Link } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

export const LessonAccordionItem = ({ lesson }) => (
  <Accordion>
    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
      <Typography sx={{ width: '33%', flexShrink: 0 }}>{lesson.title}</Typography>
      <Typography sx={{ color: 'text.secondary' }}>{lesson.duration}</Typography>
    </AccordionSummary>
    <AccordionDetails>
      <Typography variant="body2" gutterBottom>
        {lesson.description}
      </Typography>
      <Link
        href={lesson.recordingLink}
        target="_blank"
        rel="noopener"
        sx={{ mr: 2 }}
      >
        View Recording
      </Link>
      <Link
        href={lesson.quizLink}
        target="_blank"
        rel="noopener"
      >
        Take Quiz
      </Link>
    </AccordionDetails>
  </Accordion>
);