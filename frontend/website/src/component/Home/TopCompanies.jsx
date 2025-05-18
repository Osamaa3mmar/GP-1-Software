import { Box, Container, Stack, Avatar } from '@mui/material';
import SpecialHeading from './SpecialHeading';

export default function TopCompanies({ companies }) {
  return (
    <Box sx={{ py: 8 }}>
      <Container maxWidth="lg">
        <SpecialHeading>Top Companies</SpecialHeading>
        <Stack direction="row" spacing={4} justifyContent="center">
          {companies.map(company => (
            <Avatar 
              key={company.id}
              src={company.logo}
              alt={company.name}
              sx={{ 
                width: 100, 
                height: 100,
                boxShadow: 3,
                '&:hover': { transform: 'scale(1.1)' ,cursor: 'pointer' },
              }}
            />
          ))}
        </Stack>
      </Container>
    </Box>
  );
}