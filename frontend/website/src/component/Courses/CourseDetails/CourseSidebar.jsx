// React is needed for JSX
import { Paper, Box, Typography, Grid, Chip } from '@mui/material';
import { Event, AccessTime, EmojiEvents } from '@mui/icons-material';
import AddToCart from "../AddToCart";

const CourseSidebar = ({ course, courseTags, formatDate }) => {
  return (
    <Paper elevation={3} sx={{ 
      position: 'sticky',
      top: 20,
      p: 2,
      borderRadius: 2
    }}>
      {/* Course Thumbnail */}
      <Box sx={{ mb: 1.5, borderRadius: 2, overflow: 'hidden', width: '100%' }}>
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', maxHeight: 180 }}>
          <img 
            src={course.thumbnail} 
            alt={course.title} 
            style={{ width: '100%', height: 'auto', maxHeight: 180, objectFit: 'contain' }} 
          />
        </Box>
      </Box>
      
      {/* Course Stats */}
      <Grid container spacing={1} sx={{ mb: 2 }}>
        <Grid item xs={6}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Event color="primary" fontSize="small" sx={{ mr: 1 }} />
            <Box>
              <Typography variant="caption" color="text.secondary">Start Date</Typography>
              <Typography variant="body2">{formatDate(course.startDate)}</Typography>
            </Box>
          </Box>
        </Grid>
        
        <Grid item xs={6}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Event color="primary" fontSize="small" sx={{ mr: 1 }} />
            <Box>
              <Typography variant="caption" color="text.secondary">End Date</Typography>
              <Typography variant="body2">{formatDate(course.endDate)}</Typography>
            </Box>
          </Box>
        </Grid>
        
        <Grid item xs={6}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <AccessTime color="primary" fontSize="small" sx={{ mr: 1 }} />
            <Box>
              <Typography variant="caption" color="text.secondary">Duration</Typography>
              <Typography variant="body2">{course.duration} weeks</Typography>
            </Box>
          </Box>
        </Grid>
        
        {course.certification && (
          <Grid item xs={6}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <EmojiEvents color="primary" fontSize="small" sx={{ mr: 1 }} />
              <Box>
                <Typography variant="caption" color="text.secondary">Certificate</Typography>
                <Typography variant="body2">Included</Typography>
              </Box>
            </Box>
          </Grid>
        )}  
      </Grid>
      
      {/* Course Tags/Categories */}
      <Box sx={{ mb: 2 }}>
        <Typography variant="subtitle1" gutterBottom>Categories</Typography>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
          {courseTags.category && Array.isArray(courseTags.category) ? (
            courseTags.category.map((cat, index) => (
              <Chip key={index} label={cat} size="small" />
            ))
          ) : (
            <Chip label="Course" size="small" />
          )}
        </Box>
      </Box>
      
      <AddToCart
        product={{
          id: course.id,
          title: course.title,
          price: course.price,
          thumbnail: course.thumbnail,
          teacher: course.teacher,
        }}
      />
      
      {/* Price moved below Add to Cart */}
      <Typography 
        variant="subtitle1" 
        color="primary.main" 
        sx={{ mt: 1, textAlign: 'center', fontWeight: 'bold' }}
      >
        Price: ${course.price || 0}
      </Typography>
      
      {/* Course Features */}
      <Box sx={{ mt: 3 }}>
        {['Certificate of Completion', '30-Day Money-Back Guarantee'].map((feature, index) => (
          <Box key={index} sx={{ display: 'flex', justifyContent: 'space-between', mt: 3 }}>
            <Typography variant="body1">{feature}</Typography>
            <EmojiEvents color="success" />
          </Box>
        ))}
      </Box>
    </Paper>
  );
};

export default CourseSidebar;
