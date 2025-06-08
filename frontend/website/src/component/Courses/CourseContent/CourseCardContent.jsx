import { CardContent, Box, Chip } from "@mui/material";
import CourseCardTags from "./CourseCardTags";
import CourseCardTitle from "./CourseCardTitle";
import CourseCardRating from "./CourseCardRating";
import CourseCardHeader from "./CourseCardHeader";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import PeopleIcon from "@mui/icons-material/People";
import EventIcon from "@mui/icons-material/Event";

export default function CourseCardContent({ course }) {
  return (
    <CardContent sx={{ 
      flexGrow: 1,
      display: 'flex',
      flexDirection: 'column',
      pb: 0 
    }}>
      <CourseCardTags tags={course.tags} />
      <CourseCardTitle title={course.title} />
      <CourseCardHeader teacher={course.teacher} />
      
      {/* Course Stats as Chips */}
      <Box sx={{ mt: 1.5, mb: 2.5, display: 'flex', flexWrap: 'wrap', gap: 1, justifyContent: 'flex-start', alignItems: 'center' }}>
        {course?.duration && (
          <Chip 
            icon={<AccessTimeIcon />}
            label={`${course.duration} ${course.duration === 1 ? 'hour' : 'hours'}`}
            size="small"
            color="default"
            variant="outlined"
          />
        )}
        
        {course?.enrollmentNumber !== undefined && (
          <Chip 
            icon={<PeopleIcon />}
            label={`${course.enrollmentNumber} ${course.enrollmentNumber === 1 ? 'student' : 'students'}`}
            size="small"
            color="default"
            variant="outlined"
          />
        )}
        
        {course?.startDate && (
          <Chip 
            icon={<EventIcon />}
            label={`Start: ${new Date(course.startDate).toLocaleDateString()}`}
            size="small"
            color="default"
            variant="outlined"
          />
        )}
        
        {course?.endDate && (
          <Chip 
            icon={<EventIcon />}
            label={`End: ${new Date(course.endDate).toLocaleDateString()}`}
            size="small"
            color="default"
            variant="outlined"
          />
        )}
      </Box>
      
      {/* Push rating to bottom */}
      <Box sx={{ mt: 'auto' }}>
        <CourseCardRating price={course.price} rating={course.rating/course.numberRating}/>
      </Box>
    </CardContent>
  );
}
