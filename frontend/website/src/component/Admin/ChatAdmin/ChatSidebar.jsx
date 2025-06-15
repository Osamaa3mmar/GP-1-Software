import { Box, Paper, Divider, useTheme } from "@mui/material";
import ChatCard from "./ChatCard";

export default function ChatSidebar() {
  const theme = useTheme();

  // Mock data for demonstration - replace with actual data
  const chatUsers = [
    {
      id: 1,
      userName: "John Doe",
      userImage: "https://via.placeholder.com/40",
    },
    {
      id: 2,
      userName: "Jane Smith",
      userImage: "https://via.placeholder.com/40",
    },
    {
      id: 3,
      userName: "Mike Johnson",
      userImage: "https://via.placeholder.com/40",
    },
    {
      id: 3,
      userName: "Mike Johnson",
      userImage: "https://via.placeholder.com/40",
    },
    {
      id: 3,
      userName: "Mike Johnson",
      userImage: "https://via.placeholder.com/40",
    },
    {
      id: 3,
      userName: "Mike Johnson",
      userImage: "https://via.placeholder.com/40",
    },
    {
      id: 3,
      userName: "Mike Johnson",
      userImage: "https://via.placeholder.com/40",
    },
    {
      id: 3,
      userName: "Mike Johnson",
      userImage: "https://via.placeholder.com/40",
    },
    {
      id: 3,
      userName: "Mike Johnson",
      userImage: "https://via.placeholder.com/40",
    },
    {
      id: 3,
      userName: "Mike Johnson",
      userImage: "https://via.placeholder.com/40",
    },
    {
      id: 3,
      userName: "Mike Johnson",
      userImage: "https://via.placeholder.com/40",
    },
    {
      id: 3,
      userName: "Mike Johnson",
      userImage: "https://via.placeholder.com/40",
    },
  ];

  return (
    <Paper
      elevation={3}
      sx={{
        width: "25%",
        height: "100vh",
        borderRadius: 0,
        display: "flex",
        flexDirection: "column",
        bgcolor: "background.paper",
        borderRight: `1px solid ${theme.palette.divider}`,
      }}
    >
      {/* Chat list */}
      <Box
        sx={{
          flex: 1,
          overflowY: "auto",
          "&::-webkit-scrollbar": {
            width: "8px",
          },
          "&::-webkit-scrollbar-track": {
            background: "#f1f1f1",
          },
          "&::-webkit-scrollbar-thumb": {
            background: "#888",
            borderRadius: "4px",
          },
          "&::-webkit-scrollbar-thumb:hover": {
            background: "#555",
          },
        }}
      >
        {chatUsers.map((user) => (
          <Box key={user.id}>
            <ChatCard userImage={user.userImage} userName={user.userName} />
            <Divider />
          </Box>
        ))}
      </Box>
    </Paper>
  );
}
