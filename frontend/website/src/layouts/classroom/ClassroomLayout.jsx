import {  Stack} from '@mui/material'
import { Outlet } from 'react-router-dom'
export default function ClassroomLayout() {
   
  return (
    <Stack sx={{alignItems:"center",background:"#f9faff",minHeight:"100dvh"}}>
       
        <Outlet/>
    </Stack>
  )
}
