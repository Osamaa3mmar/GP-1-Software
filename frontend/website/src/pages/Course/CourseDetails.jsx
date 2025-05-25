import React from 'react';
import { 
  Container, 
  Grid, 
  Typography, 
  Chip, 
  Rating, 
  Button, 
  Accordion, 
  AccordionSummary, 
  AccordionDetails, 
  Avatar,
  Box,
  Divider,
  IconButton
} from '@mui/material';
import { ExpandMore, PlayCircle, Check, Share, Favorite } from '@mui/icons-material';
import { useParams, Link } from 'react-router-dom';
import AddToCart from "../../component/Courses/AddToCart";
import CourseSchedule from '../../component/Courses/CourseSchedule';
import { useEffect, useState } from 'react';
import axios from "axios";
// import CourseCarousel from '../components/CourseCarousel';

const CourseDetails = () => {
  const { id } = useParams();
    const [course, setCourse] = useState(null);
  
    useEffect(() => {
      const fetchCourse = async () => {
        try {
          console.log(id);
          console.log(localStorage.getItem("token"));
          const {data}=await axios.get(`http://localhost:4545/course/getdetailedinfo/${id}`,{headers:{
        token:localStorage.getItem('token')
      }})
          setCourse(data.course);
          console.log(data.course);
        } catch (error) {
            console.error("Failed to fetch courses:", error);
          }
      };
  
      fetchCourse();
    }, [id]);
    console.log(course);
    
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

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      {/* Header Section */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h3" gutterBottom>{course?.title}</Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Rating value={course?.rating} precision={0.1} readOnly />
          <Typography variant="subtitle1">{course?.enrollmentNumber} students enrolled</Typography>
          <Chip label="Bestseller" color="primary" />
        </Box>
      </Box>

      {/* Main Content Grid */}
      <Grid container spacing={4}>
        {/* Left Column */}
        <Grid item xs={12} md={8}>
          {/* Promo Video */}
          <Box sx={{ 
            borderRadius: 2,
            overflow: 'hidden',
            boxShadow: 3,
            mb: 4,
          }}>
            <img
              width="100%"
              height="450"
              src={course?.thumbnail}
              frameBorder="0"
              title="Course thumbnail"
              style={{ height: 450 }}
            />
          </Box>
          {/* <CourseSchedule schedule={course?.schedule} /> */}

          {/* Course Content Accordion */}
          <Accordion defaultExpanded>
            <AccordionSummary expandIcon={<ExpandMore />}>
              <Typography variant="h5">Curriculum</Typography>
            </AccordionSummary>
            <AccordionDetails>
              {course?.tags.topics.map((module, index) => (
                <Accordion key={index} sx={{ mb: 1 }}>
                  <AccordionSummary expandIcon={<ExpandMore />}>
                    <Typography variant="h6">{module.module}</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    {module?.lessons?.map((lesson, idx) => (
                      <Box key={idx} sx={{ display: 'flex', alignItems: 'center', p: 1 }}>
                        <PlayCircle sx={{ mr: 2, color: 'text.secondary' }} />
                        <Typography>{lesson}</Typography>
                      </Box>
                    ))}
                  </AccordionDetails>
                </Accordion>
              ))}
            </AccordionDetails>
          </Accordion>

          {/* Description & Requirements */}
          <Box sx={{ my: 4 }}>
            <Typography variant="h5" gutterBottom>Description</Typography>
            <Typography paragraph>{course?.description}</Typography>
            
            <Typography variant="h5" gutterBottom>Requirements</Typography>
            <ul style={{ paddingLeft: 24 }}>
              {course?.requirements?.map((req, i) => (
                <li key={i}>
                  <Typography variant="body1">{req}</Typography>
                </li>
              ))}
            </ul>
          </Box>

          {/* Reviews Section */}
          <Box sx={{ my: 4 }}>
            <Typography variant="h4" gutterBottom>Student Reviews</Typography>
            {course?.reviews?.map((review, index) => (
              <Box key={index} sx={{ mb: 3, p: 2, border: '1px solid', borderColor: 'divider', borderRadius: 2 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <Avatar sx={{ mr: 2 }} />
                  <Rating value={review.rating} readOnly />
                  <Typography variant="subtitle2" sx={{ ml: 2 }}>{review?.date}</Typography>
                </Box>
                <Typography>{review?.comment}</Typography>
              </Box>
            ))}
          </Box>
        </Grid>

        {/* Right Sidebar */}
        <Grid item xs={12} md={4}>
          <Box sx={{ 
            position: 'sticky',
            top: 20,
            p: 3,
            border: '1px solid',
            borderColor: 'divider',
            borderRadius: 2
          }}>
            {/* Pricing Section */}
            <Typography variant="h4" gutterBottom>
              ${course?.price}
              {/* <Typography variant="body2" color="text.secondary" component="span" sx={{ ml: 1 }}>
                84% off
              </Typography> */}
            </Typography>
            
            <AddToCart
                      product={{
                        id: course?.id,
                        title: course?.title,
                        price: course?.price,
                        thumbnail: course?.thumbnail,
                        teacher: course?.teacher,
                      }}
                    />
            
            {/* <Button 
              variant="outlined" 
              fullWidth 
              size="large"
              sx={{ mb: 2 }}
            >
              Buy Now
            </Button> */}

            {/* Course Stats */}
            <Box sx={{ my: 3 }}>
              {course?.tags?.stats?.map((stat, i) => (
                <Chip
                  key={i}
                  label={`${stat.icon} ${stat.label}`}
                  sx={{ m: 0.5, borderRadius: 1 }}
                />
              ))}
            </Box>

            {/* Instructor Section */}
            <Box sx={{ mt: 3, cursor: 'pointer' }} component={Link} to="/instructor-profile">
              <Typography variant="h6" gutterBottom>Instructor</Typography>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Avatar src={course?.instructor?.avatar} sx={{ width: 56, height: 56, mr: 2 }} />
                <Box>
                  <Typography variant="h6">{course?.instructor?.name}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    {course?.instructor?.coursesCount} courses
                  </Typography>
                </Box>
              </Box>
            </Box>

            {/* Course Features */}
            <Box sx={{ mt: 3 }}>
              {['Certificate of Completion', '30-Day Money-Back Guarantee'].map((feature, i) => (
                <Box key={i} sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <Check sx={{ color: 'success.main', mr: 1 }} />
                  <Typography>{feature}</Typography>
                </Box>
              ))}
            </Box>
          </Box>
        </Grid>
      </Grid>

      {/* Recommended Courses */}
      <Box sx={{ mt: 6 }}>
        <Typography variant="h4" gutterBottom>Recommended Courses</Typography>
        {/* <CourseCarousel /> */}
      </Box>

      {/* Course Goals */}
      <Box sx={{ mt: 6, p: 4, bgcolor: 'background.paper', borderRadius: 2 }}>
        <Typography variant="h4" gutterBottom>What You will Learn</Typography>
        <Grid container spacing={3}>
          {course?.goals?.map((goal, i) => (
            <Grid item xs={12} sm={6} key={i}>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Check sx={{ color: 'primary.main', mr: 2 }} />
                <Typography variant="h6">{goal}</Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* FAQ Section */}
      <Box sx={{ mt: 6 }}>
        <Typography variant="h4" gutterBottom>Frequently Asked Questions</Typography>
        {[
          "Can I take this course with no experience?",
          "How long do I have access to the course?"
        ].map((question, i) => (
          <Accordion key={i}>
            <AccordionSummary expandIcon={<ExpandMore />}>
              <Typography variant="h6">{question}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>Answer to the question...</Typography>
            </AccordionDetails>
          </Accordion>
        ))}
      </Box>
    </Container>
  );
};

export default CourseDetails;