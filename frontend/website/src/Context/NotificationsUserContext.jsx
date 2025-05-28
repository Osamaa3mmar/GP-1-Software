import {  createContext, useContext, useEffect, useState } from "react";
import useFetch from "../Hooks/useFetch";
import axios from "axios";
import { UserContext } from "./userContext";



export const UserNotificationsContext=createContext();

const UserNotificationsContextProvider=({children})=>{
    const {user}=useContext(UserContext);
    const [notificationCount,setNotificationCount]=useState(0);
    const [notifications,setNotifications]=useState(0);
    const getUnseen=(arr)=>{
        let count =0;
        arr.forEach((item)=>{
            if(!item.isRead){
                count++;
            }
        })
        setNotificationCount(count);
    }
    const getCount =async (orgId)=>{
        try{
            const {data}=await axios.get(`http://localhost:4545/notifications/user/${user?.id}`);
            setNotifications(data.notifications);
            getUnseen(data.notifications);
            console.log(data,"here");
        }catch(error){
        console.error(error);
        }
    }
    useEffect(()=>{
        getCount(user?.orgId);
    },[user])
    return (
        <UserNotificationsContext.Provider value={{getCount,notifications,setNotifications,setNotificationCount,notificationCount}}>
            {children}
        </UserNotificationsContext.Provider>
    )
}

export default UserNotificationsContextProvider;