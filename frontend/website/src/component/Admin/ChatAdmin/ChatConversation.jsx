import { Box, useTheme } from "@mui/material";
import { useContext, useRef, useEffect, useState, useCallback } from "react";
import { UserContext } from "../../../Context/UserContext";
import ChatMessage from "./ChatMessage";
import axios from "axios";

export default function ChatConversation({ conversationData }) {
  const { user } = useContext(UserContext);
  const theme = useTheme();
  const messagesEndRef = useRef(null);
  const [messages, setMessages] = useState([]);
  const fetchMessages = useCallback(async () => {
    try {
      const response = await axios.post(
        `http://localhost:4545/conversitions/messages/user/${conversationData?.id}`,
        { type: "user" },
        {
          headers: {
            token: localStorage.getItem("token"),
          },
        }
      );
      console.log("Messages response:", response.data);
      // Make sure we set an array to the state
      const messagesArray = response.data?.messages || [];
      setMessages(messagesArray);
    } catch (error) {
      console.error("Error fetching messages:", error);
    }
  }, [conversationData?.id]);
  useEffect(() => {
    if (conversationData?.id) {
      fetchMessages();
    }
  }, [conversationData, fetchMessages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

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
      {" "}
      {Array.isArray(messages) &&
        messages.map((message, index) => (
          <Box
            key={message._id || index}
            sx={{
              display: "flex",
              justifyContent:
                message.senderId === user?._id ? "flex-end" : "flex-start",
              width: "100%",
            }}
          >
            <ChatMessage
              text={message.payload}
              sent={message.senderId === user?._id}
              timestamp={
                message.time
                  ? new Date(message.time).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })
                  : ""
              }
            />
          </Box>
        ))}
      <div ref={messagesEndRef} />
    </Box>
  );
}
