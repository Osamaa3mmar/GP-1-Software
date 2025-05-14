import CardHeader from "@mui/material/CardHeader";
import Avatar from "@mui/material/Avatar";
import { red } from "@mui/material/colors";

export default function CourseCardHeader({ teacher }) {
  const getInitials = (name) => {
    return name
      ? name
          .split(" ")
          .map((n) => n[0])
          .join("")
          .toUpperCase()
      : "??";
  };

  return (
    <CardHeader
      avatar={
        <Avatar sx={{ bgcolor: red[500] }} aria-label="instructor">
          {getInitials(teacher?.name)}
        </Avatar>
      }
      title={teacher?.name || "Instructor"}
      subheader={teacher?.position || "Instructor"}
      sx={{ p: 0, mb: 2 }}
    />
  );
}
