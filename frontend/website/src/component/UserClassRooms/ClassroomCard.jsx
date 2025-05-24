import { Box, Card, CardMedia, CardContent , Button} from "@mui/material";
import { useNavigate } from "react-router-dom";
import CourseCardTitle from "../Courses/CourseContent/CourseCardTitle";
import CourseCardHeader from "../Courses/CourseContent/CourseCardHeader";

export default function ClassroomCard({course}) {
  const navigate = useNavigate();
  const handleCardClick = () => {
    navigate(`/main/classrooms/${course?.id}`);
  };
  console.log(course);
  
  return (
    <Box
      sx={{
        m: 3,
        width: "fit-content",
        position: "relative",
        transition: "transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out",
        "&:hover": {
          transform: "translateY(-4px)",
          boxShadow: 6,
        },
      }}>
      <Card
        sx={{
          width: 350,
          boxShadow: 3,
          height: 400,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <CardMedia
          component="img"
          height="194"
          image={course?.thumbnail}
          alt={course?.title}
          sx={{ objectFit: "cover", maxHeight: 200 }}
        />
        <CardContent
          sx={{
            flexGrow: 1,
            display: "flex",
            flexDirection: "column",
            pb: 0,
          }}
        >
          <CourseCardTitle title={course?.title} />
          <CourseCardHeader teacher={course?.teacher} />
          <Button
        variant="contained"
        fullWidth
        sx={{
          mt: "auto",
          bgcolor: "primary.main",
          transition: "background-color 0.3s ease",
          "&:hover": { bgcolor: "primary.dark" },
        }}
        onClick={handleCardClick}
      >
        View Course
      </Button>
        </CardContent>
      </Card>
    </Box>
  );
}
