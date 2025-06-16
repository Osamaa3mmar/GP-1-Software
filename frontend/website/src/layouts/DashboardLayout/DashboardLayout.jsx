import { Navigate, Outlet, useNavigate, useNavigation } from "react-router-dom";
import DashboardLayoutNavbar from "../../component/DashboardLayoutNavbar/DashboardLayoutNavbar";
import { Box } from "@mui/material";
import { useContext } from "react";
import { UserContext } from "../../Context/userContext";
import { toast } from "react-toastify";
import { OrgNotificationsContext } from "../../Context/NotificationsOrgContext";

export default function DashboardLayout() {
  const {user}=useContext(UserContext);

  if(user?.role=='user'){
    toast.warning("You are not allowed 301");
    return <Navigate to={"/main"}/>;
  }
  return (
    
      <Box sx={{minHeight:"100dvh",display:"flex",background:"#edf0fe50"}}>
     <Box sx={{position:"sticky"}}>
      <DashboardLayoutNavbar/>
      </Box>
      <Box sx={{width:"100%",paddingLeft:"2.5%"}}>
      <Outlet/>
      </Box>
      
      </Box>
   
  )
}
