import { IconButton, Tooltip, Badge } from "@mui/material";
import ChatIcon from "@mui/icons-material/Chat";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { MessageCountContext } from "../../Context/MessageCountContext";

export default function ChatButton() {
  const { messageCount } = useContext(MessageCountContext);
  console.log(messageCount, "messageCount");
  return (
    <div style={{ position: "fixed", bottom: "5%", right: "3%" }}>
      <Tooltip title="Chat">
        <IconButton
          component={Link}
          to={"/main/chat"}
          sx={{
            backgroundColor: "#6366f120",
            border: "2px solid #6366f1",
            color: "#6366f1",
            "&:hover": {
              backgroundColor: "#6366f1",
              border: "2px solid transparent",
              color: "white",
            },
          }}
        >
          <Badge
            badgeContent={messageCount}
            color="error"
            sx={{
              "& .MuiBadge-badge": {
                right: 5,
                top: 5,
                border: "2px solid #fff",
                padding: "0 4px",
              },
            }}
          >
            <ChatIcon sx={{ fontSize: "30px" }} />
          </Badge>
        </IconButton>
      </Tooltip>
    </div>
  );
}
