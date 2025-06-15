import { Box, Typography, IconButton, useTheme } from "@mui/material";
import ReplyIcon from "@mui/icons-material/Reply";

const ChatMessage = ({ message, isOwn, type = "normal", repliedMessage }) => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        maxWidth: "70%",
        minWidth: "100px",
        position: "relative",
        marginBottom: 1,
      }}
    >
      {/* Replied message if exists */}
      {type === "replay" && (
        <Box
          sx={{
            backgroundColor: "rgba(0, 0, 0, 0.04)",
            borderRadius: "12px",
            padding: "8px 12px",
            marginBottom: 1,
            fontSize: "0.875rem",
            color: "text.secondary",
          }}
        >
          <Typography variant="body2">{repliedMessage}</Typography>
        </Box>
      )}

      {/* Main message bubble */}
      <Box
        sx={{
          backgroundColor: isOwn ? "#6366f1" : "#f0f2f5",
          color: isOwn ? "white" : "text.primary",
          borderRadius: isOwn ? "20px 20px 4px 20px" : "20px 20px 20px 4px",
          padding: "12px 16px",
          position: "relative",
          boxShadow: "0 1px 2px rgba(0, 0, 0, 0.05)",
          wordBreak: "break-word",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {!isOwn && (
          <Typography
            variant="caption"
            sx={{
              color: "text.secondary",
              display: "block",
              marginBottom: 0.5,
              fontWeight: 500,
            }}
          >
            {message.senderName}
          </Typography>
        )}

        <Typography variant="body1" sx={{ lineHeight: 1.4 }}>
          {message.content}
        </Typography>

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginTop: 0.5,
          }}
        >
          <Typography
            variant="caption"
            sx={{
              color: isOwn ? "rgba(255, 255, 255, 0.8)" : "text.secondary",
              fontSize: "0.75rem",
            }}
          >
            {message.timestamp}
          </Typography>

          <IconButton
            size="small"
            sx={{
              color: isOwn ? "rgba(255, 255, 255, 0.8)" : "text.secondary",
              padding: "2px",
              "&:hover": {
                backgroundColor: isOwn
                  ? "rgba(255, 255, 255, 0.1)"
                  : "rgba(0, 0, 0, 0.04)",
              },
            }}
            onClick={() => console.log("Reply clicked")}
          >
            <ReplyIcon fontSize="small" />
          </IconButton>
        </Box>
      </Box>
    </Box>
  );
};

export default ChatMessage;
