import { Box, Paper, Divider, useTheme } from "@mui/material";
import { useEffect, useState, useContext, useCallback } from "react";
import ChatCard from "./ChatCard";
import axios from "axios";
import { ChatContext } from "../../../Context/ChatContext";

export default function ChatSidebar({type}) {
  const theme = useTheme();
  const [conversations, setConversations] = useState([]);
  const { selectedConversation, setSelectedConversation } =
    useContext(ChatContext);
  const getData = useCallback(async () => {
    try {
      const endpoint = type === "org" 
        ? "http://localhost:4545/conversitions/getconversitions/org"
        : "http://localhost:4545/conversitions/getconversitions/user";

      const { data } = await axios.get(endpoint, {
        headers: {
          token: localStorage.getItem("token"),
        },
      });
      
      const conversationsData = data.convs || [];
      setConversations(conversationsData);

      // Set the first conversation as default if there are conversations and none is selected
      if (conversationsData.length > 0 && !selectedConversation) {
        setSelectedConversation(conversationsData[0]);
      }
    } catch (error) {
      console.log(error);
    }
  }, [selectedConversation, setSelectedConversation, type]);

  useEffect(() => {
    getData();
  }, [getData]);

  return (
    <Paper
      elevation={3}
      sx={{
        width: "25%",
        height: "100%",
        borderRadius: 0,
        display: "flex",
        flexDirection: "column",
        bgcolor: "background.paper",
        borderRight: `1px solid ${theme.palette.divider}`,
      }}
    >
      {/* Chat list */}
      <Box
        sx={{
          flex: 1,
          overflowY: "auto",
          "&::-webkit-scrollbar": {
            width: "8px",
          },
          "&::-webkit-scrollbar-track": {
            background: "#f1f1f1",
          },
          "&::-webkit-scrollbar-thumb": {
            background: "#888",
            borderRadius: "4px",
          },
          "&::-webkit-scrollbar-thumb:hover": {
            background: "#555",
          },
        }}
      >
        {conversations.map((conv) => (          <Box key={conv.id} onClick={() => setSelectedConversation(conv)}>
            <ChatCard
              name={type === "org" ? conv?.user?.username : conv?.organization?.name}
              profile={type === "org" ? conv?.user?.profilePic : conv?.organization?.profile}
              lastMessage={conv?.messages}
              isSelected={selectedConversation?.id === conv.id}
            />
            <Divider />
          </Box>
        ))}
      </Box>
    </Paper>
  );
}
