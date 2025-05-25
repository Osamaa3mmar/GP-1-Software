import { Avatar, AvatarGroup, Box, Button, Tooltip, Typography, Chip, Divider, LinearProgress, useTheme } from "@mui/material";
import Grid from "@mui/material/Grid2";
import PeopleIcon from '@mui/icons-material/People';
import StarIcon from '@mui/icons-material/Star';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import { useState } from 'react';

export default function SwipeCard({openTable, course}) {
  const theme = useTheme();
  const [hover, setHover] = useState(false);
  
  // Course statistics from backend
  const totalStudents = course.enrollments.length;
  const completionRate = course.completionRate || 0;
  
  // Format dates if available
  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    } catch (error) {
      return 'N/A';
    }
  };
  
  const startDate = formatDate(course.startDate);
  const endDate = formatDate(course.endDate);
  
  return (
    <Grid 
      size={{lg:4, md:6, sm:12, xs:12}} 
      sx={{
        gap: "6px",
        overflow: "hidden",
        borderRadius: "12px",
        background: "#ffffff",
        boxShadow: hover ? 
          `0px 6px 16px ${theme.palette.primary.main}40` : 
          "0px 0px 6px rgba(0,0,0,0.2)",
        transition: "all 0.3s ease",
        transform: hover ? 'translateY(-5px)' : 'none',
        height: '100%',
        display: 'flex',
        flexDirection: 'column'
      }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <Box sx={{ position: 'relative', flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
        {/* Course Image */}
        <Box sx={{
          borderRadius: "12px 12px 0px 0px",
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden",
          height: "170px",
          position: 'relative'
        }}>
          <img src={course.thumbnail} style={{width:"100%", height: '100%', objectFit: 'cover'}}/>
          <Box sx={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            background: 'linear-gradient(transparent, rgba(0,0,0,0.7))',
            p: 1,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
            <Chip 
              icon={<PeopleIcon />} 
              label={`${totalStudents} Students`} 
              size="small" 
              sx={{ 
                bgcolor: 'rgba(255,255,255,0.9)', 
                fontWeight: 'bold',
                '& .MuiChip-icon': { color: theme.palette.primary.main }
              }}
            />
            <Chip 
              icon={<StarIcon />} 
              label={`${completionRate}% Completion`} 
              size="small" 
              sx={{ 
                bgcolor: 'rgba(255,255,255,0.9)', 
                fontWeight: 'bold',
                '& .MuiChip-icon': { color: theme.palette.secondary.main }
              }}
            />
          </Box>
        </Box>
        
        {/* Course Title and View Button */}
        <Box sx={{
          paddingX: "15px",
          paddingY: "10px",
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "space-between"
        }}>
          <Typography variant="h5" fontWeight="600" sx={{ color: theme.palette.primary.dark }}>
            {course ? course.title : ''}
          </Typography>
          <Button 
            size="small" 
            sx={{ textWrap: "nowrap" }}  
            onClick={() => openTable(course.id)} 
            variant="contained" 
            color="primary"
          >
            View All
          </Button>
        </Box>
        
        {/* Course Statistics */}
        <Box sx={{ px: 2, py: 1, flexGrow: 1 }}>
          <Divider sx={{ my: 1 }} />
          
          {/* Progress Bar */}
          <Box sx={{ mb: 2 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
              <Typography variant="body2" color="text.secondary">Course Progress</Typography>
              <Typography variant="body2" fontWeight="bold">{completionRate}%</Typography>
            </Box>
            <LinearProgress 
              variant="determinate" 
              value={completionRate} 
              sx={{ 
                height: 8, 
                borderRadius: 5,
                bgcolor: theme.palette.grey[200],
                '& .MuiLinearProgress-bar': {
                  bgcolor: completionRate > 50 ? theme.palette.success.main : theme.palette.warning.main
                }
              }}
            />
          </Box>
          
          {/* Course Dates */}
          {(course.startDate || course.endDate) && (
            <Box sx={{ mb: 2 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <CalendarMonthIcon sx={{ color: theme.palette.text.secondary, fontSize: 18 }} />
                <Typography variant="body2" fontWeight="bold" color="text.secondary">
                  Course Duration
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 1 }}>
                <Chip 
                  size="small" 
                  label={`Start: ${startDate}`} 
                  sx={{ 
                    bgcolor: theme.palette.success.light + '20',
                    color: theme.palette.success.dark,
                    fontWeight: 500,
                    fontSize: '0.75rem'
                  }} 
                />
                <Chip 
                  size="small" 
                  label={`End: ${endDate}`} 
                  sx={{ 
                    bgcolor: theme.palette.error.light + '20',
                    color: theme.palette.error.dark,
                    fontWeight: 500,
                    fontSize: '0.75rem'
                  }} 
                />
              </Box>
            </Box>
          )}
        </Box>
        
        {/* Enrolled Students */}
        <Box sx={{ px: 2, pb: 2 }}>
          <Divider sx={{ mb: 1 }} />
          <Typography variant="body2" fontWeight="bold" color="text.secondary" sx={{ mb: 1 }}>
            {totalStudents > 0 ? 'Enrolled Students' : 'No Enrollments Yet'}
          </Typography>
          
          {course.enrollments.length > 0 ? (
            <AvatarGroup sx={{ cursor: "pointer" }} spacing={8} max={5}>
              {course.enrollments.map((en) => {
                return (
                  <Tooltip placement="top" title={en.student.username} key={en.id}>
                    <Avatar alt={en.student.username} src={en.student.profilePic} />
                  </Tooltip>
                );
              })}
            </AvatarGroup>
          ) : (
            <Typography variant="body2" color="text.secondary" sx={{ fontStyle: 'italic' }}>
              No students have enrolled in this course yet
            </Typography>
          )}
        </Box>
      </Box>
    </Grid>
  );
}
