import { Box, Typography, Paper, IconButton, Tooltip } from '@mui/material';
import React, { useContext } from 'react';
import Icon from './Icon';
import style from './animation.module.css';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { use } from 'react';
import { OrgNotificationsContext } from '../../Context/NotificationsOrgContext';
import axios from 'axios';
import { UserNotificationsContext } from '../../Context/NotificationsUserContext';
import { Link } from 'react-router-dom';
export default function NotificationCard({
  id, type,type2, icon, message, actionUrl,reload,
  isRead, createdAt, userId, organizationId, index = 0
}) {
const {setNotificationCount}=useContext(type2=="org"?OrgNotificationsContext:UserNotificationsContext);
const iconColores = {
    user: "#1976d2",
    create: "#388e3c",
    edit: "#f57c00",
    warning: "#d32f2f",
    applay:"#00007c"
  };

  function timeAgo(dateString) {
    const now = new Date();
    const past = new Date(dateString);
    const seconds = Math.floor((now - past) / 1000);

    const intervals = [
      { label: 'year', seconds: 31536000 },
      { label: 'month', seconds: 2592000 },
      { label: 'week', seconds: 604800 },
      { label: 'day', seconds: 86400 },
      { label: 'hour', seconds: 3600 },
      { label: 'minute', seconds: 60 },
      { label: 'second', seconds: 1 },
    ];

    for (const interval of intervals) {
      const count = Math.floor(seconds / interval.seconds);
      if (count > 0) {
        return `about ${count} ${interval.label}${count !== 1 ? 's' : ''} ago`;
      }
    }

    return 'just now';
  }
  const markAsRead=async ()=>{
    try{
      const{data}=await axios.get(`http://localhost:4545/notifications/setread/${id}`);
      console.log(data);
      setNotificationCount(prev=>(prev!=0?(prev-1):0));
      reload();
    }catch(error){
      console.log(error);
    }
  }
  return (
    <Paper
      className={style.animateCard}
      style={{ animationDelay: `${index * 0.1}s` }}
      elevation={isRead ? 1 : 3}
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent:"space-between",
        gap: 2,
        p: 2,
        mb: 2,
        borderRadius: 3,
        backgroundColor: isRead ? '#f5f5f5' : `${iconColores[icon]}22`,
        transition: 'all 0.3s',
        borderLeft: isRead ? '4px solid #ccc' : `4px solid ${iconColores[icon]}`,
        '&:hover': {
          boxShadow: 4,
          backgroundColor: '#f0f8ff',
          cursor: 'pointer',
        },
      }}
     
    >
      <Box
       component={Link} to={actionUrl}
      sx={{display: 'flex',
        gap: 2,
        alignItems: 'center',}}>
      <Box
        sx={{
          width: 48,
          height: 48,
          borderRadius: '50%',
          backgroundColor: '#e3f2fd',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
        }}
      >
        <Icon icon={icon} isRead={isRead} />
      </Box>

      <Box>
        <Typography variant="body1" sx={{ fontWeight: isRead ? 400 : 500 }}>
          {message}
        </Typography>
        <Typography variant="caption" color="text.secondary">
          {timeAgo(createdAt)}
        </Typography>
      </Box>
      </Box>
      {!isRead?
      <Box sx={{}}>
        <Tooltip title="Mark As Read">
        <IconButton onClick={markAsRead}>
        <VisibilityIcon sx={{color:iconColores[icon]}} />
        </IconButton>
        </Tooltip>
      </Box>
      :''}
      
    </Paper>
  );
}
