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
        const {data}=await axios.get(type=="org"?orgNotificationUrl+`/${user?.orgId}`:userNotificationUrl+`/${user?.id}`);
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
