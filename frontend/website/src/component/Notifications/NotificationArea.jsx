import { Box, Button, Typography } from '@mui/material';
import NotificationCard from './NotificationCard';
import axios from 'axios';
import { useContext } from 'react';
import UserContextProvider, { UserContext } from '../../Context/userContext';
import { toast } from 'react-toastify';
import { OrgNotificationsContext } from '../../Context/NotificationsOrgContext';
import { UserNotificationsContext } from '../../Context/NotificationsUserContext';

export default function NotificationArea({ array, type,reload }) {
  const {user}=useContext(UserContext);
  const {setNotificationCount}=useContext(type=="org"?OrgNotificationsContext:UserNotificationsContext);
  const markAll=async()=>{
    try{
      const {data}=await axios.post("http://localhost:4545/notifications/setreadall",type=='org'?{orgId:user.orgId}:{userId:user.id});
      reload();
      toast.success(data.message);
      setNotificationCount(0);
    }catch(error){
      console.log(error);
      toast.info(error.response.data.message);
    }
  }
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', px: 2, py: 1, mt: 4 }}>
      <Box sx={{display:"flex",alignItems:"center",justifyContent:"space-between"}}>
      <Typography variant="h6" sx={{ mb: 2 }}>
        {'Notifications'}
      </Typography>
      <Button sx={{mb:2}} onClick={markAll}>
        Mark All As Read
      </Button>
      </Box>
      {array?.map((item, index) => (
        <NotificationCard {...item} type2={type} reload={reload} index={index} key={item.id} />
      ))}
    </Box>
  );
}
