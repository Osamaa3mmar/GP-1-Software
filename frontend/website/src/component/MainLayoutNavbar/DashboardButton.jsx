import { IconButton, Tooltip } from "@mui/material";
import SpaceDashboardIcon from '@mui/icons-material/SpaceDashboard';import { Link } from "react-router-dom";
export default function DashboardButton() {
  return (
    <div style={{position:"fixed",bottom:"5%",right:"3%"}}>
        <Tooltip title="Dashboard">
    <IconButton
    component={Link}
    to={"/dashboard"}
  sx={{
   
    backgroundColor: '#6366f120',
    border: '2px solid #6366f1',
    color:"#6366f1",
    '&:hover': {
        backgroundColor: '#6366f1',
        border: '2px solid transparent',
        color:"white"
    },
  }}
>
  <SpaceDashboardIcon sx={{ fontSize: '50px' }} />
</IconButton>
</Tooltip>
    </div>
  )
}
