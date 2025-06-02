import { Container, Box, Grid, Typography, Tabs, Tab, Paper, Skeleton, Alert, useTheme } from "@mui/material";
import ClassroomCard from "../../component/UserClassRooms/ClassroomCard";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { UserContext } from "../../Context/userContext";
import SchoolIcon from "@mui/icons-material/School";
import MenuBookIcon from "@mui/icons-material/MenuBook";

const ClassroomsListPage = () => {
  const theme = useTheme();
  const { user } = useContext(UserContext);
  const [activeTab, setActiveTab] = useState(0);
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [teachingCourses, setTeachingCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const isTeacher = user?.role === "tech" || user?.role === "owner";

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  const fetchEnrolledCourses = async () => {
    try {
      const response = await axios.post("http://localhost:4545/user/fullprofile", {
        id: user.id
      }, {
        headers: {
          token: localStorage.getItem("token")
        }
      });
      setEnrolledCourses(response.data.user.enrollments || []);
    } catch (error) {
      console.error("Failed to fetch enrolled courses:", error);
      setError("Failed to load your enrolled courses. Please try again later.");
    }
  };

  const fetchTeachingCourses = async () => {
    if (!isTeacher) return;

    try {
      const response = await axios.get("http://localhost:4545/course/teacher", {
        headers: {
          token: localStorage.getItem("token")
        }
      });
      setTeachingCourses(response.data.courses || []);
    } catch (error) {
      console.error("Failed to fetch teaching courses:", error);
      setError("Failed to load courses you're teaching. Please try again later.");
    }
  };

  useEffect(() => {
    if (!user) return;

    setLoading(true);
    setError(null);

    const fetchData = async () => {
      await fetchEnrolledCourses();

      if (isTeacher) {
        await fetchTeachingCourses();
      }

      setLoading(false);
    };

    fetchData();
  }, [user, isTeacher]);

  // Prepare teaching courses data to match the structure expected by ClassroomCard
  const formattedTeachingCourses = teachingCourses.map(course => ({
    course: {
      ...course,
      teacher: user // The current user is the teacher
    },
    progress: 100 // Teachers have full access to their courses
  }));

  // Display skeleton loaders while loading
  const renderSkeletons = () => {
    return Array(6).fill(0).map((_, index) => (
      <Grid item key={index} xs={12} sm={12} md={6} lg={4}>
        <Box sx={{ m: 3, height: '400px' }}>
          <Skeleton variant="rectangular" height={180} sx={{ borderRadius: '12px 12px 0 0' }} />
          <Skeleton variant="rectangular" height={220} sx={{ borderRadius: '0 0 12px 12px' }} />
        </Box>
      </Grid>
    ));
  };

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom fontWeight="bold" sx={{ mb: 4 }}>
        My Classrooms
      </Typography>

      {isTeacher && (
        <Paper elevation={0} sx={{ mb: 4, borderRadius: 2, overflow: 'hidden' }}>
          <Tabs
            value={activeTab}
            onChange={handleTabChange}
            variant="fullWidth"
            textColor="primary"
            indicatorColor="primary"
            aria-label="classroom tabs"
            sx={{
              '.MuiTab-root': {
                py: 2,
                fontWeight: 'medium',
              }
            }}
          >
            <Tab
              icon={<MenuBookIcon />}
              iconPosition="start"
              label="Courses I'm Taking"
            />
            <Tab
              icon={<SchoolIcon />}
              iconPosition="start"
              label="Courses I'm Teaching"
            />
          </Tabs>
        </Paper>
      )}

      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>{error}</Alert>
      )}

      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={1}>
          {loading ? (
            renderSkeletons()
          ) : activeTab === 0 ? (
            enrolledCourses.length > 0 ? (
              enrolledCourses.map((course) => (
                <Grid item key={course.course.id} xs={12} sm={12} md={6} lg={4}>
                  <ClassroomCard course={course} />
                </Grid>
              ))
            ) : (
              <Box sx={{ width: '100%', textAlign: 'center', py: 8 }}>
                <Typography variant="h6" color="text.secondary">
                  You are not enrolled in any courses yet.
                </Typography>
              </Box>
            )
          ) : (
            formattedTeachingCourses.length > 0 ? (
              formattedTeachingCourses.map((course) => (
                <Grid item key={course.course.id} xs={12} sm={12} md={6} lg={4}>
                  <ClassroomCard course={course} isTeaching={true} />
                </Grid>
              ))
            ) : (
              <Box sx={{ width: '100%', textAlign: 'center', py: 8 }}>
                <Typography variant="h6" color="text.secondary">
                  You are not teaching any courses yet.
                </Typography>
              </Box>
            )
          )}
        </Grid>
      </Box>
    </Container>
  );
};
export default ClassroomsListPage;