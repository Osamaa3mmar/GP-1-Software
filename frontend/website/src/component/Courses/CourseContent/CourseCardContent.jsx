import { CardContent } from "@mui/material";
import CourseCardTags from "./CourseCardTags";
import CourseCardTitle from "./CourseCardTitle";
import CourseCardStats from "./CourseCardStats";
import CourseCardRating from "./CourseCardRating";
import CourseCardHeader from "./CourseCardHeader";
import CourseCardDescription from "./CourseCardDescription";

export default function CourseCardContent() {
  return (
    <CardContent>
      <CourseCardTags />
      <CourseCardTitle />
      <CourseCardHeader />
      <CourseCardDescription />
      <CourseCardStats />
      <CourseCardRating />
    </CardContent>
  );
}
