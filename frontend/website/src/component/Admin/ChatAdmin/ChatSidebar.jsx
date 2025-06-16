import { Box, Paper, Divider, useTheme } from "@mui/material";
import { useEffect, useState, useContext } from "react";
import ChatCard from "./ChatCard";
import axios from "axios";
import { ChatContext } from "../../../Context/ChatContext";

export default function ChatSidebar() {
  const theme = useTheme();
  const [conversations, setConversations] = useState([]);
  const { selectedConversation, setSelectedConversation } =
    useContext(ChatContext);
  const getData = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:4545/conversitions/getconversitions/user",
        {
          headers: {
            token: localStorage.getItem("token"),
          },
        }
      );
      console.log(data);
      setConversations(data.convs || []);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

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
        {conversations.map((conv) => (
          <Box key={conv.id} onClick={() => setSelectedConversation(conv)}>
            <ChatCard
              name={conv?.organization?.name}
              profile={conv?.organization?.profile}
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
