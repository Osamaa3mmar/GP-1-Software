import { Box, Typography } from "@mui/material";

export default function Text() {
  return (
    <Box>
        <Typography variant="h5" gutterBottom>
        Select your role
        </Typography>
        <Typography color="text.secondary" variant="body2" sx={{ mb: 3 }}>
        Choose the account type that best describes you
        </Typography>
    </Box>
  )
}



