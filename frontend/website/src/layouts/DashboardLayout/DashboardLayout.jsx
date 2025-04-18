import { Outlet } from "react-router-dom";
import DashboardLayoutNavbar from "../../component/DashboardLayoutNavbar/DashboardLayoutNavbar";
import { Box } from "@mui/material";

export default function DashboardLayout() {
  return (
    
      <Box sx={{minHeight:"100dvh",display:"flex",background:"#edf0fe50"}}>
     <Box sx={{position:"sticky"}}>
      <DashboardLayoutNavbar/>
      </Box>
      <Box sx={{width:"100%",paddingX:"2.5%"}}>
      <Outlet/>
      </Box>
      </Box>
   
  )
}
