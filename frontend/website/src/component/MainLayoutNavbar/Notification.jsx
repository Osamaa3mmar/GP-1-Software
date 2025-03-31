import { Badge, IconButton } from "@mui/material";
import NotificationsIcon from "@mui/icons-material/Notifications";

export default function Notification() {
  return (
    <IconButton>
      <Badge color="primary" badgeContent={99}>
        <NotificationsIcon sx={{ fontSize: "26px", color: "black" }} />
      </Badge>
    </IconButton>
  );
}
