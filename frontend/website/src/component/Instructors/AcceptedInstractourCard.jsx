import { Avatar, Box, IconButton, Paper, Tooltip, Typography, useTheme } from '@mui/material'

import style from '../Notifications/animation.module.css'
import { useEffect, useState } from 'react';
import PersonRemoveAlt1Icon from '@mui/icons-material/PersonRemoveAlt1';
import WorkIcon from '@mui/icons-material/Work';
import axios from 'axios';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';
export default function AcceptedInstractourCard({index,userId,getAll}) {
    const [user, setUser] = useState({});
    const theme=useTheme();
    const getUser=async()=>{
        try{
            const {data}=await axios.get("http://localhost:4545/applye/getuser/"+userId);
            setUser(data.user);
            
        }catch(error){
            console.log(error);
        }
    }
    const kick=async()=>{
      Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, remove it!'
      }).then(async (result) => {
        if (result.isConfirmed) {
          const {data}=await axios.delete("http://localhost:4545/applye/kick/"+userId);
          toast.success(data.message);
          getAll();
        }
      })
        
    }

    useEffect(()=>{
     getUser();   
    },[userId])
  return (

     <Paper
      className={style.animateCard}
      style={{ animationDelay: `${index * 0.1}s` }}
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent:"space-between",
        gap: 2,
        p: 2,
        mb: 2,
        borderRadius: 3,
        backgroundColor: theme.palette.primary.main+22,
        transition: 'all 0.3s',
        borderLeft:'4px solid '+theme.palette.primary.main,
        '&:hover': {
          boxShadow: 4,
          backgroundColor: '#f0f8ff',
          cursor: 'pointer',
        },
      }}
     
    >
      <Box
       
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
        <Avatar 
        src={user?.profilePic}/>
      </Box>

      <Box>
        <Typography variant="body1" sx={{ fontWeight:500 }}>
          {/* {message} */}
          {user?.username}
        </Typography>
        <Typography variant="caption" color="text.secondary">
          {/* {timeAgo(createdAt)} */}
          {user?user.specialization?user.specialization:user.email: ''}
        </Typography>
      </Box>
      </Box>
      {/* {!isRead?
      <Box sx={{}}>
        <Tooltip title="Mark As Read">
        <IconButton onClick={markAsRead}>
        <VisibilityIcon sx={{color:iconColores[icon]}} />
        </IconButton>
        </Tooltip>
      </Box>
      :''} */}
      <Box sx={{display:"flex",gap:2}}>
        <Tooltip title="Assign to Course">
        <IconButton>
            <WorkIcon sx={{fontSize:28,color:theme.palette.primary.main}} />
        </IconButton>
        </Tooltip>
        <Tooltip title="Remove Instructor">
        <IconButton onClick={kick}>
            <PersonRemoveAlt1Icon sx={{fontSize:28,color:theme.palette.error.main}} />
        </IconButton>
        </Tooltip>

      </Box>
    </Paper>
  )
}
