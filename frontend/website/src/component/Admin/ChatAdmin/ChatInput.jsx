import { Box, IconButton, InputBase, Paper, useTheme } from "@mui/material";
import SendRoundedIcon from "@mui/icons-material/SendRounded";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import EmojiEmotionsOutlinedIcon from "@mui/icons-material/EmojiEmotionsOutlined";
import { useState } from "react";

export default function ChatInput({ onSendMessage }) {
  const [message, setMessage] = useState("");
  const theme = useTheme();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (message.trim()) {
      onSendMessage?.(message);
      setMessage("");
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        p: 2,
        backgroundColor: "background.paper",
        borderTop: `1px solid ${theme.palette.divider}`,
      }}
    >
      <Paper
        elevation={0}
        sx={{
          p: "2px 4px",
          display: "flex",
          alignItems: "center",
          borderRadius: "24px",
          backgroundColor: "#f8f9fa",
          border: "1px solid",
          borderColor: "divider",
          "&:hover": {
            borderColor: "#6366f180",
          },
          "&:focus-within": {
            borderColor: "#6366f1",
            boxShadow: "0 0 0 2px #6366f120",
          },
        }}
      >
        <IconButton
          size="small"
          sx={{
            mx: 1,
            color: theme.palette.text.secondary,
            "&:hover": { color: "#6366f1" },
          }}
        >
          <EmojiEmotionsOutlinedIcon />
        </IconButton>

        <InputBase
          sx={{
            ml: 1,
            flex: 1,
            "& .MuiInputBase-input": {
              padding: "10px 0",
            },
          }}
          placeholder="Type a message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />

        <IconButton
          size="small"
          sx={{
            mx: 1,
            color: theme.palette.text.secondary,
            "&:hover": { color: "#6366f1" },
          }}
        >
          <AttachFileIcon />
        </IconButton>

        <IconButton
          type="submit"
          sx={{
            m: 1,
            backgroundColor: "#6366f1",
            color: "white",
            "&:hover": {
              backgroundColor: "#4f46e5",
            },
            "&:disabled": {
              backgroundColor: "#6366f160",
              color: "white",
            },
            width: 35,
            height: 35,
          }}
          disabled={!message.trim()}
        >
          <SendRoundedIcon sx={{ fontSize: 18 }} />
        </IconButton>
      </Paper>
    </Box>
  );
}
