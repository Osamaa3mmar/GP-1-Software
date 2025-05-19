import { Button, TextField } from '@mui/material'
import React, { useContext, useState } from 'react'
import { UserContext } from '../../../../Context/UserContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import { OrgNotificationsContext } from '../../../../Context/NotificationsOrgContext';

export default function DescriptionForm({description,setOrg,setModal}) {
    const {setNotificationCount}=useContext(OrgNotificationsContext);

    const [currentDescription,setCurrentDescription]=useState(description?description:'');
    const {user}=useContext(UserContext);
    const editDescription=async()=>{
        try{
            const {data}=await axios.post(`http://localhost:4545/org/edit/description/${user?.orgId}`,{description:currentDescription},{
                headers:{
                    token:localStorage.getItem("token"),
                }
            });
            setOrg(prev=>({...prev,description:currentDescription}));
            toast.success(data.message);
            setModal(false);
            setNotificationCount(prev=>(prev+1));
        }catch(error){
            console.log(error);
        }
    }
  return (<>
    <div style={{marginBottom:"14px"}}>
    <TextField
  fullWidth
  multiline
  rows={14} // You can change the number of visible rows
  onChange={(e) => setCurrentDescription(e.target.value)}
  label="Organization Description"
  value={currentDescription}
/>

    </div>
    <div style={{display:"flex",alignItems:"center",justifyContent:"flex-end"}}>
    <Button onClick={editDescription}  variant="contained" >
        Save
      </Button>
      </div>
    </>
  )
}
