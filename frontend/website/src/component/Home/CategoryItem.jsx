import { Card, CardContent, Stack, Typography, SvgIcon, Box } from '@mui/material';

export default function CategoryItem({ category }) {
  // Process the category name to handle the '&' character
  const formatCategoryName = (name) => {
    if (name.includes('&')) {
      // Split the name at '&' and return each part on a new line
      return name.split('&').map((part, index) => (
        <Box key={index} sx={{ textAlign: 'center', lineHeight: 1.2 }}>
          {index > 0 && <Box component="span" sx={{ display: 'inline' }}>&</Box>}
          {part.trim()}
        </Box>
      ));
    }
    return name;
  };

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
          
          <Typography variant="h6" fontWeight={600} sx={{ minHeight: '3rem', display: 'flex', alignItems: 'center' }}>
            {formatCategoryName(category.name)}
          </Typography>
          
          <Typography variant="body2" color="text.secondary" textAlign="center">
            {category.count} courses
          </Typography>
        </Stack>
      </CardContent>
    </Card>
  );
}