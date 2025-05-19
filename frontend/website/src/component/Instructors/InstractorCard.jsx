import { FileCopy } from '@mui/icons-material';
import { Avatar, Box, Button, IconButton, Tooltip, Typography, Paper } from '@mui/material';
import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { OrgNotificationsContext } from '../../Context/NotificationsOrgContext';

export default function InstractorCard({ userId,id,accept,denied }) {
  const [user, setUser] = useState(null);
    const {setNotificationCount}=useContext(OrgNotificationsContext);
  const getUser = async () => {
    try {
      const { data } = await axios.get(`http://localhost:4545/applye/instractour/${userId}`);
      setUser(data.instructor);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getUser();
  }, [userId]);

  return (
    <Paper
      elevation={3}
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 2,
        borderRadius: 2,
        
        margin: 'auto',
        mb: 2,
        backgroundColor: '#ffffff',
      }}
    >
      {/* Left Side: Avatar + Info */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <IconButton component={"a"} href={`http://localhost:8081/profile/${localStorage.getItem("token")}?id=${userId?userId:999}&isMe=false&isMobile=false`}>
        <Avatar src={user?.profilePic} sx={{ bgcolor: 'primary.main' }}>
          {user?.username?.charAt(0)?.toUpperCase() || '?'}
        </Avatar>
        </IconButton>
        <Box>
          <Typography variant="subtitle1" fontWeight="bold">
            {user?.username || 'Loading...'}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {user?.specialization?user.specialization:user?.email}
          </Typography>
        </Box>
      </Box>

      {/* Right Side: Actions */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <Tooltip title="Open Resume">
          <a href={user?.files?.resume || '#'} target="_blank" rel="noopener noreferrer">
            <IconButton color="primary">
              <FileCopy />
            </IconButton>
          </a>
        </Tooltip>
        <Button  onClick={()=>{denied(id);setNotificationCount((prev)=>(prev+1)) }} variant="outlined" color="error" size="small">
          Deny
        </Button>
        <Button  onClick={()=>{accept(id);setNotificationCount((prev)=>(prev+1)) }} variant="contained" color="success" size="small">
          Accept
        </Button>
      </Box>
    </Paper>
  );
}
