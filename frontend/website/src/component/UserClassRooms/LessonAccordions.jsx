import { Paper, Typography } from '@mui/material';
import { LessonAccordionItem } from './LessonAccordionItem';

export const LessonAccordions = ({ lessons }) => (
  <Paper sx={{ flex: 1, p: 2 }}>
    <Typography variant="h6" gutterBottom>
      Course Lessons
    </Typography>
    {lessons.length > 0 ? (
      lessons.map((lesson) => (
        <LessonAccordionItem key={lesson.id} lesson={lesson} />
      ))
    ) : (
      <Typography variant="body2" color="text.secondary">
        No lessons available for this classroom
      </Typography>
    )}
  </Paper>
);