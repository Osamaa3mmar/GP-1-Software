import { TabContext, TabList, TabPanel } from "@mui/lab";
import { Box, Tab, CircularProgress, Typography, List, ListItem, ListItemText, Avatar, ListItemAvatar, Paper, Grid, IconButton, Chip, useTheme } from "@mui/material";
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import { useNavigate } from "react-router-dom";
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { UserContext } from "../../../Context/UserContext";

export default function Tabs() {
    const theme = useTheme();
    const navigate = useNavigate();
    
    // Helper function to format dates properly
    const formatDate = (dateString) => {
        if (!dateString) return 'Not set';
        
        try {
            const date = new Date(dateString);
            if (isNaN(date.getTime())) return 'Invalid date';
            return date.toLocaleDateString();
        } catch (error) {
            console.error('Date formatting error:', error);
            return 'Invalid date';
        }
    };
    const [value, setValue] = useState('1');
    const [courses, setCourses] = useState([]);
    const [staff, setStaff] = useState([]);
    const [staffDetails, setStaffDetails] = useState([]);
    const [loadingCourses, setLoadingCourses] = useState(false);
    const [loadingStaff, setLoadingStaff] = useState(false);
    const [errorCourses, setErrorCourses] = useState(null);
    const [errorStaff, setErrorStaff] = useState(null);
    const { user } = useContext(UserContext);
    console.log(courses);
    useEffect(() => {
        const fetchCourses = async () => {
            setLoadingCourses(true);
            try {
                const { data } = await axios.get(`http://localhost:4545/course/owner/courses`, {
                    headers: {
                        token: localStorage.getItem("token"),
                    },
                });
                setCourses(data.courses || []);
            } catch (err) {
                setErrorCourses("Failed to load courses");
            } finally {
                setLoadingCourses(false);
            }
        };
        const fetchStaff = async () => {
            setLoadingStaff(true);
            try {
                if (!user?.orgId) {
                    setErrorStaff("No organization ID");
                    setLoadingStaff(false);
                    return;
                }
                const { data } = await axios.get(`http://localhost:4545/applye/getallaccepted/${user.orgId}`);
                setStaff(data.accepted || []);
            } catch (err) {
                setErrorStaff("Failed to load staff");
            } finally {
                setLoadingStaff(false);
            }
        };
        if (user) {
            fetchCourses();
            fetchStaff();
        }
    }, [user]);

    useEffect(() => {
        const fetchStaffDetails = async () => {
            if (!staff.length) return;
            
            try {
                const detailsPromises = staff.map(async (member) => {
                    try {
                        const { data } = await axios.get(`http://localhost:4545/applye/instractour/${member.userId}`);
                        return { ...member, ...data.instructor };
                    } catch (err) {
                        console.error(`Failed to fetch details for user ${member.userId}:`, err);
                        return member;
                    }
                });
                
                const details = await Promise.all(detailsPromises);
                setStaffDetails(details);
            } catch (err) {
                console.error('Failed to fetch staff details:', err);
            }
        };
        
        fetchStaffDetails();
    }, [staff]);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <Box sx={{ marginTop: "120px", width: '100%', typography: 'body1' }}>
            <TabContext value={value}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <TabList variant="fullWidth" onChange={handleChange} aria-label="lab API tabs example">
                        <Tab label="Courses" value="1" />
                        <Tab label="Staff" value="2" />
                    </TabList>
                </Box>
                <TabPanel value="1">
                    {loadingCourses ? (
                        <Box sx={{ display: 'flex', justifyContent: 'center', p: 3 }}>
                            <CircularProgress />
                        </Box>
                    ) : errorCourses ? (
                        <Typography color="error" sx={{ p: 3 }}>{errorCourses}</Typography>
                    ) : (
                        <Box sx={{ p: 2 }}>
                            {courses.length === 0 ? (
                                <Paper elevation={2} sx={{ p: 3, textAlign: 'center' }}>
                                    <Typography>No courses found.</Typography>
                                </Paper>
                            ) : (
                                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                                    {courses.map((course, idx) => (
                                        <Box
                                            key={course.id || idx}
                                            onClick={() => navigate(`/main/course/${course.id}`)}
                                            sx={{
                                                display: "flex",
                                                alignItems: "center",
                                                width: "100%",
                                                borderRadius: "15px",
                                                overflow: "hidden",
                                                border: "1px solid #ccc",
                                                paddingRight: "20px",
                                                backgroundColor: theme.palette.background.paper,
                                                boxShadow: "0px 0px 10px rgba(0,0,0,0.1)",
                                                transition: "all 0.3s",
                                                "&:hover": {
                                                    boxShadow: "0px 0px 20px rgba(0,0,0,0.2)",
                                                    transform: "translateY(5px)",
                                                    cursor: "pointer",
                                                    backgroundColor: "rgba(0,0,0,0.1)",
                                                },
                                                height: "100px",
                                            }}
                                        >
                                            <Box sx={{ marginRight: "20px", width: "200px", height: "100%", overflow: "hidden" }}>
                                                <img 
                                                    src={course.thumbnail || course.backImage || ''} 
                                                    alt={course.title || course.name || 'Course'} 
                                                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                                />
                                            </Box>
                                            <Box
                                                sx={{
                                                    display: "flex",
                                                    flexDirection: "column",
                                                    justifyContent: "space-between",
                                                    height: "80%",
                                                }}
                                            >
                                                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                                                    {course.title || course.name || 'Untitled Course'}
                                                </Typography>
                                                <Box sx={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
                                                    <Chip 
                                                        icon={<CalendarMonthIcon />}
                                                        label={`Start: ${formatDate(course.startDate)}`} 
                                                        color="primary"
                                                        variant="outlined"
                                                    />
                                                    <Chip 
                                                        icon={<CalendarMonthIcon />}
                                                        label={`End: ${formatDate(course.endDate)}`} 
                                                        color="primary"
                                                        variant="outlined"
                                                    />
                                                    <Chip 
                                                        icon={<AttachMoneyIcon />}
                                                        label={`${course.price ? `$${course.price}` : 'Free'}`}
                                                        color="success"
                                                        variant="outlined"
                                                    />
                                                </Box>
                                            </Box>
                                        </Box>
                                    ))}
                                </Box>
                            )}
                        </Box>
                    )}
                </TabPanel>
                <TabPanel value="2">
                    {loadingStaff ? (
                        <Box sx={{ display: 'flex', justifyContent: 'center', p: 3 }}>
                            <CircularProgress />
                        </Box>
                    ) : errorStaff ? (
                        <Typography color="error" sx={{ p: 3 }}>{errorStaff}</Typography>
                    ) : (
                        <Box sx={{ p: 2 }}>
                            {staff.length === 0 ? (
                                <Paper elevation={2} sx={{ p: 3, textAlign: 'center' }}>
                                    <Typography>No staff found.</Typography>
                                </Paper>
                            ) : (
                                <Grid container spacing={2}>
                                    {staffDetails.length > 0 ? staffDetails.map((member, idx) => (
                                        <Grid item xs={12} md={6} key={member.id || idx}>
                                            <Paper
                                                elevation={3}
                                                sx={{
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'space-between',
                                                    padding: 2,
                                                    borderRadius: 2,
                                                    backgroundColor: '#ffffff',
                                                }}
                                            >
                                                {/* Left Side: Avatar + Info */}
                                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                                    <IconButton component={"a"} href={`http://localhost:8081/profile/${localStorage.getItem("token")}?id=${member.userId || member.id || 999}&isMe=false&isMobile=false`}>
                                                        <Avatar src={member.profilePic || member.avatar || ''} sx={{ bgcolor: 'primary.main' }}>
                                                            {(member.name || member.username || 'U')?.charAt(0)?.toUpperCase()}
                                                        </Avatar>
                                                    </IconButton>
                                                    <Box>
                                                        <Typography variant="subtitle1" fontWeight="bold">
                                                            {member.name || member.username || 'Unknown'}
                                                        </Typography>
                                                        <Typography variant="body2" color="text.secondary">
                                                            {member.email || member.mail || 'No email'}
                                                        </Typography>
                                                        <Typography variant="body2" color="text.secondary">
                                                            {member.specialization || member.role || 'Staff'}
                                                        </Typography>
                                                    </Box>
                                                </Box>
                                            </Paper>
                                        </Grid>
                                    )) : staff.map((member, idx) => (
                                        <Grid item xs={12} md={6} key={member.id || idx}>
                                            <Paper
                                                elevation={3}
                                                sx={{
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'space-between',
                                                    padding: 2,
                                                    borderRadius: 2,
                                                    backgroundColor: '#ffffff',
                                                }}
                                            >
                                                {/* Left Side: Avatar + Info */}
                                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                                    <Avatar sx={{ bgcolor: 'primary.main' }}>
                                                        {member.userId?.toString().charAt(0) || 'U'}
                                                    </Avatar>
                                                    <Box>
                                                        <Typography variant="subtitle1" fontWeight="bold">
                                                            Loading details...
                                                        </Typography>
                                                        <Typography variant="body2" color="text.secondary">
                                                            User ID: {member.userId}
                                                        </Typography>
                                                    </Box>
                                                </Box>
                                            </Paper>
                                        </Grid>
                                    ))}
                                </Grid>
                            )}
                        </Box>
                    )}
                </TabPanel>
            </TabContext>
        </Box>
    );
}
