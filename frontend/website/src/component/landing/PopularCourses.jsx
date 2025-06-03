import React, { useState, useRef } from 'react';
import { Box, Container, Typography, Grid, Card, CardContent, CardMedia, Rating, Button, Chip, IconButton, useTheme, useMediaQuery } from '@mui/material';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import SignalCellularAltIcon from '@mui/icons-material/SignalCellularAlt';
import PeopleIcon from '@mui/icons-material/People';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, EffectCube, EffectCreative, Autoplay } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/effect-cube';
import 'swiper/css/effect-creative';

// Featured courses data with modern design
const featuredCourses = [
  {
    id: 1,
    title: 'Complete Python Masterclass',
    description: 'Master Python programming from basics to advanced concepts with real-world projects.',
    image: 'https://images.unsplash.com/photo-1526379095098-d400fd0bf935',
    rating: 4.9,
    students: 12453,
    instructor: 'Dr. Alex Morgan',
    duration: '42 hours',
    level: 'All Levels',
    price: '$59.99',
    tags: ['Programming', 'Python', 'Data Science'],
    featured: true
  },
  {
    id: 2,
    title: 'UI/UX Design Bootcamp 2025',
    description: 'Create stunning user interfaces and seamless experiences with modern design tools.',
    image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5',
    rating: 4.8,
    students: 8721,
    instructor: 'Sarah Chen',
    duration: '38 hours',
    level: 'Intermediate',
    price: '$69.99',
    tags: ['Design', 'UI/UX', 'Figma'],
    featured: true
  },
  {
    id: 3,
    title: 'Full-Stack JavaScript Development',
    description: 'Build complete web applications with modern JavaScript, React, Node.js and MongoDB.',
    image: 'https://images.unsplash.com/photo-1627398242454-45a1465c2479',
    rating: 4.9,
    students: 10892,
    instructor: 'Mark Williams',
    duration: '56 hours',
    level: 'Advanced',
    price: '$79.99',
    tags: ['JavaScript', 'React', 'Node.js'],
    featured: true
  },
  {
    id: 4,
    title: 'Data Science & Machine Learning',
    description: 'Master data analysis, visualization and machine learning with Python and TensorFlow.',
    image: 'https://images.unsplash.com/photo-1509228627152-72ae9ae6848d',
    rating: 4.7,
    students: 7453,
    instructor: 'Dr. Lisa Johnson',
    duration: '48 hours',
    level: 'Intermediate',
    price: '$74.99',
    tags: ['Data Science', 'Machine Learning', 'Python'],
    featured: false
  }
];

