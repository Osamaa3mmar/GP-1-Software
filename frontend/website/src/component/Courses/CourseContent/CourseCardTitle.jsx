import { Typography } from "@mui/material"; 

export default function CourseCardTitle({ title }) {
  return (
    <Typography variant="h6" component="div" sx={{ fontWeight: "bold", mb: 1 }}>
      {title}
    </Typography>
  );
}
