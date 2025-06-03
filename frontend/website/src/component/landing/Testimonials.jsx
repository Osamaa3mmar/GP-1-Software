import React, { useState } from 'react';
import { Box, Container, Typography, Avatar, Paper, Rating, IconButton } from '@mui/material';
import { motion } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay, EffectCoverflow, EffectFlip, EffectFade } from 'swiper/modules';
import FormatQuoteIcon from '@mui/icons-material/FormatQuote';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css/effect-coverflow';
import 'swiper/css/effect-flip';
import 'swiper/css/effect-fade';

const testimonials = [
  {
    name: 'Sarah Johnson',
    role: 'Software Developer',
    image: '/team-01.jpg',
    rating: 5,
    text: 'The interactive quizzes and AI-powered feedback helped me master complex programming concepts faster than any other platform I\'ve tried. Highly recommended!'
  },
  {
    name: 'Michael Chen',
    role: 'Data Science Student',
    image: '/team-02.jpg',
    rating: 5,
    text: 'The personalized learning path and messaging system made it easy to connect with instructors whenever I needed help. This platform truly transformed my learning experience.'
  },
  {
    name: 'Emily Rodriguez',
    role: 'UX Designer',
    image: '/team-03.jpg',
    rating: 4,
    text: 'As someone who learns visually, I appreciated the interactive content and practical exercises. The community support through the messaging system was invaluable.'
  },
  {
    name: 'David Kim',
    role: 'Business Analyst',
    image: '/team-04.jpg',
    rating: 5,
    text: 'The AI-powered insights helped me identify my knowledge gaps and focus my studies more effectively. I\'ve recommended this platform to all my colleagues.'
  },
  {
    name: 'Olivia Wilson',
    role: 'Marketing Professional',
    image: '/team-05.png',
    rating: 5,
    text: 'The quality of courses and instructor support exceeded my expectations. The platform\'s intuitive design made learning enjoyable and efficient.'
  }
];

