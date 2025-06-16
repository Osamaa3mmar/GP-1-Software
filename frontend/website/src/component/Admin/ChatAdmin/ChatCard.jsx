import { Avatar, Box, Typography } from '@mui/material';

const ChatCard = ({ userImage, userName }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        padding: 2,
        gap: 2,
        borderRadius: 1,
        '&:hover': {
          backgroundColor: 'rgba(0, 0, 0, 0.04)',
          cursor: 'pointer',
        },
      }}
    >
      <Avatar
        src={userImage || 'https://via.placeholder.com/40'}
        alt={userName}
      />
      <Typography variant="subtitle1">
        {userName || 'User Name'}
      </Typography>
    </Box>
  );
};

export default ChatCard;