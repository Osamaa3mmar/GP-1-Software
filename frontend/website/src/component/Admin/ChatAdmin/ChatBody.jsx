import { Box } from "@mui/material";
import ChatHeader from "./ChatHeader";
import ChatConversation from "./ChatConversation";
import ChatInput from "./ChatInput";

export default function ChatBody() {
  return (
    <Box
      sx={{
        flexGrow: 1,
        display: "flex",
        flexDirection: "column",
        height: "100%",
        overflow: "hidden",
        bgcolor: "#f8f9fa",
      }}
    >
      <ChatHeader />
      <Box
        sx={{
          flex: 1,
          overflow: "auto",
          minHeight: 0, // This is crucial for proper flexbox scrolling
          display: "flex",
          flexDirection: "column",
        }}
      >
        <ChatConversation />
      </Box>
      <Box
        sx={{
          position: "sticky",
          bottom: 0,
          bgcolor: "background.paper",
          borderTop: "1px solid",
          borderColor: "divider",
        }}
      >
        <ChatInput />
      </Box>
    </Box>
  );
}
