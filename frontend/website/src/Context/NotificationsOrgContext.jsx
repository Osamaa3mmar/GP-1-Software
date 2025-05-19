import {  createContext, useContext, useEffect, useState } from "react";
import useFetch from "../Hooks/useFetch";
import axios from "axios";
import { UserContext } from "./userContext";



export const OrgNotificationsContext=createContext();

const OrgNotificationsContextProvider=({children})=>{
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
            const {data}=await axios.get(`http://localhost:4545/notifications/org/${orgId}`);
            setNotifications(data.notifications);
            getUnseen(data.notifications);
            
        }catch(error){
        console.error(error);
        }
    }
    useEffect(()=>{
        getCount(user?.orgId);
    },[user])
    return (
        <OrgNotificationsContext.Provider value={{getUnseen,getCount,notifications,setNotifications,setNotificationCount,notificationCount}}>
            {children}
        </OrgNotificationsContext.Provider>
    )
}

export default OrgNotificationsContextProvider;