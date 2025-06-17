import { Avatar, Box, Typography } from "@mui/material";
import { UserContext } from "../../../Context/UserContext";
import { useContext } from "react";

const ChatCard = ({ profile, name, lastMessage, isSelected }) => {
  const { user } = useContext(UserContext);
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
        {" "}
        <Box
          sx={{ display: "flex", alignItems: "center", gap: 1, width: "100%" }}
        >
          <Typography
            variant="subtitle1"
            sx={{
              fontWeight: 500,
              color: "text.primary",
              lineHeight: 1.2,
              flex: 1,
            }}
          >
            {name || "User Name"}
          </Typography>
          {Array.isArray(lastMessage) &&
            lastMessage.length > 0 &&
            !lastMessage[0].isRead && 
            lastMessage[0].senderId != user?.id &&(
              <Box
                sx={{
                  width: 8,
                  height: 8,
                  borderRadius: "50%",
                  backgroundColor: "#6366f1",
                  marginRight: 1,
                }}
              />
            )}
        </Box>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <Typography
            variant="body2"
            sx={{
              color: lastMessage?.[0]?.isRead
                ? "text.secondary"
                : "text.primary",
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
              fontSize: "0.875rem",
              flex: 1,
              fontWeight: lastMessage.length > 0 &&
            !lastMessage[0].isRead && 
            lastMessage[0].senderId != user?.id ? 600 : 400,
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
