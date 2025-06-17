import { Box } from "@mui/material";
import { useContext } from "react";
import ChatHeader from "./ChatHeader";
import ChatConversation from "./ChatConversation";
import ChatInput from "./ChatInput";
import { ChatContext } from "../../../Context/ChatContext";

export default function ChatBody({type}) {
  const { selectedConversation } = useContext(ChatContext);
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
      {" "}
      <ChatHeader conversationData={selectedConversation} type={type}/>
      <Box
        sx={{
          flex: 1,
          overflow: "auto",
          minHeight: 0, // This is crucial for proper flexbox scrolling
          display: "flex",
          flexDirection: "column",
        }}
      >
        <ChatConversation conversationData={selectedConversation} />
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
      </Box>
    </Box>
  );
}
