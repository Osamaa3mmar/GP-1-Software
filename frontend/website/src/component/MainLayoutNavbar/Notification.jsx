import { Badge, IconButton, Tooltip } from "@mui/material";
import NotificationsIcon from "@mui/icons-material/Notifications";

export default function Notification() {
  return (
    <Tooltip title="Notifications">
      <IconButton>
        <Badge color="primary" badgeContent={99}>
          <NotificationsIcon sx={{ fontSize: "26px", color: "black" }} />
        </Badge>
      </IconButton>
    </Tooltip>
  );
}
