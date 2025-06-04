// React is imported for JSX transformation
import { 
  Container, 
  Grid, 
  Typography, 
  Chip, 
  Rating, 
  Button, 
  Box,
  CircularProgress,
  Alert,
  Modal,
  Stack,
  IconButton
} from '@mui/material';
import { Check } from '@mui/icons-material';
import { useParams, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from "axios";

// Import the components we created
import CourseBanner from '../../component/Courses/CourseDetails/CourseBanner';
import CourseScheduleInfo from '../../component/Courses/CourseDetails/CourseScheduleInfo';
import CourseLearningOutcomes from '../../component/Courses/CourseDetails/CourseLearningOutcomes';
import CourseLearningPath from '../../component/Courses/CourseDetails/CourseLearningPath';
import CourseCurriculum from '../../component/Courses/CourseDetails/CourseCurriculum';
import CourseDescription from '../../component/Courses/CourseDetails/CourseDescription';
import CourseInstructor from '../../component/Courses/CourseDetails/CourseInstructor';
import CourseOrganization from '../../component/Courses/CourseDetails/CourseOrganization';
import CourseReviews from '../../component/Courses/CourseDetails/CourseReviews';
import CourseSidebar from '../../component/Courses/CourseDetails/CourseSidebar';

import CloseIcon from "@mui/icons-material/Close";
import { toast } from 'react-toastify';


const CourseDetails = () => {
  const { id } = useParams();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [checkRate, setCheckRate] = useState(false);
   const [checkEnrollment, setCheckEnrollment] = useState(false);
  useEffect(() => {
    const fetchCourse = async () => {
      try {
        setLoading(true);
        setError(null);
        const { data } = await axios.get(`http://localhost:4545/course/getdetailedinfo/${id}`, {
          headers: {
            token: localStorage.getItem('token')
          }
        });
        setCourse(data.course);
      } catch (error) {
        console.error("Failed to fetch course details:", error);
        setError(error.response?.data?.message || "Failed to load course details");
      } finally {
        setLoading(false);
      }
    };
  
    fetchCourse();
  }, [id]);
  const check = async () => {
    try {
      let res=await axios.get("http://localhost:4545/rate/checkisrate", {
        params: {
          courseId: id
        },
        headers: {
          token: localStorage.getItem("token")
        }

      })
      let {data}=await axios.get("http://localhost:4545/cart/checkenrollment", {
        params: {
          courseId: id
        },
        headers: {
          token: localStorage.getItem("token")
        }
      });
      setCheckEnrollment(data.enrolled);
      setCheckRate(res.data.hasRated);
    } catch (error) {
      console.error("Error checking course enrollment:", error);
    }
  };
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 420,
  bgcolor: "background.paper",
  borderRadius: 3,
  boxShadow: 24,
  p: 4,
};
const onRateSubmit = async (rating) => {
  try {
    const response = await axios.post("http://localhost:4545/rate/ratecourse", {
      courseId: id,
      rating: rating
    }, {
      headers: {
        token: localStorage.getItem("token")
      }
    });
    if (response.status === 200) {
      console.log("Rating submitted successfully:", response.data);
      setCheckRate(true);
      setCourse(response.data.course); // Update course with new rating
      toast.success("Rating submitted successfully!");
    } else {
      console.error("Failed to submit rating:", response.data);
    }

  } catch (error) {
    console.error("Error submitting rating:", error);
  }
}
  const [value, setValue] = useState(0);
const handleRate = () => {
    if (value > 0) {
      onRateSubmit(value);
      console.log(value);
      handleClose();
    }
  };
  const [enrollNumber, setEnrollNumber] = useState(0);
  const getAllEnrolments = async () => {
    try {
      const {data}= await axios.get("http://localhost:4545/enrollments/all/"+id, {
        headers: {
          token: localStorage.getItem("token")
        }
      });
      setEnrollNumber(data.users.length);
    } catch (error) {
      console.error("Error fetching enrolments:", error);
    }
  };
    useEffect(() => {
      check();
      getAllEnrolments();
    },[]);
  // Mock data - replace with API calls
  // const course = {
  //   id: courseId,
  //   title: "Modern Web Development Bootcamp",
  //   videoUrl: "https://www.youtube.com/embed/your-video-id",
  //   description: "Become a full-stack developer with modern technologies...",
  //   requirements: ["Basic HTML/CSS knowledge", "JavaScript fundamentals", "Computer with 4GB RAM"],
  //   goals: ["Build production-ready apps", "Master React & Node.js", "Deploy to cloud platforms"],
  //   tags: {
  //     category: ["Web Development", "Programming"],
  //     stats: [
  //       { label: "Online", icon: "🌐" },
  //       { label: "60 Hours", icon: "⏳" },
  //       { label: "Lifetime Access", icon: "🔒" }
  //     ]
  //   },
  //   price: 189.99,
  //   rating: 4.7,
  //   topics: [
  //     {
  //       module: "HTML & CSS Fundamentals",
  //       lessons: ["Semantic HTML", "CSS Grid", "Responsive Design"]
  //     },
  //     {
  //       module: "JavaScript Mastery",
  //       lessons: ["ES6+ Features", "Async Programming", "DOM Manipulation"]
  //     }
  //   ],
  //   reviews: [
  //     {
  //       user: "John D.",
  //       rating: 5,
  //       comment: "Best course I've ever taken!",
  //       date: "2024-03-15"
  //     }
  //   ],
  //   instructor: {
  //     name: "Sarah Johnson",
  //     bio: "Senior Full-Stack Developer with 10+ years experience...",
  //     avatar: "/path/to/avatar.jpg",
  //     coursesCount: 15
  //   }
  // };

  // Format date helper function
  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  };

  if (loading) {
    return (
      <Container sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
        <CircularProgress />
        <Typography variant="h6" sx={{ ml: 2 }}>Loading course details...</Typography>
      </Container>
    );
  }

  if (error) {
    return (
      <Container sx={{ py: 4 }}>
        <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>
        <Button component={Link} to="/courses" variant="contained">Back to Courses</Button>
      </Container>
    );
  }

  if (!course) {
    return (
      <Container sx={{ py: 4 }}>
        <Alert severity="info">Course not found</Alert>
        <Button component={Link} to="/courses" variant="contained" sx={{ mt: 2 }}>Browse Courses</Button>
      </Container>
    );
  }

  // Parse tags if they exist
  const courseTags = course.tags && typeof course.tags === 'string' 
    ? JSON.parse(course.tags) 
    : (course.tags || {});

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      {/* Header Section */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h3" gutterBottom>{course.title}</Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: 2 }}>
          <Rating value={(course.rating/course.numberRating) || 0} precision={0.1} readOnly />
          <Typography variant="subtitle1">{enrollNumber || 0} students enrolled</Typography>
          {course.completionStatus === 'completed' && (
            <Chip label="Completed" color="success" />
          )}
          {course.completionStatus === 'inProgress' && (
            <Chip label="In Progress" color="primary" />
          )}
          {checkEnrollment?
          <Button
            variant="contained"
            color="primary"
            disabled={checkRate}
            onClick={handleOpen}
            >
            Rate
          </Button>:null}

        </Box>
      </Box>

      {/* Main Content Grid */}
      <Grid container spacing={4}>
        {/* Left Column */}
        <Grid item xs={12} md={8} sx={{ order: { xs: 2, md: 1 } }}>
          {/* Course Banner */}
          <CourseBanner course={course} />
          
          {/* Course Schedule */}
          {/* <CourseScheduleInfo course={course} formatDate={formatDate} /> */}

          {/* Learning Outcomes */}
          <CourseLearningOutcomes learningOutcomes={course.learningOutcomes} />

          {/* Learning Path */}
          <CourseLearningPath learningPath={course.learningPath} />
          
          {/* Course Curriculum */}
          {/* {courseTags.topics && Array.isArray(courseTags.topics) && courseTags.topics.length > 0 && (
            <CourseCurriculum topics={courseTags.topics} />
          )} */}

          {/* Course Description */}
          <CourseDescription course={course} courseTags={courseTags} />

          {/* Instructor Information */}
          {course.teacherId && course.teacher && (
            <CourseInstructor instructor={course.teacher} />
          )}
          
          {/* Organization Information */}
          {course.orgId && course.organization && (
            <CourseOrganization organization={course.organization} formatDate={formatDate} />
          )}
          
          {/* Reviews Section */}
          {courseTags.reviews && Array.isArray(courseTags.reviews) && courseTags.reviews.length > 0 && (
            <CourseReviews reviews={courseTags.reviews} />
          )}
        </Grid>

        {/* Right Sidebar */}
        <Grid item xs={12} md={4} sx={{ order: { xs: 1, md: 2 } }}>
          <CourseSidebar 
            course={course} 
            courseTags={courseTags} 
            formatDate={formatDate} 
          />
        </Grid>
      </Grid>

      {/* Recommended Courses */}
      {/* <Box sx={{ mt: 6 }}>
        <Typography variant="h4" gutterBottom>Recommended Courses</Typography> */}
        {/* <CourseCarousel /> */}
      {/* </Box> */}

      {/* Course Goals */}
      {/* <Box sx={{ mt: 6, p: 4, bgcolor: 'background.paper', borderRadius: 2 }}>
        <Typography variant="h4" gutterBottom>What You will Learn</Typography>
        <Grid container spacing={3}>
          {course?.goals?.map((goal, i) => (
            <Grid item xs={12} sm={6} key={i}>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Box sx={{ color: 'primary.main', mr: 2 }}>
                  <Check />
                </Box>
                <Typography variant="h6">{goal}</Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Box> */}
      <Modal open={open} onClose={handleClose}>
      <Box sx={style}>
        {/* Close Button */}
        <IconButton
          onClick={handleClose}
          sx={{ position: "absolute", top: 8, right: 8 }}
        >
          <CloseIcon />
        </IconButton>

        {/* Title */}
        <Typography id="modal-modal-title" variant="h6" textAlign="center" mb={2}>
          Rate Course
        </Typography>

        {/* Rating Component */}
        <Stack direction="column" alignItems="center" spacing={2}>
          <Rating
            name="course-rating"
            value={value}
            onChange={(event, newValue) => setValue(newValue)}
            size="large"
          />

          {/* Rate Button */}
          <Button
            variant="contained"
            color="primary"
            onClick={handleRate}
            disabled={value === 0}
          >
            Submit
          </Button>
        </Stack>
      </Box>
    </Modal>
    </Container>
  );
};

export default CourseDetails;