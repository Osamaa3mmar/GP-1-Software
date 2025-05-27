import React from 'react';
import { Accordion, AccordionSummary, AccordionDetails, Typography, Box } from '@mui/material';
import { ExpandMore, PlayCircle } from '@mui/icons-material';

const CourseCurriculum = ({ topics }) => {
  return (
    <Accordion defaultExpanded sx={{ mb: 3 }}>
      <AccordionSummary expandIcon={<ExpandMore />}>
        <Typography variant="h5">Curriculum</Typography>
      </AccordionSummary>
      <AccordionDetails>
        {topics && Array.isArray(topics) && topics.length > 0 ? (
          topics.map((module, index) => (
            <Accordion key={index} sx={{ mb: 1 }}>
              <AccordionSummary expandIcon={<ExpandMore />}>
                <Typography variant="h6">{module.module}</Typography>
              </AccordionSummary>
              <AccordionDetails>
                {module?.lessons?.map((lesson, idx) => (
                  <Box key={idx} sx={{ display: 'flex', alignItems: 'center', p: 1 }}>
                    <PlayCircle sx={{ mr: 2, color: 'text.secondary' }} />
                    <Typography>{lesson}</Typography>
                  </Box>
                ))}
              </AccordionDetails>
            </Accordion>
          ))
        ) : (
          <Typography variant="body1" color="text.secondary">
            No curriculum specified for this course.
          </Typography>
        )}
      </AccordionDetails>
    </Accordion>
  );
};

export default CourseCurriculum;
