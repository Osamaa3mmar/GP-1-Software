import { Box, Paper, Divider, useTheme } from "@mui/material";
import { useEffect } from "react";
import ChatCard from "./ChatCard";
import axios from "axios";

export default function ChatSidebar() {
  const theme = useTheme();
  const getData=async()=>{
        try{
            const {data}= await axios.get("http://localhost:4545/conversitions/getconversitions/user",{
                headers:{
                    token:localStorage.getItem("token")
                }
            })
            console.log(data)
        }catch(error){
            console.log(error);
        }
    }

    useEffect(()=>{
        getData();
    })
  // Mock data for demonstration - replace with actual data
  const chatUsers = [
    {
      id: 1,
      userName: "John Doe",
      userImage: "https://via.placeholder.com/40",
    },
    {
      id: 2,
      userName: "Jane Smith",
      userImage: "https://via.placeholder.com/40",
    },
    {
      id: 3,
      userName: "Mike Johnson",
      userImage: "https://via.placeholder.com/40",
    },
    {
      id: 3,
      userName: "Mike Johnson",
      userImage: "https://via.placeholder.com/40",
    },
    {
      id: 3,
      userName: "Mike Johnson",
      userImage: "https://via.placeholder.com/40",
    },
    {
      id: 3,
      userName: "Mike Johnson",
      userImage: "https://via.placeholder.com/40",
    },
    {
      id: 3,
      userName: "Mike Johnson",
      userImage: "https://via.placeholder.com/40",
    },
    {
      id: 3,
      userName: "Mike Johnson",
      userImage: "https://via.placeholder.com/40",
    },
    {
      id: 3,
      userName: "Mike Johnson",
      userImage: "https://via.placeholder.com/40",
    },
    {
      id: 3,
      userName: "Mike Johnson",
      userImage: "https://via.placeholder.com/40",
    },
    {
      id: 3,
      userName: "Mike Johnson",
      userImage: "https://via.placeholder.com/40",
    },
    {
      id: 3,
      userName: "Mike Johnson",
      userImage: "https://via.placeholder.com/40",
    },
  ];

  return (
    <Paper
      elevation={3}
      sx={{
        width: "25%",
        height: "100vh",
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
        {chatUsers.map((user) => (
          <Box key={user.id}>
            <ChatCard userImage={user.userImage} userName={user.userName} />
            <Divider />
          </Box>
        ))}
      </Box>
    </Paper>
  );
}
