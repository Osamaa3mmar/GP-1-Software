import { Avatar, Box, Typography } from "@mui/material";

const ChatCard = ({ profile, name, lastMessage, isSelected }) => {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        padding: 2,
        gap: 2,
        borderRadius: 1,
        backgroundColor: isSelected ? "#6366f112" : "transparent",
        transition: "all 0.2s ease",
        "&:hover": {
          backgroundColor: isSelected ? "#6366f118" : "rgba(0, 0, 0, 0.04)",
          cursor: "pointer",
        },
      }}
    >
      <Avatar src={profile || "https://via.placeholder.com/40"} alt={name} />
      <Box sx={{ flexGrow: 1, minWidth: 0 }}>
        <Typography
          variant="subtitle1"
          sx={{
            fontWeight: 500,
            color: "text.primary",
            lineHeight: 1.2,
          }}
        >
          {name || "User Name"}
        </Typography>{" "}
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <Typography
            variant="body2"
            sx={{
              color: "text.secondary",
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
              fontSize: "0.875rem",
              flex: 1,
            }}
          >
            {Array.isArray(lastMessage) && lastMessage.length > 0
              ? lastMessage[0].payload
              : "No messages yet"}
          </Typography>
          {Array.isArray(lastMessage) &&
            lastMessage.length > 0 &&
            lastMessage[0].time && (
              <Typography
                variant="caption"
                sx={{
                  color: "text.disabled",
                  fontSize: "0.75rem",
                  whiteSpace: "nowrap",
                }}
              >
                {new Date(lastMessage[0].time).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </Typography>
            )}
        </Box>
      </Box>
    </Box>
  );
};

export default ChatCard;
