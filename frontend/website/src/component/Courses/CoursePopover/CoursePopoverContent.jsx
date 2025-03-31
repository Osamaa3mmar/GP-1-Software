import { Box, Typography} from "@mui/material";;

export default function CoursePopoverContent() {
  
  return (
    <Box>
      <Typography variant="h6" sx={{ fontWeight: "bold", mb: 1 }}>
        Course Details
      </Typography>

      <Typography variant="body2" sx={{ mb: 2 }}>
        This comprehensive course will take you from zero to hero in web
        development fundamentals. You will learn HTML5, CSS3, and modern
        JavaScript (ES6+) through hands-on projects.
      </Typography>
      <Typography variant="body2" sx={{ fontWeight: "bold", mb: 1 }}>
        What You Will Learn:
      </Typography>
      <Typography component="ul" variant="body2" sx={{ pl: 2 }}>
        <li>Create responsive websites with HTML/CSS</li>
        <li>Implement interactive features with JavaScript</li>
        <li>Understand web development best practices</li>
        <li>Build real-world projects</li>
      </Typography>
    </Box>
  );
}
