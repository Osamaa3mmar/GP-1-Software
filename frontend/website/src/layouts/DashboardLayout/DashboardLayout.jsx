import { Outlet } from "react-router-dom";
import DashboardLayoutNavbar from "../../component/DashboardLayoutNavbar/DashboardLayoutNavbar";
import { Box, Container } from "@mui/material";

export default function DashboardLayout() {
  return (
    <div>
      <Container maxWidth={"xl"} sx={{display:"flex",width:"100%"}}>
     <Box sx={{position:"sticky"}}>
      <DashboardLayoutNavbar/>
      </Box>
      <Outlet/>
      </Container>
    </div>
  )
}
