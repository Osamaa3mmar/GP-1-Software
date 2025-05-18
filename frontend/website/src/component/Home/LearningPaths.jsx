import { Box, Container, Typography, Card, CardContent, LinearProgress, Stack } from '@mui/material';
import SpecialHeading from './SpecialHeading';

export default function LearningPaths({ paths }) {
  return (
    <Box sx={{ py: 8, bgcolor: 'background.paper' }}>
      <Container maxWidth="lg">
        <SpecialHeading>Learning Paths</SpecialHeading>
        
        <Stack spacing={3}>
          {paths.map(path => (
            <Card key={path.id} variant="outlined">
              <CardContent>
                <Stack spacing={2}>
                  <Typography variant="h6" fontWeight={600}>{path.title}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    {path.description}
                  </Typography>
                  <Stack direction="row" spacing={2} alignItems="center">
                    <Typography variant="body2">{path.courses} courses</Typography>
                    <LinearProgress 
                      variant="determinate" 
                      value={path.progress} 
                      sx={{ width: '100%', height: 8, borderRadius: 4 }}
                    />
                    <Typography variant="body2">{path.progress}%</Typography>
                  </Stack>
                </Stack>
              </CardContent>
            </Card>
          ))}
        </Stack>
      </Container>
    </Box>
  );
}