// React is needed for JSX
import { Paper, Typography, Box, Avatar, Rating } from '@mui/material';

const CourseReviews = ({ reviews }) => {
  if (!reviews || !Array.isArray(reviews) || reviews.length === 0) return null;
  
  return (
    <Paper elevation={2} sx={{ p: 3, my: 4 }}>
      <Typography variant="h5" gutterBottom>Student Reviews</Typography>
      {reviews.map((review, index) => (
        <Box key={index} sx={{ mb: 3, p: 2, border: '1px solid', borderColor: 'divider', borderRadius: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
            <Avatar sx={{ mr: 2 }} />
            <Rating value={review.rating} readOnly />
            <Typography variant="subtitle2" sx={{ ml: 2 }}>{review.date}</Typography>
          </Box>
          <Typography>{review.comment}</Typography>
        </Box>
      ))}
    </Paper>
  );
};

export default CourseReviews;
