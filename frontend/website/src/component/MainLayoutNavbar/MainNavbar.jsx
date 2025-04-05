import {
  Box,
  Container,
  IconButton,
  Stack,
  useMediaQuery,
} from "@mui/material";
import { useState } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import DrawerMain from "./DrawerMain";
import ProfileMenu from "./ProfileMenu";
import Notification from "./Notification";
import Cart from "./Cart";
import Logo from "./Logo";
import Search from "./Search";
import Tabs from "./Tabs";

export default function MainNavbar() {
  const [collapse, setCollapse] = useState(false);
  const isSmallScreen = useMediaQuery("(max-width:900px)");
  const changeCollapse = () => {
    setCollapse(!collapse);
  };


  

  return (
    <>
      <Container style={{
borderRadius: "0px 0px 12px 12px",
boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
backdropFilter: 'blur(5px)',
border: "1px solid rgba(255, 255, 255, 0.3)",
position:"sticky"
  }} maxWidth={"xl"} sx={{zIndex:33, bgcolor: "rgba(255, 255, 255, 0.6)",position:'fixed' ,top:0,right:0 }}>
        <Stack
          direction={"row"}
          sx={{ alignItems: "center", justifyContent: "space-between" }}
          spacing={3}
        >
          {isSmallScreen ? (
            <IconButton onClick={changeCollapse}>
              <MenuIcon sx={{ color: "black", fontSize: "25px" }} />
            </IconButton>
          ) : null}

          {!isSmallScreen ? <Logo /> : null}
          <Search />
          {!isSmallScreen ? <Tabs /> : ""}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              justifyContent: "space-between",
            }}
          >
            <Cart />
            <Notification />
            <ProfileMenu />
          </Box>
        </Stack>
      </Container>

      {isSmallScreen ? (
        <DrawerMain collapse={collapse} setCollapse={changeCollapse} />
      ) : null}
    </>
  );
}
