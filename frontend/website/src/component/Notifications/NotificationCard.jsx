import { Box, Typography, Paper, IconButton, Tooltip, Chip, Divider, Avatar } from '@mui/material';
import React, { useContext } from 'react';
import Icon from './Icon';
import style from './animation.module.css';
import VisibilityIcon from '@mui/icons-material/Visibility';
import DoneAllIcon from '@mui/icons-material/DoneAll';
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
    applay:"#00007c",
    add:"#6a1b9a",
    unassign:"#d32f2f",
    assign:"#388e3c",
    kick:"#ff0000",
    accept:"#28a745"
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
        flexDirection: 'column',
        mb: 2.5,
        borderRadius: 2,
        overflow: 'hidden',
        backgroundColor: isRead ? '#f9f9f9' : '#fff',
        transition: 'all 0.3s ease',
        border: isRead ? '1px solid #e0e0e0' : `1px solid ${iconColores[icon]}66`,
        '&:hover': {
          boxShadow: '0 6px 12px rgba(0,0,0,0.08)',
          transform: 'translateY(-2px)',
        },
      }}
    >
      {/* Top colored bar that indicates notification type */}
      <Box 
        sx={{
          height: '4px',
          width: '100%',
          backgroundColor: iconColores[icon],
          opacity: isRead ? 0.4 : 1
        }}
      />
      
      {/* Main content area */}
      <Box 
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          p: 2,
        }}
      >
        {/* Left side with icon and content */}
        <Box
          component={Link} 
          to={actionUrl}
          sx={{
            display: 'flex',
            gap: 2,
            alignItems: 'flex-start',
            textDecoration: 'none',
            color: 'inherit',
            flexGrow: 1,
          }}
        >
          <Avatar
            sx={{
              width: 48,
              height: 48,
              backgroundColor: `${iconColores[icon]}22`,
              border: `2px solid ${iconColores[icon]}`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
            }}
          >
            <Icon icon={icon} isRead={isRead} />
          </Avatar>

          <Box sx={{ flexGrow: 1 }}>
            <Typography 
              variant="body1" 
              sx={{ 
                fontWeight: isRead ? 400 : 600,
                mb: 0.5,
                color: isRead ? 'text.primary' : '#000',
                lineHeight: 1.4,
              }}
            >
              {message}
            </Typography>
            
            <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
              <Chip 
                size="small" 
                label={timeAgo(createdAt)} 
                sx={{ 
                  fontSize: '0.75rem',
                  height: 22,
                  backgroundColor: isRead ? '#e0e0e0' : `${iconColores[icon]}22`,
                  color: isRead ? 'text.secondary' : iconColores[icon],
                  '& .MuiChip-label': { px: 1 }
                }}
              />
              
              {isRead && (
                <Box sx={{ display: 'flex', alignItems: 'center', ml: 1 }}>
                  <DoneAllIcon sx={{ fontSize: 16, color: '#9e9e9e', mr: 0.5 }} />
                  <Typography variant="caption" color="text.secondary">
                    Read
                  </Typography>
                </Box>
              )}
            </Box>
          </Box>
        </Box>
        
        {/* Right side with action button */}
        {!isRead && (
          <Box sx={{ ml: 1 }}>
            <Tooltip title="Mark as read">
              <IconButton 
                onClick={markAsRead}
                sx={{
                  backgroundColor: `${iconColores[icon]}11`,
                  '&:hover': {
                    backgroundColor: `${iconColores[icon]}22`,
                  }
                }}
                size="small"
              >
                <VisibilityIcon sx={{ fontSize: 20, color: iconColores[icon] }} />
              </IconButton>
            </Tooltip>
          </Box>
        )}
      </Box>
    </Paper>
  );
}
