import { Box, Typography, Stack } from "@mui/material";
import PropTypes from "prop-types";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import CourseSchedule from "../CourseSchedule";

export default function CoursePopoverContent({ course }) {
  return (
    <Box>
      {/* Display course schedule if available */}
      {!course?.schedule?.length ? null : (
        <>
          <Stack
            direction="row"
            spacing={1}
            sx={{ mb: 1, display: "flex", alignItems: "center" }}
          >
            <AccessTimeIcon fontSize="small" />
            <Typography variant="h6" sx={{ fontWeight: "bold" }}>
              Course Schedule
            </Typography>
          </Stack>
          <CourseSchedule schedule={course?.schedule} />
        </>
      )}

      {/* Course Details */}
      <Typography variant="h6" sx={{ fontWeight: "bold", mb: 1, mt: 2 }}>
        Course Details
      </Typography>

      <Typography variant="body2" sx={{ mb: 2 }}>
        {course?.learningOutcomes || "No course description available."}
      </Typography>

      {/* Learning Outcomes */}
      {course?.learningPath && (
        <>
          <Typography variant="body2" sx={{ fontWeight: "bold", mb: 1 }}>
            What You Will Learn:
          </Typography>
          <Typography component="ul" variant="body2" sx={{ pl: 2 }}>
            {course.learningPath}
          </Typography>
        </>
      )}
    </Box>
  );
}

CoursePopoverContent.propTypes = {
  course: PropTypes.object.isRequired
};
