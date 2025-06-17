import { Box } from "@mui/material";
import { useContext, useRef, useEffect, useState, useCallback } from "react";
import { UserContext } from "../../../Context/UserContext";
import ChatMessage from "./ChatMessage";
import ChatInput from "./ChatInput";
import axios from "axios";

export default function ChatConversation({ conversationData }) {
  const { user } = useContext(UserContext);
  const messagesEndRef = useRef(null);
  const [messages, setMessages] = useState([]);
  const [replyingTo, setReplyingTo] = useState(null);

  const handleSendMessage = async (text, type = "normal") => {
    try {
      const payload = {
        payload: text,
        convId: conversationData.id,
        type: type,
      };

      if (type === "replay" && replyingTo) {
        payload.repliedToId = replyingTo.id;
      }

      const response = await axios.post(
        "http://localhost:4545/messages/send",
        payload,
        {
          headers: {
            token: localStorage.getItem("token"),
          },
        }
      );

      if (response.data) {
        fetchMessages();
        setReplyingTo(null);
      }
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  const handleReply = (message) => {
    setReplyingTo(message);
  };

  const handleCancelReply = () => {
    setReplyingTo(null);
  };
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
      const messagesArray = response.data?.conv?.messages || [];

      // Create a map for quick message lookup by ID
      const messageMap = new Map();
      messagesArray.forEach((message) => messageMap.set(message.id, message));

      // Enhance messages with replied-to content
      const enhancedMessages = messagesArray.map((message) => {
        if (message.type === "replay" && message.repliedToId) {
          const repliedToMessage = messageMap.get(message.repliedToId);
          return {
            ...message,
            repliedTo: repliedToMessage || {
              payload: "Original message not found",
            },
          };
        }
        return message;
      });

      setMessages(enhancedMessages);
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
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 2,
          padding: 2,
          flex: 1,
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
        {Array.isArray(messages) &&
          messages.map((message, index) => {
            const isOwnMessage = Number(message.senderId) === Number(user?.id);
            return (
              <Box
                key={message.id || index}
                sx={{
                  display: "flex",
                  justifyContent: isOwnMessage ? "flex-start" : "flex-end",
                  width: "100%",
                }}
              >
                {" "}                <ChatMessage
                  messageId={message.id}
                  text={message.payload}
                  sent={isOwnMessage}
                  timestamp={
                    message.time
                      ? new Date(message.time).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })
                      : ""
                  }
                  type={message.type}
                  repliedMessage={message.repliedTo?.payload}
                  onReply={() => handleReply(message)}
                  onMessageUpdated={fetchMessages}
                  reaction={message.reaction?.name}
                />
              </Box>
            );
          })}
        <div ref={messagesEndRef} />
      </Box>{" "}
      <ChatInput
        onSendMessage={handleSendMessage}
        replyingTo={replyingTo}
        onCancelReply={handleCancelReply}
      />
    </>
  );
}
