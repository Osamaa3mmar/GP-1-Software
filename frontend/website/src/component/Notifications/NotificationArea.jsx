import { Box, Button, Typography, Paper, Divider, Fade, CircularProgress, Alert, Chip } from '@mui/material';
import NotificationCard from './NotificationCard';
import axios from 'axios';
import { useContext, useState } from 'react';
import { UserContext } from '../../Context/userContext';
import { toast } from 'react-toastify';
import { OrgNotificationsContext } from '../../Context/NotificationsOrgContext';
import { UserNotificationsContext } from '../../Context/NotificationsUserContext';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import FilterListIcon from '@mui/icons-material/FilterList';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';

export default function NotificationArea({ array, type, reload }) {
  const { user } = useContext(UserContext);
  const { setNotificationCount } = useContext(type=="org" ? OrgNotificationsContext : UserNotificationsContext);
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState('all'); // 'all', 'unread', 'read'
  
  const markAll = async() => {
    try {
      setLoading(true);
      const { data } = await axios.post(
        "http://localhost:4545/notifications/setreadall",
        type=='org' ? { orgId: user.orgId } : { userId: user.id }
      );
      reload();
      toast.success(data.message);
      setNotificationCount(0);
    } catch(error) {
      console.log(error);
      toast.info(error.response.data.message);
    } finally {
      setLoading(false);
    }
  }
  
  // Filter notifications based on read status
  const filteredNotifications = array?.filter(notification => {
    if (filter === 'all') return true;
    if (filter === 'unread') return !notification.isRead;
    if (filter === 'read') return notification.isRead;
    return true;
  });
  
  // Count unread notifications
  const unreadCount = array?.filter(notification => !notification.isRead).length || 0;
  
  return (
    <Fade in={true} timeout={500}>
      <Paper 
        elevation={0} 
        sx={{ 
          display: 'flex', 
          flexDirection: 'column', 
          borderRadius: 3,
          overflow: 'hidden',
          border: '1px solid #e0e0e0',
          mt: 2,
          mb: 4,
          backgroundColor: '#fff'
        }}
      >
        {/* Header */}
        <Box 
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            p: 2.5,
            borderBottom: '1px solid #f0f0f0',
            backgroundColor: '#f9f9f9'
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <NotificationsActiveIcon sx={{ mr: 1.5, color: 'primary.main' }} />
            <Typography variant="h6" sx={{ fontWeight: 600 }}>
              Notifications
              {unreadCount > 0 && (
                <Chip 
                  size="small" 
                  label={unreadCount} 
                  color="primary" 
                  sx={{ ml: 1, height: 20, fontSize: '0.75rem' }}
                />
              )}
            </Typography>
          </Box>
          
          <Box sx={{ display: 'flex', gap: 1 }}>
            <Button 
              variant={filter === 'all' ? 'contained' : 'outlined'}
              size="small"
              onClick={() => setFilter('all')}
              sx={{ minWidth: '60px' }}
            >
              All
            </Button>
            <Button 
              variant={filter === 'unread' ? 'contained' : 'outlined'}
              size="small"
              onClick={() => setFilter('unread')}
              color="primary"
              sx={{ minWidth: '80px' }}
            >
              Unread
            </Button>
            <Button 
              variant={filter === 'read' ? 'contained' : 'outlined'}
              size="small"
              onClick={() => setFilter('read')}
              color="secondary"
              sx={{ minWidth: '60px' }}
            >
              Read
            </Button>
          </Box>
        </Box>
        
        {/* Action bar */}
        <Box 
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-end',
            p: 1.5,
            borderBottom: '1px solid #f0f0f0',
            backgroundColor: '#fafafa'
          }}
        >
          <Button 
            startIcon={<DoneAllIcon />}
            onClick={markAll}
            disabled={loading || unreadCount === 0}
            variant="outlined"
            size="small"
            color="primary"
          >
            {loading ? <CircularProgress size={20} /> : 'Mark All as Read'}
          </Button>
        </Box>
        
        {/* Notifications list */}
        <Box sx={{ p: 2.5, pt: 2, maxHeight: '70vh', overflowY: 'auto' }}>
          {filteredNotifications?.length === 0 ? (
            <Alert severity="info" sx={{ my: 2 }}>
              {filter === 'all' 
                ? 'No notifications found' 
                : filter === 'unread' 
                  ? 'No unread notifications' 
                  : 'No read notifications'}
            </Alert>
          ) : (
            filteredNotifications?.map((item, index) => (
              <NotificationCard 
                {...item} 
                type2={type} 
                reload={reload} 
                index={index} 
                key={item.id} 
              />
            ))
          )}
        </Box>
      </Paper>
    </Fade>
  );
}
