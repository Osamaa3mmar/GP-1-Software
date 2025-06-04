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
console.log(teacher)
  return (
    <CardHeader
      avatar={
        <Avatar src={teacher?.profilePic} sx={{ bgcolor: red[500] }} aria-label="instructor">
          {getInitials(teacher?.username)}
        </Avatar>
      }
      title={teacher?.username || "Instructor"}
      subheader={teacher?.specialization || "Instructor"}
      sx={{ p: 0, mb: 2 }}
    />
  );
}
