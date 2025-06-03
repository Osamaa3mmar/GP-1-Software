import { LibraryBooks } from '@mui/icons-material'
import { TabContext, TabList } from '@mui/lab'
import { Box, Tab } from '@mui/material'
import { Link, useLocation } from 'react-router-dom'
import HomeIcon from "@mui/icons-material/Home";
import { useEffect, useState } from 'react';

export default function Tabs() {
  const {pathname}=useLocation();
    const [tab, setTab] = useState('main');
    
    const tabChange = (event, newval) => {
        setTab(newval);
      };
      useEffect(()=>{
        let path=pathname.split("/")[2]?pathname.split("/")[2]:'main';
        if(path==='classRoom'|| path==="main" || path==="courses"){
        setTab(path);}
        else{
          setTab('main');
        }
      },[]);
  return (
    <TabContext value={tab}>
    <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
      <TabList onChange={tabChange} aria-label="lab API tabs example">
        <Tab
        
          label="Home"
          value="main"
          iconPosition="start"
          icon={<HomeIcon />}
          component={Link}
          to={"main"}
        />
        <Tab
          label="Courses"
          value="courses"
          iconPosition="start"
          icon={<LibraryBooks />}
          component={Link}
          to={"courses"}
        />
         <Tab
          label="Class Room"
          value="classRoom"
          iconPosition="start"
          icon={<LibraryBooks />}
          component={Link}
          to={"classrooms"}
        />
      </TabList>
    </Box>
  </TabContext>
  )
}
