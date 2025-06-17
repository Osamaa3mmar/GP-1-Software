import {
  Badge,
  Box,
  CircularProgress,
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Tooltip,
  Typography,
} from "@mui/material";
import { useContext, useState, useEffect } from "react";
import axios from "axios";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import LogoutIcon from "@mui/icons-material/Logout";
import LocalLibraryRoundedIcon from "@mui/icons-material/LocalLibraryRounded";
import SupervisorAccountIcon from "@mui/icons-material/SupervisorAccount";
import SchoolIcon from "@mui/icons-material/School";
import FeedIcon from "@mui/icons-material/Feed";
import ChatIcon from "@mui/icons-material/Chat";
import { Link, useLocation, useNavigate } from "react-router-dom";
import MenuOpenIcon from "@mui/icons-material/MenuOpen";
import MenuIcon from "@mui/icons-material/Menu";
import NotificationsIcon from "@mui/icons-material/Notifications";
// Removed static image import
import { toast } from "react-toastify";
import { OrgNotificationsContext } from "../../Context/NotificationsOrgContext";
import { UserContext } from "../../Context/UserContext";
import { MessageCountContext } from "../../Context/MessageCountContext";
export default function DashboardLayoutNavbar() {
  const [dOpen, setdOpen] = useState(false);
  const [orgData, setOrgData] = useState(null);
  const [loading, setLoading] = useState(true);
  const { notificationCount } = useContext(OrgNotificationsContext);
  const { user } = useContext(UserContext);
  const { messageCount } = useContext(MessageCountContext);

  useEffect(() => {
    const fetchOrgData = async () => {
      if (!user?.orgId) return;

      try {
        setLoading(true);
        const { data } = await axios.get(
          `http://localhost:4545/org/getorg/${user.orgId}`
        );
        setOrgData(data.org);
      } catch (error) {
        console.error("Failed to fetch organization data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrgData();
  }, [user,messageCount]);

  const navigate = useNavigate();
  const toggleDrawer = () => {
    setdOpen(!dOpen);
  };
  const logout = () => {
    toast.info("Logout Success.");
    localStorage.removeItem("token");
    navigate("/auth");
  };

  const { pathname } = useLocation();
  const target = pathname.split("/")[2] ? pathname.split("/")[2] : "home";
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

    // {
    //   label: "Reports",
    //   icon: <FeedIcon />,
    //   path: "reports",
    {
      // },    {
      label: "Chat",
      icon: <ChatIcon />,
      path: "chat",
      number: messageCount,
    },
    {
      label: "Notifications",
      icon: <NotificationsIcon />,
      path: "notifications",
      number: notificationCount,
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
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          height: "100%",
        }}
      >
        <List>
          <Tooltip title={orgData?.name || "Academy"} placement="right">
            <Box
              sx={{
                margin: "auto",
                marginY: "5px",
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                gap: "4px",
              }}
            >
              <Box
                sx={{
                  marginRight: "6px",
                  width: "60px",
                  height: "60px",
                  border: "3px solid #6366f180",
                  borderRadius: "10px",
                  overflow: "hidden",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundColor: loading ? "#f0f0f0" : "transparent",
                }}
              >
                {loading ? (
                  <CircularProgress size={30} />
                ) : (
                  <img
                    src={
                      orgData?.profile ||
                      "https://via.placeholder.com/60x60?text=Academy"
                    }
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                    alt={orgData?.name || "Academy"}
                  />
                )}
              </Box>
              {dOpen ? (
                <Typography
                  sx={{
                    textAlign: "center",
                    fontSize: "18px",
                    fontWeight: "500",
                    textTransform: "capitalize",
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    maxWidth: "130px",
                  }}
                >
                  {loading ? "Loading..." : orgData?.name || "Academy"}
                </Typography>
              ) : (
                ""
              )}
            </Box>
          </Tooltip>
          <Divider />

          <ListItemButton
            key={"osama"}
            sx={{
              paddingX: 3,
              margin: "auto",
              marginBottom: "5px",
              marginTop: "5px",
            }}
            onClick={toggleDrawer}
          >
            <Box sx={{ margin: "auto" }}>
              {dOpen ? (
                <MenuOpenIcon
                  sx={{ fontSize: "30px", color: "primary.main" }}
                />
              ) : (
                <MenuIcon sx={{ fontSize: "30px", color: "primary.main" }} />
              )}
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
                <ListItemButton
                  sx={{
                    borderLeft: target === item.path ? "4px solid #6366f1" : "",
                    background: target === item.path ? "#6366f133" : "",
                    borderRadius: "4px",
                    "&:hover": {
                      backgroundColor: "#6366f111",
                    },
                  }}
                >
                  <ListItemIcon
                    sx={{ color: item.path == target ? "primary.main" : "" }}
                  >
                    {item.icon}
                    {item.number != null ? (
                      <Badge
                        badgeContent={item.number}
                        color="primary"
                        overlap="circular"
                      />
                    ) : (
                      ""
                    )}
                  </ListItemIcon>
                  <ListItemText
                    sx={{
                      span: { fontWeight: target == item.path ? 800 : 400 },
                    }}
                    primary={dOpen ? item.label : ""}
                  />
                </ListItemButton>
              </ListItem>
            </Tooltip>
          ))}
        </List>
        <Box>
          <Tooltip placement="right" title={"Home Page"} key={"Home"}>
            <ListItem
              component={Link}
              to={"/main"}
              sx={{
                padding: 1,
                color: "primary.main",
                fontWeight: 600,
              }}
            >
              <ListItemButton
                sx={{
                  background: "#6366f122",
                  borderRadius: "10px",
                  "&:hover": {
                    background: "#6366f140",
                  },
                }}
              >
                <ListItemIcon sx={{ color: "primary.main" }}>
                  <HomeRoundedIcon />
                </ListItemIcon>
                <ListItemText
                  sx={{
                    span: {
                      fontWeight: 600,
                    },
                  }}
                  primary={"Main"}
                />
              </ListItemButton>
            </ListItem>
          </Tooltip>
          <Tooltip placement="right" title={"Logout"} key={"logout"}>
            <ListItem
              onClick={logout}
              sx={{
                padding: 1,
                color: "error.main",
                fontWeight: 600,
              }}
            >
              <ListItemButton
                sx={{
                  background: "#fb2c3622",
                  borderRadius: "10px",
                  "&:hover": {
                    background: "#fb2c3640",
                  },
                }}
              >
                <ListItemIcon sx={{ color: "error.main" }}>
                  <LogoutIcon />
                </ListItemIcon>
                <ListItemText
                  sx={{
                    span: {
                      fontWeight: 600,
                    },
                  }}
                  primary={"Logout"}
                />
              </ListItemButton>
            </ListItem>
          </Tooltip>
        </Box>
      </Box>
    </Drawer>
  );
}
