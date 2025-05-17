import {
  Avatar,
  Backdrop,
  Box,
  IconButton,
  Modal,
  Paper,
  Stack,
  Tooltip,
  Typography,
  useTheme,
} from "@mui/material";

import style from "../Notifications/animation.module.css";
import { useEffect, useState } from "react";
import axios from "axios";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import { toast } from "react-toastify";
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import Swal from "sweetalert2";
import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";
import CloseIcon from "@mui/icons-material/Close";
import Header from "../Admin/CoursesAdmin/AddCourseFrom/Header";
export default function AcceptedInstractourCard({ index, userId, getAll }) {
  const [user, setUser] = useState({});
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const [currentModal, setCurrentModal] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const handleOpen = (name,id) =>{
    setCurrentModal(name);
    setCurrentUser(id);
    setOpen(true);
  } 
  const handleClose = () => setOpen(false);
  const unAssign=async()=>{
    try {
      const { data } = await axios.post(
        "http://localhost:4545/applye/unassign",
        {
          userId: userId,
        }
      );
      toast.success(data.message);
      getAll();
    } catch (error) {
      toast.error(error.response.data.message);
    }
  }
  const getUser = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:4545/applye/getuser/" + userId
      );
      setUser(data.user);
    } catch (error) {
      console.log(error);
    }
  };
  const kick = async () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, remove it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const { data } = await axios.delete(
          "http://localhost:4545/applye/kick/" + userId
        );
        toast.success(data.message);
        getAll();
      }
    });
  };
  const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 600,
  bgcolor: 'background.paper',
  boxShadow: 24,
  
};

  useEffect(() => {
    getUser();
  }, [userId]);
  return (
    <Paper
      className={style.animateCard}
      style={{ animationDelay: `${index * 0.1}s` }}
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 2,
        p: 2,
        mb: 2,
        borderRadius: 3,
        backgroundColor: theme.palette.primary.main + 22,
        transition: "all 0.3s",
        borderLeft: "4px solid " + theme.palette.primary.main,
        "&:hover": {
          boxShadow: 4,
          backgroundColor: "#f0f8ff",
          cursor: "pointer",
        },
      }}
    >
      <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
        <Box
          sx={{
            width: 48,
            height: 48,
            borderRadius: "50%",
            backgroundColor: "#e3f2fd",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
          }}
        >
          <Avatar src={user?.profilePic} />
        </Box>

        <Box>
          <Typography variant="body1" sx={{ fontWeight: 500 }}>
            {/* {message} */}
            {user?.username}
          </Typography>
          <Typography variant="caption" color="text.secondary">
            {/* {timeAgo(createdAt)} */}
            {user
              ? user.specialization
                ? user.specialization
                : user.email
              : ""}
          </Typography>
        </Box>
      </Box>
      {/* {!isRead?
      <Box sx={{}}>
        <Tooltip title="Mark As Read">
        <IconButton onClick={markAsRead}>
        <VisibilityIcon sx={{color:iconColores[icon]}} />
        </IconButton>
        </Tooltip>
      </Box>
      :''} */}

      <Box sx={{ display: "flex", gap: 0 }}>
        {user?.courses?.length > 0 ? (
          <>
            <Tooltip title="Assign to Course">
              <IconButton>
                <AssignmentIndIcon
                  sx={{ fontSize: 28, color: theme.palette.primary.main }}
                />
              </IconButton>
            </Tooltip>
            <Tooltip title="Courses Assigned">
              <IconButton onClick={()=>handleOpen("coursesAssigned",userId)}>
                <FormatListBulletedIcon
                  sx={{ fontSize: 28, color: theme.palette.primary.main }}
                />
              </IconButton>
            </Tooltip>
            <Tooltip title="View Instructor">
              <IconButton>
                <KeyboardArrowRightIcon
                  sx={{ fontSize: 28, color: theme.palette.primary.main }}
                />
              </IconButton>
            </Tooltip>
          </>
        ) : (
          <>
            <Tooltip title="Assign to Course">
              <IconButton>
                <AssignmentIndIcon
                  sx={{ fontSize: 28, color: theme.palette.primary.main }}
                />
              </IconButton>
            </Tooltip>
            <Tooltip title="Remove Instructor">
              <IconButton onClick={kick}>
                <CloseIcon
                  sx={{ fontSize: 28, color: theme.palette.error.main }}
                />
              </IconButton>
            </Tooltip>
          </>
        )}

        {/* <Tooltip title="View Course">
        <IconButton>
            <KeyboardArrowRightIcon sx={{fontSize:28,color:theme.palette.primary.main}} />
        </IconButton>
        </Tooltip> */}
      </Box>
    <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
        sx={{display:"flex",alignItems: "center",justifyContent: "center"}}
      >
  <Box sx={{position:"absolute",display:"flex",bgcolor:"white",alignItems:"center",justifyContent:"center",borderRadius:"15px",overflow:"hidden",width:"70%"}}>
      <Stack sx={{width:"100%"}} direction={"column"} spacing={2}>
      <Header close={()=>{
        setOpen(false);
        setCurrentModal(null);
        setCurrentUser(null);
      }} title={currentModal}/>
      </Stack>
    </Box>
</Modal>
    </Paper>
  );
}
