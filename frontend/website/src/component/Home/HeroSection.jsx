import { Box, Container, Typography, Button, Stack } from '@mui/material';
import HeroSearch from './HeroSearch';
import { useNavigate } from 'react-router-dom';

export default function HeroSection() {
  const navigate = useNavigate();
  return (
    <Box sx={{
      background: 'linear-gradient(135deg, #6366f1 0%, #a855f7 100%)',
      py: { xs: 6, md: 10 },
      color: 'white',
    }}>
      <Container maxWidth="lg">
        <Stack spacing={4} alignItems="center">
          <Typography variant="h2" textAlign="center" fontWeight={700}>
            Transform Your Career with Expert-Led Courses
          </Typography>
          
          <Typography variant="h5" textAlign="center" sx={{ opacity: 0.9 }}>
            Learn from industry leaders at top companies
          </Typography>

          <HeroSearch />

          <Stack direction="row" spacing={2}>
            {/* <Button variant="contained" size="large" color="secondary">
              Explore Courses
            </Button> */}
            <Button onClick={() => {navigate("/main/courses")}} variant="outlined" size="large" color="inherit">
              Explore Courses
            </Button>
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
}