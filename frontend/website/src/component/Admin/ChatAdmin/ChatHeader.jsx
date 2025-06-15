import { Avatar, Box, Typography } from '@mui/material';

export default function ChatHeader() {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        padding: 2,
        borderBottom: '1px solid #e0e0e0',
        backgroundColor: '#fff',
      }}
    >
      <Avatar
        sx={{ width: 40, height: 40, marginRight: 2 }}
        alt="User Avatar"
        src="/path-to-avatar.jpg"
      />
      <Typography variant="h6" component="div">
        Username
      </Typography>
    </Box>
  );
}