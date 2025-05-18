import { Card, CardContent, Stack, Typography, SvgIcon } from '@mui/material';

export default function CategoryItem({ category }) {
  return (
    <Card sx={{ 
      height: '100%',
      cursor: 'pointer',
      transition: 'all 0.2s',
      '&:hover': {
        transform: 'translateY(-4px)',
        boxShadow: 3
      }
    }}>
      <CardContent>
        <Stack spacing={2} alignItems="center" sx={{ py: 3 }}>
          <SvgIcon component={category.icon} fontSize="large" color="primary" />
          
          <Typography variant="h6" fontWeight={600}>
            {category.name}
          </Typography>
          
          <Typography variant="body2" color="text.secondary" textAlign="center">
            {category.count} courses
          </Typography>
        </Stack>
      </CardContent>
    </Card>
  );
}