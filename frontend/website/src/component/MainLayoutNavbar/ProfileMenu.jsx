import { Logout } from "@mui/icons-material";
import { Avatar, Divider, IconButton, ListItemIcon, Menu, MenuItem, Tooltip } from "@mui/material";
import { useContext, useState } from "react";
import {  useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { UserContext } from "../../Context/userContext";

export default function ProfileMenu() {
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const navigate=useNavigate();
    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
      setAnchorEl(null);
    };

    const logut=()=>{
        handleClose();
        toast.info("Logout Success.")
        localStorage.removeItem('token');
        navigate('/auth');
    }

    const {user}=useContext(UserContext);
  return (<>
  <Tooltip title="Profile">
    <span>
    <IconButton 
    onClick={handleClick}
    aria-controls={open ? 'account-menu' : undefined}
    aria-haspopup="true"
    aria-expanded={open ? 'true' : undefined}
    loading={user?false:true}>
    <Avatar   src={user?user.profilePic:''}></Avatar>
    
    </IconButton>
    </span>
    </Tooltip>





    <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        slotProps={{
          paper: {
            elevation: 0,
            sx: {
              overflow: 'visible',
              filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
              mt: 1.5,
              '& .MuiAvatar-root': {
                width: 32,
                height: 32,
                ml: -0.5,
                mr: 1,
              },
              '&::before': {
                content: '""',
                display: 'block',
                position: 'absolute',
                top: 0,
                right: 14,
                width: 10,
                height: 10,
                bgcolor: 'background.paper',
                transform: 'translateY(-50%) rotate(45deg)',
                zIndex: 0,
              },
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <MenuItem onClick={() => {
          handleClose();
          navigate(`/main/profile/user/${user?.id}`);
        }}>
          <Avatar src={user?user.profilePic:''}/> {user?user.username:'Profile'}
        </MenuItem>
        <Divider />
       
        <MenuItem onClick={logut}>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
    </>
  )
}
