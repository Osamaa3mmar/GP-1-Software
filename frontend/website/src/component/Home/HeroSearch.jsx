import { Box, InputAdornment, TextField } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

export default function HeroSearch() {
  return (
    <Box sx={{ width: '100%', maxWidth: 800 }}>
      <TextField
        fullWidth
        placeholder="Search companies, or instructors..."
        variant="outlined"
        InputProps={{
          sx: { 
            backgroundColor: 'white',
            borderRadius: 2,
            height: 56,
          },
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon color="action" />
            </InputAdornment>
          ),
        }}
      />
    </Box>
  );
}