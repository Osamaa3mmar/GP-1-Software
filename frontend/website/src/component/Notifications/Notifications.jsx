import { useContext, useEffect,  useState } from 'react'
import NotificationArea from './NotificationArea'
import axios from 'axios';
import { UserContext } from '../../Context/userContext';

export default function Notifications({type}) {
const userNotificationUrl="http://localhost:4545/notifications/user";
const orgNotificationUrl="http://localhost:4545/notifications/org";
const {user}=useContext(UserContext);
const [notifications,setNotifications]=useState([]);

const getNotification=async()=>{
    try{
        let url;
        if (type === "org") {
            // For organization notifications, include role and userId as query parameters
            url = `${orgNotificationUrl}/${user?.orgId}?role=${user?.role}&userId=${user?.id}`;
        } else {
            // For user notifications, use the existing URL structure
            url = `${userNotificationUrl}/${user?.id}`;
        }
        
        const {data} = await axios.get(url);
        setNotifications(data.notifications);
    }catch(error){
        console.log(error);
    }
}


    useEffect(()=>{
        getNotification();
    },[type,user])
  return (
    <>
    <NotificationArea array={notifications} reload={getNotification} type={type}/>
    </>
  )
}