const PopularCourses = () => {
  const [swiperRef, setSwiperRef] = useState(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <Box id="courses" sx={{ 
      py: 10, 
      background: 'linear-gradient(135deg, #f0f2f5 0%, #e8eeff 100%)',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Decorative elements */}
      <Box 
        sx={{ 
          position: 'absolute',
          width: '400px',
          height: '400px',
          borderRadius: '50%',
          background: 'rgba(154, 102, 255, 0.05)',
          top: '-200px',
          right: '-100px',
          zIndex: 0
        }}
      />
      <Box 
        sx={{ 
          position: 'absolute',
          width: '300px',
          height: '300px',
          borderRadius: '50%',
          background: 'rgba(154, 102, 255, 0.05)',
          bottom: '-100px',
          left: '-150px',
          zIndex: 0
        }}
      />
      <Container maxWidth="lg">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <Typography 
            variant="h3" 
            component="h2" 
            align="center" 
            fontWeight="bold"
            gutterBottom
            sx={{ mb: 2 }}
          >
            Popular Courses
          </Typography>
          <Typography 
            variant="h6" 
            align="center" 
            color="text.secondary"
            sx={{ mb: 6, maxWidth: 700, mx: 'auto' }}
          >
            Explore our most popular courses and start your learning journey today
          </Typography>
        </motion.div>

        <Box sx={{ position: 'relative', px: { xs: 5, md: 8 }, mt: 2, mb: 4 }}>
          <Swiper
            onSwiper={setSwiperRef}
            modules={[Pagination, EffectCube, EffectCreative, Autoplay]}
            spaceBetween={30}
            slidesPerView={1}
            centeredSlides={true}
            grabCursor={true}
            pagination={{ 
              clickable: true,
              dynamicBullets: true,
              dynamicMainBullets: 3,
              renderBullet: function (index, className) {
                return `<span class="${className}" style="background-color: #9a66ff;"></span>`;
              }
            }}
            autoplay={{ 
              delay: 4000, 
              disableOnInteraction: false,
              pauseOnMouseEnter: true
            }}
            navigation={false}
            breakpoints={{
              640: {
                slidesPerView: 1,
                effect: 'cube',
                cubeEffect: {
                  shadow: true,
                  slideShadows: true,
                  shadowOffset: 20,
                  shadowScale: 0.94,
                },
              },
              768: {
                slidesPerView: 2,
                spaceBetween: 20,
                effect: 'creative',
                creativeEffect: {
                  prev: {
                    shadow: true,
                    translate: ['-120%', 0, -500],
                  },
                  next: {
                    shadow: true,
                    translate: ['120%', 0, -500],
                  },
                },
              },
              1024: {
                slidesPerView: 3,
                spaceBetween: 30,
                effect: 'creative',
                creativeEffect: {
                  prev: {
                    shadow: true,
                    translate: ['-20%', 0, -1],
                    rotate: [0, 0, -3],
                  },
                  next: {
                    translate: ['100%', 0, 0],
                  },
                },
              },
            }}
            style={{
              paddingBottom: '50px',
              paddingTop: '20px',
            }}
          >
            {featuredCourses.map((course, index) => (
              <SwiperSlide key={course.id}>
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  style={{ height: '100%' }}
                >
                  <Card 
                    elevation={4}
                    sx={{ 
                      height: '100%', 
                      display: 'flex',
                      flexDirection: 'column',
                      borderRadius: 4,
                      overflow: 'hidden',
                      boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
                      transition: 'transform 0.3s, box-shadow 0.3s',
                      '&:hover': {
                        transform: 'translateY(-8px)',
                        boxShadow: '0 15px 35px rgba(154, 102, 255, 0.2)'
                      },
                      position: 'relative',
                      '&::after': {
                        content: '""',
                        position: 'absolute',
                        bottom: 0,
                        left: 0,
                        width: '100%',
                        height: '5px',
                        background: 'linear-gradient(90deg, #9a66ff, #654dbf)',
                      }
                    }}
                  >
                    {course.featured && (
                      <Chip 
                        label="Featured" 
                        size="small" 
                      sx={{ 
                        position: 'absolute', 
                        top: 12, 
                        left: 12, 
                        bgcolor: 'rgba(255,106,69,0.9)',
                        color: 'white',
                        fontWeight: 'bold',
                        zIndex: 2
                      }} 
                    />
                  )}
                  <Box sx={{ position: 'relative' }}>
                    <CardMedia
                      component="img"
                      height="220"
                      image={course.image}
                      alt={course.title}
                      sx={{ 
                        filter: 'brightness(0.9)',
                      }}
                    />
                    <Box sx={{ 
                      position: 'absolute', 
                      bottom: 0, 
                      left: 0, 
                      right: 0,
                      background: 'linear-gradient(to top, rgba(0,0,0,0.8), rgba(0,0,0,0))'
                    }}>
                      <Box sx={{ p: 2, pb: 1 }}>
                        {course.tags.map((tag, i) => (
                          <Chip 
                            key={i}
                            label={tag} 
                            size="small" 
                            sx={{ 
                              mr: 0.5, 
                              mb: 0.5,
                              bgcolor: 'rgba(255,255,255,0.2)',
                              color: 'white',
                            }} 
                          />
                        ))}
                      </Box>
                    </Box>
                    <IconButton 
                      sx={{ 
                        position: 'absolute', 
                        top: 12, 
                        right: 12,
                        bgcolor: 'rgba(255,255,255,0.3)',
                        '&:hover': { bgcolor: 'rgba(255,255,255,0.5)' }
                      }}
                    >
                      <BookmarkIcon sx={{ color: 'white' }} />
                    </IconButton>
                  </Box>
                  <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', p: 3 }}>
                    <Typography variant="h5" component="h3" fontWeight="bold" gutterBottom>
                      {course.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" paragraph>
                      {course.description}
                    </Typography>
                    
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                      <Rating value={course.rating} precision={0.1} size="small" readOnly />
                      <Typography variant="body2" color="text.secondary" sx={{ ml: 1 }}>
                        {course.rating} ({course.students.toLocaleString()} students)
                      </Typography>
                    </Box>
                    
                    <Grid container spacing={2} sx={{ mb: 2 }}>
                      <Grid item xs={6}>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          <AccessTimeIcon sx={{ fontSize: 18, color: '#9a66ff', mr: 0.5 }} />
                          <Typography variant="body2">
                            {course.duration}
                          </Typography>
                        </Box>
                      </Grid>
                      <Grid item xs={6}>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          <SignalCellularAltIcon sx={{ fontSize: 18, color: '#9a66ff', mr: 0.5 }} />
                          <Typography variant="body2">
                            {course.level}
                          </Typography>
                        </Box>
                      </Grid>
                    </Grid>
                    
                    <Box sx={{ mt: 'auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', pt: 2 }}>
                      <Typography variant="h6" fontWeight="bold" sx={{ color: '#9a66ff' }}>
                        {course.price}
                      </Typography>
                      <Button 
                        variant="contained" 
                        sx={{ 
                          borderRadius: 30,
                          px: 3,
                          py: 1,
                          background: 'linear-gradient(135deg, #9a66ff 0%, #654dbf 100%)',
                          boxShadow: '0 4px 10px rgba(154, 102, 255, 0.3)',
                          '&:hover': {
                            background: 'linear-gradient(135deg, #8a56ef 0%, #553daf 100%)',
                            boxShadow: '0 6px 15px rgba(154, 102, 255, 0.4)'
                          }
                        }}
                      >
                        Enroll Now
                      </Button>
                    </Box>
                  </CardContent>
                </Card>
              </motion.div>
            </SwiperSlide>
            ))}
          </Swiper>
          
          {/* Custom navigation buttons */}
          <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, mt: 4 }}>
            <IconButton 
              sx={{
                bgcolor: 'rgba(255, 255, 255, 0.8)',
                color: '#9a66ff',
                width: 40,
                height: 40,
                '&:hover': {
                  bgcolor: 'white',
                  color: '#654dbf'
                },
                boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
              }}
              onClick={() => swiperRef?.slidePrev()}
            >
              <ArrowBackIcon />
            </IconButton>
            
            <IconButton 
              sx={{
                bgcolor: 'rgba(255, 255, 255, 0.8)',
                color: '#9a66ff',
                width: 40,
                height: 40,
                '&:hover': {
                  bgcolor: 'white',
                  color: '#654dbf'
                },
                boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
              }}
              onClick={() => swiperRef?.slideNext()}
            >
              <ArrowForwardIcon />
            </IconButton>
          </Box>
        </Box>
        
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 6 }}>
          <Button 
            component={Link}
            to="/main/courses"
            variant="outlined" 
            size="large"
            sx={{ 
              borderColor: '#654dbf', 
              color: '#654dbf',
              '&:hover': {
                borderColor: '#4a2f9f',
                bgcolor: 'rgba(101, 77, 191, 0.05)',
              },
              px: 4,
              py: 1,
              borderRadius: 2,
              fontWeight: 'bold'
            }}
          >
            View All Courses
          </Button>
        </Box>
      </Container>
    </Box>
  );
};

export default PopularCourses;
