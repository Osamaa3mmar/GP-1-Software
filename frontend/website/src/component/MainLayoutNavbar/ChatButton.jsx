import { IconButton, Tooltip } from "@mui/material";
import ChatIcon from "@mui/icons-material/Chat";
import { Link } from "react-router-dom";

export default function ChatButton() {
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
          <ChatIcon sx={{ fontSize: "30px" }} />
        </IconButton>
      </Tooltip>
    </div>
  );
}
