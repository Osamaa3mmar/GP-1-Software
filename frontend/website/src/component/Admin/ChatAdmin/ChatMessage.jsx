import { Box, Typography, IconButton, TextField, Popover } from "@mui/material";
import ReplyIcon from "@mui/icons-material/Reply";
import EditIcon from "@mui/icons-material/Edit";
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import ThumbDownAltIcon from '@mui/icons-material/ThumbDownAlt';
import { useState, useEffect } from "react";
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
  reaction,
}) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [editedMessage, setEditedMessage] = useState(text);
  const [localReaction, setLocalReaction] = useState(reaction);

  // Sync local reaction with prop updates
  useEffect(() => {
    setLocalReaction(reaction);
  }, [reaction]);

  const handleReaction = async (reactionType) => {
    try {
      // Determine the new reaction value
      let newReactionValue;
      if (localReaction === reactionType) {
        // Clicking same reaction again - remove it
        newReactionValue = null;
      } else {
        // New reaction
        newReactionValue = reactionType;
      }

      // Optimistic UI update
      setLocalReaction(newReactionValue);

      // Prepare payload
      const payload = newReactionValue 
        ? { reaction: { name: newReactionValue } } 
        : { reaction: {} };

      // Send reaction to server
      await axios.post(
        `http://localhost:4545/messages/react/${messageId}`,
        payload,
        {
          headers: {
            token: localStorage.getItem("token"),
          },
        }
      );

      // Refresh messages to get updated data
      onMessageUpdated?.();
    } catch (error) {
      console.error("Error reacting to message:", error);
      // Revert on error
      setLocalReaction(reaction);
    }
  };

  const handleEdit = async () => {
    try {
      if (editedMessage.trim() === "") return;

      await axios.post(
        `http://localhost:4545/messages/edit/${messageId}`,
        { payload: editedMessage },
      );
      setAnchorEl(null);
      onMessageUpdated?.();
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
      {/* Main message container */}
      <Box
        sx={{
          backgroundColor: sent ? "#6366f1" : "#f0f2f5",
          color: sent ? "white" : "text.primary",
          borderRadius: sent ? "20px 20px 20px 4px" : "20px 20px 4px 20px",
          padding: "12px 16px",
          position: "relative",
          boxShadow: "0 1px 2px rgba(0, 0, 0, 0.05)",
          wordBreak: "break-word",
        }}
      >
        {/* Message content */}
        <Typography variant="body1" sx={{ lineHeight: 1.4, mb: 1 }}>
          {text}
        </Typography>

        {/* Timestamp */}
        <Typography
          variant="caption"
          sx={{
            color: sent ? "rgba(255, 255, 255, 0.8)" : "text.secondary",
            fontSize: "0.75rem",
          }}
        >
          {timestamp}
        </Typography>
      </Box>

      {/* Controls and reactions below message */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 1,
          mt: 0.5,
          pl: 1,
        }}
      >
        {/* Edit button (only for sent messages) */}
        {sent && (
          <IconButton
            size="small"
            sx={{
              padding: "4px",
              color: "text.secondary",
              "&:hover": { backgroundColor: "action.hover" },
            }}
            onClick={(e) => setAnchorEl(e.currentTarget)}
          >
            <EditIcon fontSize="small" />
          </IconButton>
        )}
        
        {/* Reply button */}
        <IconButton
          size="small"
          sx={{
            padding: "4px",
            color: "text.secondary",
            "&:hover": { backgroundColor: "action.hover" },
          }}
          onClick={() => onReply?.()}
        >
          <ReplyIcon fontSize="small" />
        </IconButton>

        {/* Reaction buttons - only for received messages */}
        {!sent && (
          <>
            <IconButton
              size="small"
              sx={{
                padding: "4px",
                color: localReaction === "like" ? "#2196f3" : "text.secondary",
                "&:hover": { backgroundColor: "action.hover" },
              }}
              onClick={() => handleReaction("like")}
            >
              <ThumbUpAltIcon fontSize="small" />
            </IconButton>
            <IconButton
              size="small"
              sx={{
                padding: "4px",
                color: localReaction === "disLike" ? "#f44336" : "text.secondary",
                "&:hover": { backgroundColor: "action.hover" },
              }}
              onClick={() => handleReaction("disLike")}
            >
              <ThumbDownAltIcon fontSize="small" />
            </IconButton>
          </>
        )}

        {/* Reaction indicator for sent messages */}
        {sent && localReaction && (
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              backgroundColor: 'rgba(0, 0, 0, 0.04)',
              borderRadius: '12px',
              padding: '4px 8px',
            }}
          >
            {localReaction === 'like' ? (
              <ThumbUpAltIcon sx={{ 
                fontSize: 18,
                color: '#2196f3'
              }} />
            ) : localReaction === 'disLike' ? (
              <ThumbDownAltIcon sx={{ 
                fontSize: 18,
                color: '#f44336'
              }} />
            ) : null}
          </Box>
        )}
      </Box>

      {/* Edit popover */}
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