import ChatSidebar from "../../component/Admin/ChatAdmin/ChatSidebar";
import ChatBody from "../../component/Admin/ChatAdmin/ChatBody";
import { Stack } from "@mui/material";

export default function ChatAdmin({type}) {
  return (
    <Stack
      direction={"row"}
      sx={{
        height: type === "user" ? "calc(100vh - 74.4px)" : "100vh",
        position: "relative",
        overflow: "hidden",
        bgcolor: "#f8f9fa",
      }}
    >
      <ChatBody />
      <ChatSidebar />
    </Stack>
  );
}
