import { Card, CardMedia, CardContent, Typography, Stack, Chip, Rating } from '@mui/material';

export default function CourseCard({ course }) {
  return (
    <Card sx={{ 
      height: '100%',
      transition: 'transform 0.2s',
      '&:hover': { transform: 'translateY(-4px)' }
    }}>
      <CardMedia
        component="img"
        height="200"
        image={course.image}
        alt={course.title}
      />
      <CardContent>
        <Stack spacing={1.5}>
          <Chip label={course.category} size="small" sx={{ width: 'fit-content' }} />
          
          <Typography variant="h6" fontWeight={600}>
            {course.title}
          </Typography>
          
          <Typography variant="body2" color="text.secondary">
            {course.company} • {course.instructor}
          </Typography>
          
          <Stack direction="row" alignItems="center" spacing={1}>
            <Rating value={course.rating} precision={0.5} readOnly size="small" />
            <Typography variant="body2">
              ({course.reviews} reviews)
            </Typography>
          </Stack>
          
          <Typography variant="h6" color="primary" fontWeight={600}>
            ${course.price}
          </Typography>
        </Stack>
      </CardContent>
    </Card>
  );
}