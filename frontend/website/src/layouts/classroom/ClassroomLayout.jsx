import { Box, IconButton, Stack, Tooltip, useTheme } from '@mui/material'
import React from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
export default function ClassroomLayout() {
    const theme =useTheme();
      const navigate = useNavigate();

    const backStep=()=>{
        navigate(-1);
    }
  return (
    <Stack sx={{alignItems:"center",background:"#f9faff",minHeight:"100dvh"}}>
        <Tooltip title={"Back"}>
        <IconButton onClick={backStep} sx={{color:`${theme.palette.primary.main}`,background:`${theme.palette.primary.main}22`,border:`2px solid ${theme.palette.primary.main}`,alignSelf:"flex-start", margin:"30px 30px"}}>
            <ArrowBackIosNewIcon sx={{fontSize:20}}/>
        </IconButton>
        </Tooltip>
        <Outlet/>
    </Stack>
  )
}
