import { CardContent , Box} from "@mui/material";
import CourseCardTags from "./CourseCardTags";
import CourseCardTitle from "./CourseCardTitle";
import CourseCardStats from "./CourseCardStats";
import CourseCardRating from "./CourseCardRating";
import CourseCardHeader from "./CourseCardHeader";

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
      {/* <CourseCardStats
        duration={course.duration}
        enrollmentNumber={course.enrollmentNumber}
        schedule={course.schedule}
      /> */}
      {/* Push rating to bottom */}
      <Box sx={{ mt: 'auto' }}>
        <CourseCardRating price={course.price} rating={course.rating}/>
      </Box>
    </CardContent>
  );
}
