import {
  Box,
  createTheme,
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  ThemeProvider,
  Tooltip,
} from "@mui/material";
import { useState } from "react";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import SwapHorizontalCircleOutlinedIcon from "@mui/icons-material/SwapHorizontalCircleOutlined";
import LocalLibraryRoundedIcon from "@mui/icons-material/LocalLibraryRounded";
import SupervisorAccountIcon from "@mui/icons-material/SupervisorAccount";
import SchoolIcon from "@mui/icons-material/School";
import FeedIcon from "@mui/icons-material/Feed";
import { Link, useLocation } from "react-router-dom";
import MenuOpenIcon from '@mui/icons-material/MenuOpen';
import MenuIcon from '@mui/icons-material/Menu';
export default function DashboardLayoutNavbar() {
  const [dOpen, setdOpen] = useState(false);
  const toggleDrawer = () => {
    setdOpen(!dOpen);
  };
  const {pathname}=useLocation();
const theme = createTheme({
    palette: {
      primary: {
        main: "#6366f1",
      },
      secondary: {
        main: "#f5f5f5",
      },
    },
  });
  const target=pathname.split("/")[2]?pathname.split("/")[2]:'home';
  const nav = [
    {
      label: "Home",
      icon: <HomeRoundedIcon />,
      path: "home",
    },
    {
      label: "Enrollments",
      icon: <SwapHorizontalCircleOutlinedIcon />,
      path: "enrollments",
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
      label: "Transactions",
      icon: <SwapHorizontalCircleOutlinedIcon />,
      path: "transactions",
    },
    {
      label: "Reports",
      icon: <FeedIcon />,
      path: "reports",
    },
  ];
  return (
    <ThemeProvider theme={theme}>
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
      <List>
        <ListItemButton key={"osama"} 
        sx={{paddingX:3,
          margin:"auto",
        marginBottom:"10px",
        }}  
        onClick={toggleDrawer}>
          <Box sx={{margin:"auto"}}>
          {dOpen ? <MenuOpenIcon sx={{fontSize:"30px",color:"primary.main"}} /> : <MenuIcon sx={{fontSize:"30px",color:"primary.main"}} />}
          </Box>
        </ListItemButton>
        <Divider />
        {nav.map((item,index) => {
          return (
            <>
              <Tooltip placement="right"  title={item.label} key={index}>
                <ListItem
                  sx={{ padding: 1,
                    color:item.path==target?'primary.main':'',
                    fontWeight: target === item.path? 600 : 400,
                   }}
                  component={Link}
                  to={item.path}
                  
                >
                  <ListItemButton >
                    <ListItemIcon sx={{color:item.path==target?'primary.main':''}} >{item.icon}</ListItemIcon>
                    <ListItemText primary={dOpen ? item.label : ""} />
                  </ListItemButton>
                </ListItem>
              </Tooltip>
            </>
          );
        })}
      </List>
    </Drawer>
    </ThemeProvider>
  );
}
