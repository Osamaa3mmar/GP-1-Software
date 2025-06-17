import { Box, Typography, IconButton, TextField, Popover } from "@mui/material";
import ReplyIcon from "@mui/icons-material/Reply";
import EditIcon from "@mui/icons-material/Edit";
import { useState } from "react";
import axios from "axios";

const ChatMessage = ({
  text,
  sent,
  timestamp,
  type = "normal",
  repliedMessage,
  onReply,
  messageId,
  onMessageUpdated,
}) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [editedMessage, setEditedMessage] = useState(text);
  const [isEditing, setIsEditing] = useState(false);
  const handleEdit = async () => {
    try {
      if (editedMessage.trim() === "") return;

      await axios.post(
        `http://localhost:4545/messages/edit/${messageId}`,
        { payload: editedMessage },
        // {
        //   headers: {
        //     token: localStorage.getItem("token"),
        //   },
        // }
      );
      setIsEditing(false);
      setAnchorEl(null);
      onMessageUpdated?.(); // Refresh messages after successful edit
    } catch (error) {
      console.error("Error editing message:", error);
    }
  };
  return (
    <Box
      sx={{
        maxWidth: "70%",
        minWidth: "100px",
        position: "relative",
        marginBottom: 1,
      }}
    >
      {/* Replied message if exists */}{" "}
      {type === "replay" && repliedMessage && (
        <Box
          sx={{
            backgroundColor: "rgba(0, 0, 0, 0.04)",
            borderRadius: "12px",
            padding: "8px 12px",
            marginBottom: 1,
            fontSize: "0.875rem",
            color: "text.secondary",
            borderLeft: "3px solid",
            borderColor: sent ? "#6366f1" : "grey.400",
          }}
        >
          <Typography
            variant="caption"
            sx={{ color: "text.secondary", display: "block", mb: 0.5 }}
          >
            Reply to
          </Typography>
          <Typography
            variant="body2"
            sx={{
              whiteSpace: "pre-wrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
            }}
          >
            {repliedMessage}
          </Typography>
        </Box>
      )}
      {/* Main message bubble */}
      <Box
        sx={{
          backgroundColor: sent ? "#6366f1" : "#f0f2f5",
          color: sent ? "white" : "text.primary",
          borderRadius: sent ? "20px 20px 20px 4px" : "20px 20px 4px 20px",
          padding: "12px 16px",
          position: "relative",
          boxShadow: "0 1px 2px rgba(0, 0, 0, 0.05)",
          wordBreak: "break-word",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Typography variant="body1" sx={{ lineHeight: 1.4 }}>
          {text}
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
              color: sent ? "rgba(255, 255, 255, 0.8)" : "text.secondary",
              fontSize: "0.75rem",
            }}
          >
            {timestamp}
          </Typography>{" "}
          <Box sx={{ display: "flex", gap: 1 }}>
            <IconButton
              size="small"
              sx={{
                color: sent ? "rgba(255, 255, 255, 0.8)" : "text.secondary",
                padding: "2px",
                "&:hover": {
                  backgroundColor: sent
                    ? "rgba(255, 255, 255, 0.1)"
                    : "rgba(0, 0, 0, 0.04)",
                },
              }}
              onClick={(e) => setAnchorEl(e.currentTarget)}
            >
              <EditIcon fontSize="small" />
            </IconButton>
            <IconButton
              size="small"
              sx={{
                color: sent ? "rgba(255, 255, 255, 0.8)" : "text.secondary",
                padding: "2px",
                "&:hover": {
                  backgroundColor: sent
                    ? "rgba(255, 255, 255, 0.1)"
                    : "rgba(0, 0, 0, 0.04)",
                },
              }}
              onClick={() => onReply?.()}
            >
              <ReplyIcon fontSize="small" />
            </IconButton>
          </Box>
        </Box>
      </Box>
      <Popover
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={() => {
          setAnchorEl(null);
          setEditedMessage(text);
        }}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
      >
        <Box
          sx={{
            p: 2,
            display: "flex",
            flexDirection: "column",
            gap: 1,
            minWidth: 300,
          }}
        >
          <TextField
            fullWidth
            multiline
            maxRows={4}
            value={editedMessage}
            onChange={(e) => setEditedMessage(e.target.value)}
            variant="outlined"
            size="small"
          />
          <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 1 }}>
            <IconButton
              size="small"
              onClick={handleEdit}
              sx={{
                backgroundColor: "#6366f1",
                color: "white",
                "&:hover": {
                  backgroundColor: "#4f46e5",
                },
              }}
            >
              <EditIcon fontSize="small" />
            </IconButton>
          </Box>
        </Box>
      </Popover>
    </Box>
  );
};

export default ChatMessage;
