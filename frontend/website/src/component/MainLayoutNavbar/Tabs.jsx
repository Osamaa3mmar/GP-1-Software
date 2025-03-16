import { LibraryBooks } from '@mui/icons-material'
import { TabContext, TabList } from '@mui/lab'
import { Box, Tab } from '@mui/material'
import { Link } from 'react-router-dom'
import HomeIcon from "@mui/icons-material/Home";
import { useState } from 'react';

export default function Tabs() {
    const [tab, setTab] = useState("1");

    const tabChange = (event, newval) => {
        setTab(newval);
      };

  return (
    <TabContext value={tab}>
    <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
      <TabList onChange={tabChange} aria-label="lab API tabs example">
        <Tab
          label="Home"
          value="1"
          iconPosition="start"
          icon={<HomeIcon />}
          component={Link}
          to={"main"}
        />
        <Tab
          label="Courses"
          value="2"
          iconPosition="start"
          icon={<LibraryBooks />}
          component={Link}
          to={"courses"}
        />
        
      </TabList>
    </Box>
  </TabContext>
  )
}
