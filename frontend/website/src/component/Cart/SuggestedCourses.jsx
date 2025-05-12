import { Card, CardContent, CardMedia, Typography, Button, Grid, Box } from '@mui/material';
import { useCart } from "../../contexts/CartContext";


const SuggestedCourses = ({ courses }) => {
  const { addToCart } = useCart();
  return (
    <Box sx={{ p: 3, boxShadow: 3, mb: 4 }}>
      <Typography variant="h5" gutterBottom>
        Suggested Courses to Resolve Conflicts
      </Typography>
      <Grid container spacing={3}>
        {courses.map((course) => (
          <Grid item xs={12} md={4} key={course.id}>
            <Card>
              {/* ... existing card content ... */}
              <Button 
                variant="contained" 
                color="primary"
                onClick={() => addToCart(course)}
              >
                Add to Cart
              </Button>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
export default SuggestedCourses;