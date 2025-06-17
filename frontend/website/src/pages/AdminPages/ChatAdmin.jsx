import ChatSidebar from "../../component/Admin/ChatAdmin/ChatSidebar";
import ChatBody from "../../component/Admin/ChatAdmin/ChatBody";
import { Stack } from "@mui/material";

export default function ChatAdmin({type}) {
  return (
    <Stack
      direction={"row"}
      sx={{
        height: type === "org" ? "100vh" : "calc(100vh - 74.4px)",
        position: "relative",
        overflow: "hidden",
        bgcolor: "#f8f9fa",
      }}
    >
      <ChatBody type={type}/>
      <ChatSidebar type={type}/>
    </Stack>
  );
}
