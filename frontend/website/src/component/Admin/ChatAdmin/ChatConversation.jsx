import { Box, useTheme } from "@mui/material";
import { useContext, useRef, useEffect } from "react";
import { UserContext } from "../../../Context/UserContext";
import ChatMessage from "./ChatMessage";

export default function ChatConversation() {
  const { user } = useContext(UserContext);
  const theme = useTheme();
  const messagesEndRef = useRef(null);

  // Mock messages for demonstration - replace with your actual messages
  const messages = [
    {
      id: 1,
      senderId: 8,
      content: "Hi, how are you?",
      timestamp: "10:00 AM",
      senderName: "John Doe",
    },
    {
      id: 2,
      senderId: 9,
      content: "I'm good, thanks! How about you?",
      timestamp: "10:01 AM",
      senderName: "Jane Smith",
    },
    {
      id: 3,
      senderId: 8,
      content: "Great! I wanted to discuss the project updates.",
      timestamp: "10:02 AM",
      senderName: "John Doe",
    },
    {
      id: 4,
      senderId: 9,
      content: "Hi, how are you?",
      timestamp: "10:00 AM",
      senderName: "John Doe",
    },
    {
      id: 5,
      senderId: 8,
      content: "I'm good, thanks! How about you?",
      timestamp: "10:01 AM",
      senderName: "Jane Smith",
    },
    {
      id: 6,
      senderId: 9,
      content: "Great! I wanted to discuss the project updates.",
      timestamp: "10:02 AM",
      senderName: "John Doe",
    },
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);
  console.log("user", user);
  messages.map((message) => {
    console.log(message.senderId === user?.id);
  })
  
  
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 2,
        padding: 2,
        maxHeight: "100%",
        overflowY: "auto",
        "&::-webkit-scrollbar": {
          width: "8px",
        },
        "&::-webkit-scrollbar-track": {
          background: "#f1f1f1",
          borderRadius: "4px",
        },
        "&::-webkit-scrollbar-thumb": {
          background: "#6366f140",
          borderRadius: "4px",
          "&:hover": {
            background: "#6366f180",
          },
        },
      }}
    >
      {messages.map((message) => (
        <Box
          key={message.id}
          sx={{
            display: "flex",
            justifyContent:
              message.senderId === user?.id ? "flex-end" : "flex-start",
            width: "100%",
          }}
        >
          <ChatMessage
            message={message}
            isOwn={message.senderId !== user?.id}
          />
        </Box>
      ))}
      <div ref={messagesEndRef} />
    </Box>
  );
}
