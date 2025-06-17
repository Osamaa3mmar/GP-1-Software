import { Avatar, Box, Typography } from "@mui/material";

export default function ChatHeader({ conversationData, type }) {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        padding: 2,
        borderBottom: "1px solid #e0e0e0",
        backgroundColor: "#fff",
      }}
    >
      {" "}
      <Avatar
        sx={{ width: 40, height: 40, marginRight: 2 }}
        alt={
          type === "org"
            ? conversationData?.user?.username || "User"
            : conversationData?.organization?.name || "User"
        }
        src={
          type === "org"
            ? conversationData?.user?.profilePic ||
              "https://via.placeholder.com/40"
            : conversationData?.organization?.profile ||
              "https://via.placeholder.com/40"
        }
      />
      <Typography variant="h6" component="div">
        {type === "org"
          ? conversationData?.user?.username || "Select a conversation"
          : conversationData?.organization?.name || "Select a conversation"}
      </Typography>
    </Box>
  );
}