const Testimonials = () => {
  const [swiperRef, setSwiperRef] = useState(null);
  return (
    <Box id="testimonials" sx={{ 
      py: 10, 
      background: 'linear-gradient(135deg, #f5f5f5 0%, #e8e8ff 100%)',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Decorative elements */}
      <Box 
        sx={{ 
          position: 'absolute',
          width: '300px',
          height: '300px',
          borderRadius: '50%',
          background: 'rgba(154, 102, 255, 0.05)',
          top: '-100px',
          right: '-100px',
          zIndex: 0
        }}
      />
      <Box 
        sx={{ 
          position: 'absolute',
          width: '200px',
          height: '200px',
          borderRadius: '50%',
          background: 'rgba(154, 102, 255, 0.05)',
          bottom: '-50px',
          left: '-50px',
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
            Student Success Stories
          </Typography>
          <Typography 
            variant="h6" 
            align="center" 
            color="text.secondary"
            sx={{ mb: 6, maxWidth: 700, mx: 'auto' }}
          >
            Hear from our students who have transformed their careers through our platform
          </Typography>
        </motion.div>

        <Box sx={{ position: 'relative', px: { xs: 5, md: 8 }, mt: 2 }}>
          <Swiper
            onSwiper={setSwiperRef}
            modules={[Pagination, Autoplay, EffectCoverflow, EffectFlip, EffectFade]}
            spaceBetween={30}
            slidesPerView={1}
            grabCursor={true}
            effect="coverflow"
            coverflowEffect={{
              rotate: 5,
              stretch: 50,
              depth: 200,
              modifier: 1.5,
              slideShadows: true,
            }}
            pagination={{ 
              clickable: true,
              dynamicBullets: true,
              dynamicMainBullets: 3,
              renderBullet: function (index, className) {
                return `<span class="${className}" style="background-color: #9a66ff; transform: scale(1.2);">${index + 1}</span>`;
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
                effect: 'flip',
                flipEffect: {
                  slideShadows: true,
                  limitRotation: true
                }
              },
              768: {
                slidesPerView: 2,
                effect: 'coverflow',
                coverflowEffect: {
                  rotate: 30,
                  stretch: 0,
                  depth: 100,
                  modifier: 1,
                  slideShadows: true,
                }
              },
              1024: {
                slidesPerView: 3,
                effect: 'coverflow',
                coverflowEffect: {
                  rotate: 5,
                  stretch: 50,
                  depth: 200,
                  modifier: 1.5,
                  slideShadows: true,
                }
              },
            }}
            style={{
              paddingBottom: '50px',
              paddingTop: '20px',
            }}
          >
          {testimonials.map((testimonial, index) => (
            <SwiperSlide key={index}>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Paper
                  elevation={6}
                  sx={{
                    p: 4,
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    borderRadius: 4,
                    mb: 6,
                    minHeight: '320px',
                    position: 'relative',
                    overflow: 'hidden',
                    transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                    background: 'linear-gradient(145deg, #ffffff 0%, #f8f9ff 100%)',
                    '&:hover': {
                      transform: 'translateY(-12px) scale(1.02)',
                      boxShadow: '0 15px 30px rgba(154, 102, 255, 0.25)'
                    },
                    '&::before': {
                      content: '""',
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      width: '100%',
                      height: '5px',
                      background: 'linear-gradient(90deg, #9a66ff, #654dbf)',
                    },
                    '&::after': {
                      content: '""',
                      position: 'absolute',
                      bottom: 0,
                      right: 0,
                      width: '150px',
                      height: '150px',
                      borderRadius: '50%',
                      zIndex: 0
                    }
                  }}
                >
                  <FormatQuoteIcon 
                    sx={{ 
                      position: 'absolute',
                      top: 15,
                      right: 15,
                      fontSize: 40,
                      color: 'rgba(154, 102, 255, 0.1)',
                      transform: 'rotate(180deg)'
                    }} 
                  />
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                    <Avatar 
                      src={testimonial.image} 
                      alt={testimonial.name}
                      sx={{ width: 64, height: 64, mr: 2 }}
                    />
                    <Box>
                      <Typography variant="h6" fontWeight="bold">
                        {testimonial.name}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {testimonial.role}
                      </Typography>
                      <Rating value={testimonial.rating} readOnly size="small" sx={{ mt: 0.5, color: '#9a66ff' }} />
                    </Box>
                  </Box>
                  <Typography sx={{ flex: 1, fontStyle: 'italic', color: 'text.secondary' }}>
                    "{testimonial.text}"
                  </Typography>
                </Paper>
              </motion.div>
            </SwiperSlide>
          ))}
        </Swiper>
          
          {/* Custom navigation buttons */}
          <IconButton 
            sx={{
              position: 'absolute',
              left: { xs: 0, md: 0 },
              top: '50%',
              transform: 'translateY(-50%)',
              bgcolor: 'rgba(255, 255, 255, 0.9)',
              color: '#9a66ff',
              width: 50,
              height: 50,
              '&:hover': {
                bgcolor: 'white',
                color: '#654dbf',
                transform: 'translateY(-50%) scale(1.1)',
              },
              boxShadow: '0 4px 20px rgba(154, 102, 255, 0.15)',
              zIndex: 2,
              transition: 'all 0.3s ease'
            }}
            onClick={() => swiperRef?.slidePrev()}
          >
            <ArrowBackIcon fontSize="medium"  />
          </IconButton>
          
          <IconButton 
            sx={{
              position: 'absolute',
              right: { xs: 0, md: 0 },
              top: '50%',
              transform: 'translateY(-50%)',
              bgcolor: 'rgba(255, 255, 255, 0.9)',
              color: '#9a66ff',
              width: 50,
              height: 50,
              '&:hover': {
                bgcolor: 'white',
                color: '#654dbf',
                transform: 'translateY(-50%) scale(1.1)',
              },
              boxShadow: '0 4px 20px rgba(154, 102, 255, 0.15)',
              zIndex: 2,
              transition: 'all 0.3s ease'
            }}
            onClick={() => swiperRef?.slideNext()}
          >
            <ArrowForwardIcon fontSize="medium" />
          </IconButton>
        </Box>
      </Container>
    </Box>
  );
};

export default Testimonials;
