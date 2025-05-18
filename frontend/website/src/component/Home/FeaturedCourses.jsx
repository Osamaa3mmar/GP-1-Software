import { Box, Container } from '@mui/material';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import CourseCard from '../Courses/CourseCard';
import SpecialHeading from './SpecialHeading';


export default function FeaturedCourses({ courses }) {
  return (
    <Box sx={{ py: 8 }}>
      <Container maxWidth="lg">
        <SpecialHeading>Featured Courses</SpecialHeading>

        <Box sx={{
          position: 'relative',
          '& .swiper': {
            overflow: 'hidden', // Force hide other slides
            padding: '16px 0' // Remove side padding
          }
        }}>
          <Swiper
            modules={[Navigation, Pagination]}
            spaceBetween={24}
            slidesPerView={'auto'}
            centeredSlides={false}
            navigation
            pagination={{ clickable: true }}
            breakpoints={{
              0: { // Mobile
                slidesPerView: 1,
                spaceBetween: 16
              },
              374: { // 350px + 24px spacing
                slidesPerView: 1.1, // Slight peek
                spaceBetween: 16
              },
              768: { // Tablet
                slidesPerView: 2.2, // Show 2 full + 20% of third
                spaceBetween: 24
              },
              1150: { // Desktop (350*3 + 24*2 = 1098px)
                slidesPerView: 3,
                spaceBetween: 24
              }
            }}
          >
            {courses.map(course => (
              <SwiperSlide 
                key={course.id}
                style={{ 
                  width: 350, // Fixed card width
                  height: 'auto',
                  flexShrink: 0,
                  opacity: 1, // Force visible
                  transition: 'opacity 0.3s ease'
                }}
              >
                <CourseCard course={course} />
              </SwiperSlide>
            ))}
          </Swiper>
        </Box>
      </Container>
    </Box>
  );
}