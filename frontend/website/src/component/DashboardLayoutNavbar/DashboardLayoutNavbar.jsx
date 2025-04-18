import {
  Box,
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Tooltip,
} from "@mui/material";
import { useState } from "react";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import LogoutIcon from '@mui/icons-material/Logout';
import LocalLibraryRoundedIcon from "@mui/icons-material/LocalLibraryRounded";
import SupervisorAccountIcon from "@mui/icons-material/SupervisorAccount";
import SchoolIcon from "@mui/icons-material/School";
import FeedIcon from "@mui/icons-material/Feed";
import { Link, useLocation } from "react-router-dom";
import MenuOpenIcon from '@mui/icons-material/MenuOpen';
import MenuIcon from '@mui/icons-material/Menu';
import NotificationsIcon from '@mui/icons-material/Notifications';
import image from "../../../public/ac2.jpg";
export default function DashboardLayoutNavbar() {
  const [dOpen, setdOpen] = useState(false);
  const toggleDrawer = () => {
    setdOpen(!dOpen);
  };
  const logout=()=>{

  }
  
  const {pathname}=useLocation();
  const target=pathname.split("/")[2]?pathname.split("/")[2]:'home';
  const nav = [
    {
      label: "Home",
      icon: <HomeRoundedIcon />,
      path: "home",
    },
    {
      label: "Courses",
      icon: <LocalLibraryRoundedIcon />,
      path: "courses",
    },
    {
      label: "Instructors",
      icon: <SupervisorAccountIcon />,
      path: "instructors",
    },
    {
      label: "Students",
      icon: <SchoolIcon />,
      path: "students",
    },
   
    {
      label: "Reports",
      icon: <FeedIcon />,
      path: "reports",
    },
    {
      label: "Notifications",
      icon: <NotificationsIcon />,
      path: "Notifications",
    },
  ];
  return (
    
    <Drawer
      sx={{
        width: dOpen ? 210 : 75,
        flexShrink: 0,
        position: "relative",
        "& .MuiDrawer-paper": {
          width: dOpen ? 210 : 75,
          boxSizing: "border-box",
          transition: "width 0.3s",
          overflow: "hidden",
          zIndex: 1,
        },
      }}
      open={true}
      onClose={toggleDrawer}
      anchor="left"
      variant="persistent"
    >
      <Box sx={{
        display:"flex",
        flexDirection:"column",
        justifyContent: "space-between",
        height:"100%"
      }}>
      <List>
        <Tooltip title={"Knowlege Acadimy"} placement="right">
      
          <Box sx={{margin:"auto",marginY:"5px",display:"flex",flexDirection:"row",alignItems:"center",justifyContent:"center",gap:"4px"}}>
            <img src={image} style={{marginRight:"6px",width:"60px",border:"3px solid #6366f180 ",borderRadius:"10px"}}  alt="" />
           {dOpen?<h4 style={{textAlign:"center",fontSize:"18px",fontWeight:"500",textTransform:"capitalize"}}>osama</h4>:""} 
          </Box>
        
        </Tooltip>
        <Divider />

        <ListItemButton key={"osama"} 
        sx={{paddingX:3,
          margin:"auto",
        marginBottom:"5px",
        marginTop:"5px",
        }}  
        onClick={toggleDrawer}>
          <Box sx={{margin:"auto"}}>
          {dOpen ? <MenuOpenIcon sx={{fontSize:"30px",color:"primary.main"}} /> : <MenuIcon sx={{fontSize:"30px",color:"primary.main"}} />}
          </Box>
        </ListItemButton>
        <Divider />
        {nav.map((item) => (
  <Tooltip placement="right" title={item.label} key={item.path}>
    <ListItem
      sx={{
        
        padding: 1,
        color: item.path == target ? "primary.main" : "",
        fontWeight: target === item.path ? 800 : 400,
      }}
      component={Link}
      to={item.path}
    >
      <ListItemButton sx={{
          borderLeft:target===item.path?"4px solid #6366f1":'',
          background:target === item.path?"#6366f133":'',
           borderRadius:"4px",
          '&:hover':{
            backgroundColor:"#6366f111"
          }
      }} >
        <ListItemIcon sx={{ color: item.path == target ? "primary.main" : "" }}>
          {item.icon}
        </ListItemIcon>
        <ListItemText sx={{ span:{fontWeight:(target == item.path ? 800 : 400)}}} primary={dOpen ? item.label : ""} />
      </ListItemButton>
    </ListItem>
  </Tooltip>
))}

      </List>
      <Box>
      <Tooltip placement="right" title={"Logout"} key={'logout'}>
    <ListItem
    onClick={logout}
      sx={{
        padding: 1,
        color: "error.main",
        fontWeight: 600,
      }}
      component={Link}
      to={'/auth'}
    >
      <ListItemButton sx={{
        background:"#fb2c3622",
        borderRadius:"10px",
        "&:hover":{
          background:"#fb2c3640",
        }
      }}>
        <ListItemIcon sx={{ color: "error.main"}}>
          <LogoutIcon/>
        </ListItemIcon>
        <ListItemText sx={{
          span:{
            fontWeight: 600,
          }
        }} primary={"Logout"} />
      </ListItemButton>
    </ListItem>
  </Tooltip>
      </Box>
      </Box>
    </Drawer>
   
  );
}
