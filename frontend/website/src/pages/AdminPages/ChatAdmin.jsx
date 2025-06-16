import ChatSidebar from "../../component/Admin/ChatAdmin/ChatSidebar";
import ChatBody from "../../component/Admin/ChatAdmin/ChatBody";
import { Stack } from "@mui/material";

export default function ChatAdmin() {
  return (
    <Stack direction={"row"}>
      <ChatBody/>
      <ChatSidebar/>
    </Stack>
  );
}