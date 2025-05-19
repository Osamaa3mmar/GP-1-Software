import { Card, CardContent, CardMedia, Typography, Button, Grid, Box } from '@mui/material';
import { useCart } from "../../contexts/CartContext";


const SuggestedCourses = ({ courses }) => {
  const { addToCart } = useCart();
  return (
    <Box sx={{ p: 3, boxShadow: 3, mb: 4 }}>
      <Typography variant="h5" gutterBottom>
        Alternative Courses for Conflicts Between:
      </Typography>
      <Typography color="error.main" sx={{ mb: 2 }}>
        {conflictNames.join(", ")}
      </Typography>
      <Grid container spacing={3}>
        {courses.map((course) => (
          <Grid item xs={12} md={6} lg={4} key={course.id}>
            {/* Enhanced Course Card */}
            <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
              <CardMedia
                component="img"
                height="140"
                image={course.thumbnail}
                alt={course.title}
                sx={{ objectFit: 'cover' }}
              />
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography gutterBottom variant="h6">
                  {course.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {course.teacher.username}
                </Typography>
                <Box sx={{ mt: 1, display: 'flex', alignItems: 'center' }}>
                  <Rating value={course.rating.value} precision={0.5} readOnly />
                  <Typography variant="body2" sx={{ ml: 1 }}>
                    ({course.rating.count} reviews)
                  </Typography>
                </Box>
              </CardContent>
              <CardActions sx={{ justifyContent: 'space-between', p: 2 }}>
                <Typography variant="h6">
                  ${course.price}
                </Typography>
                <Button 
                  variant="contained"
                  onClick={() => addToCart(course)}
                >
                  Add Alternative
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
export default SuggestedCourses;