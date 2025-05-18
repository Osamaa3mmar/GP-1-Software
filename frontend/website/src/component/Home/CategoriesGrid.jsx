import { Container, Grid, Box} from '@mui/material';
import CategoryItem from './CategoryItem';
import SpecialHeading from './SpecialHeading';

export default function CategoriesGrid({ categories }) {
  return (
    <Box sx={{ py: 8, bgcolor: 'background.paper' }}>
      <Container maxWidth="lg">
        <SpecialHeading>Popular Categories</SpecialHeading>
        
        <Grid container spacing={3}>
          {categories.map(category => (
            <Grid item xs={6} sm={4} md={3} key={category.id}>
              <CategoryItem category={category} />
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}