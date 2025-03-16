import {
  Box,
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Stack,
  Typography,
} from "@mui/material";
import SchoolIcon from "@mui/icons-material/School";
import HomeIcon from "@mui/icons-material/Home";
import { LibraryBooks } from "@mui/icons-material";
import { Link, useLocation } from "react-router-dom";

export default function DrawerMain({ collapse, setCollapse }) {
  const { pathname } = useLocation();
  const current = pathname.split("/")[2]
    ? pathname.split("/")[2]
    : pathname.split("/")[1];
  const DrawerList = (
    <Box sx={{ width: 250 }} role="presentation">
      <List>
        <ListItem disablePadding>
          <ListItemButton>
            <ListItemIcon>
              <Stack
                sx={{ alignItems: "center" }}
                direction={"row"}
                spacing={1}
              >
                <SchoolIcon color="primary" sx={{ fontSize: "26px" }} />
                <Typography
                  variant=""
                  color="primary"
                  sx={{ fontSize: "20px", fontWeight: "700" }}
                >
                  EduAcademy
                </Typography>
              </Stack>
            </ListItemIcon>
            <ListItemText />
          </ListItemButton>
        </ListItem>
      </List>
      <Divider />
      <List sx={{ gap: "0px" }}>
        <ListItem>
          <ListItemButton component={Link} to={"main"}>
            <ListItemIcon sx={{ gap: "10px" }}>
              <HomeIcon color={current == "main" ? "primary" : ""} />
              Home
            </ListItemIcon>
            <ListItemText />
          </ListItemButton>
        </ListItem>
        <ListItem>
          <ListItemButton component={Link} to={"courses"}>
            <ListItemIcon sx={{ gap: "10px" }}>
              <LibraryBooks color={current == "courses" ? "primary" : ""} />
              Courses
            </ListItemIcon>
            <ListItemText />
          </ListItemButton>
        </ListItem>
        <ListItem>
          <ListItemButton component={Link} to={"/"}>
            <ListItemIcon sx={{ gap: "10px" }}>
              <HomeIcon color={current == "ssss" ? "primary" : ""} />
              Item Three
            </ListItemIcon>
            <ListItemText />
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );
  return (
    <Drawer open={collapse} onClose={setCollapse}>
      {DrawerList}
    </Drawer>
  );
}
