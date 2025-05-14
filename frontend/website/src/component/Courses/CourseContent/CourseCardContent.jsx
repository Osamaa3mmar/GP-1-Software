import { CardContent } from "@mui/material";
import CourseCardTags from "./CourseCardTags";
import CourseCardTitle from "./CourseCardTitle";
import CourseCardStats from "./CourseCardStats";
import CourseCardRating from "./CourseCardRating";
import CourseCardHeader from "./CourseCardHeader";

export default function CourseCardContent({ course }) {
  return (
    <CardContent>
      <CourseCardTags tags={course.tags} />
      <CourseCardTitle title={course.title} />
      <CourseCardHeader teacher={course.teacher} />
      {/* <CourseCardDescription description={course.description} /> */}
      <CourseCardStats
        duration={course.duration}
        enrollmentNumber={course.enrollmentNumber}
        schedule={course.schedule}
      />
      <CourseCardRating price={course.price} rating={course.rating}/>
    </CardContent>
  );
}
