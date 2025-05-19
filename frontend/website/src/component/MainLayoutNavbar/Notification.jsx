import { Badge, Box, IconButton, Tooltip, useTheme } from "@mui/material";
import NotificationsIcon from "@mui/icons-material/Notifications";
import Modal from '@mui/material/Modal';
import { useContext, useState } from "react";
import Notifications from "../Notifications/Notifications";
import { UserNotificationsContext } from "../../Context/NotificationsUserContext";

export default function Notification() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const {notificationCount}=useContext(UserNotificationsContext);

  const theme =useTheme();
  const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: "70%",
  bgcolor: 'background.paper',
  border: `2px solid ${theme.palette.primary.main}`,
  outline: `6px solid ${theme.palette.primary.main+"80"}`,
  boxShadow: 24,
  borderRadius:"8px",
  height:"600px",
  overflow:"auto",
  px: 4,
  py:2
};
  return( <>
    <Tooltip title="Notifications">
      <IconButton onClick={()=>{handleOpen()}}>
        <Badge color="primary" badgeContent={notificationCount!=0?notificationCount:"o"}>
          <NotificationsIcon sx={{ fontSize: "26px", color: "black" }} />
        </Badge>
      </IconButton>
    </Tooltip>
    <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Notifications type={"user"}/>
        </Box>
      </Modal>
    </>
  );
}


