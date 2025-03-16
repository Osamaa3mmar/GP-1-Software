import {
  Box,
  Container,
  createTheme,
  IconButton,
  Stack,
  useMediaQuery,
} from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import { useState } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import DrawerMain from "./DrawerMain";
import ProfileMenu from "./ProfileMenu";
import Notification from "./Notification";
import Logo from "./Logo";
import Search from "./Search";
import Tabs from "./Tabs";

export default function MainNavbar() {
  const [collapse, setCollapse] = useState(false);
  const isSmallScreen = useMediaQuery("(max-width:900px)");
  const changeCollapse = () => {
    setCollapse(!collapse);
  };

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

  

  return (
    <ThemeProvider theme={theme}>
      <Container maxWidth={"xl"} sx={{ bgcolor: "secondary.main" }}>
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

          {!isSmallScreen ? (
            <Logo/>
          ) : null}
         <Search/>
          {!isSmallScreen ? (
           <Tabs/>
          ) : (
            ""
          )}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              justifyContent: "space-between",
            }}
          >
            <Notification />
            <ProfileMenu />
          </Box>
        </Stack>
      </Container>

      {isSmallScreen ? (
        <DrawerMain collapse={collapse} setCollapse={changeCollapse} />
      ) : null}
    </ThemeProvider>
  );
}
