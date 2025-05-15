import { Button, TextField } from '@mui/material';
import axios from 'axios';
import  { useContext, useState } from 'react'
import { UserContext } from '../../../../Context/UserContext';
import { toast } from 'react-toastify';
import { OrgNotificationsContext } from '../../../../Context/NotificationsOrgContext';

export default function NameForm({setModal,setOrg,name}) {
    const [currentName,setCurrentName]=useState(name?name:'');
    const {user}=useContext(UserContext);
    const {setNotificationCount}=useContext(OrgNotificationsContext);
    
    const editName=async()=>{
        try{
            const {data}=await axios.post(`http://localhost:4545/org/edit/name/${user?.orgId}`,{name:currentName},{
                headers:{
                    token:localStorage.getItem("token"),
                }
            });
            setOrg(prev=>({...prev,name:currentName}));
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
       onChange={(e) => setCurrentName(e.target.value)} 
       label="Organaization Name"
       value={currentName}/>
    </div>
    <div style={{display:"flex",alignItems:"center",justifyContent:"flex-end"}}>
    <Button onClick={editName}  variant="contained" >
        Save
      </Button>
      </div>
    </>
  )
}
