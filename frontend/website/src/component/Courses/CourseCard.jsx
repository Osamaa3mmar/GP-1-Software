import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardActions from "@mui/material/CardActions";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Popover from "@mui/material/Popover";
import CoursePopover from "./CoursePopover/CoursePopover";
import usePopover from "../../hooks/usePopover";
import CourseCardContent from "./CourseContent/CourseCardContent";
import CourseCardSchedule from "./CourseCardSchedule";
import { Stack, Typography } from "@mui/material";
import { red } from "@mui/material/colors";
import PropTypes from "prop-types";
import AddToCart from "./AddToCart";
import CourseSchedule from "./CourseSchedule";
import AccessTimeIcon from "@mui/icons-material/AccessTime";

const course = {
  id: "web-dev-101",
  title: "Modern Web Development",
  instructor: "Sarah Johnson",
  description: "Master full-stack development with modern tools...",
  totalHours: 42,
  level: "Intermediate",
  enrolled: 2345,
  schedule: [
    { day: "Sunday", startTime: "14:00", endTime: "16:00" },
    { day: "Tuesday", startTime: "14:00", endTime: "16:00" },
    { day: "Thursday", startTime: "14:00", endTime: "16:00" },
  ],
};
export default function CourseCard() {
  const {
    anchorEl,
    popoverDirection,
    handlePopoverOpen,
    handlePopoverClose,
    open,
  } = usePopover();

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
      }}
      onMouseEnter={handlePopoverOpen}
      onMouseLeave={handlePopoverClose}
    >
      <Card sx={{ maxWidth: 345, boxShadow: 3 }}>
        <CardMedia
          component="img"
          height="194"
          image="https://d2opxh93rbxzdn.cloudfront.net/original/2X/4/40cfa8ca1f24ac29cfebcb1460b5cafb213b6105.png"
          alt="Web Development Course"
          sx={{ objectFit: "cover", maxHeight: 200 }}
        />
        <CourseCardContent />
        {/* <CardContent>
          <Stack direction="row" spacing={1} sx={{ mb: 1 }}>
            <Chip
              label="HTML"
              variant="outlined"
              color="primary"
              size="small"
            />
            <Chip label="CSS" variant="outlined" color="primary" size="small" />
            <Chip label="JS" variant="outlined" color="primary" size="small" />
          </Stack>

          <Typography
            variant="h6"
            component="div"
            sx={{ fontWeight: "bold", mb: 1 }}
          >
            Introduction to Web Development
          </Typography>

          <CardHeader
            avatar={
              <Avatar sx={{ bgcolor: red[500] }} aria-label="instructor">
                JD
              </Avatar>
            }
            title="John Doe"
            subheader="Senior Web Developer"
            sx={{ p: 0 }}
          />

          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ mt: 2, mb: 2 }}
          >
            Master the fundamentals of HTML, CSS, and JavaScript to build modern
            websites.
          </Typography>

          <Stack direction="row" spacing={1} sx={{ mb: 2 }}>
            <Chip
              icon={<AccessTimeIcon fontSize="small" />}
              label="8 weeks"
              variant="outlined"
              size="small"
            />
            <Chip
              icon={<PeopleIcon fontSize="small" />}
              label="1245 students"
              variant="outlined"
              size="small"
            />
          </Stack>

          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <Typography variant="h6" sx={{ fontWeight: "bold" }}>
              $99.99
            </Typography>
            <Stack direction="row" alignItems="center" spacing={1}>
              <Rating
                name="course-rating"
                value={4.5}
                precision={0.5}
                readOnly
                size="medium"
              />
              <Typography variant="body2" color="text.secondary">
                (1.2k)
              </Typography>
            </Stack>
          </Stack>
        </CardContent> */}
        <AddToCart
          product={{
            id: 1,
            name: "Product Name",
            price: 29.99,
          }}
        />
      </Card>
      {/* <CoursePopover
        anchorEl={anchorEl}
        popoverDirection={popoverDirection}
        handlePopoverClose={handlePopoverClose}
        open={open}
      /> */}
      <Popover
        sx={{
          pointerEvents: "none",
          "& .MuiPopover-paper": {
            position: "relative",
            borderRadius: 2,
            padding: 2,
            maxWidth: 420,
          },
        }}
        open={open}
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: "center",
          horizontal: popoverDirection === "right" ? "right" : "left",
        }}
        transformOrigin={{
          vertical: "center",
          horizontal: popoverDirection === "right" ? "left" : "right",
        }}
        onClose={handlePopoverClose}
        disableRestoreFocus
      >
        {/* <Arrow direction={popoverDirection} />  */}
        <Box>
          <Stack direction="row" spacing={1} sx={{ mb: 1 , display: "flex", alignItems: "center"}}>
          <AccessTimeIcon fontSize="small" />
          <Typography variant="h6" sx={{ fontWeight: "bold"}}>
            Course Schedule
          </Typography>
          </Stack>
          <CourseSchedule schedule={course.schedule} />
          <Typography variant="h6" sx={{ fontWeight: "bold", mb: 1, mt: 2 }}>
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
      </Popover>
    </Box>
  );
}
CourseCard.propTypes = {
  course: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    instructor: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    schedule: PropTypes.arrayOf(
      PropTypes.shape({
        day: PropTypes.string.isRequired,
        startTime: PropTypes.string.isRequired,
        endTime: PropTypes.string.isRequired,
      })
    ).isRequired,
    totalHours: PropTypes.number.isRequired,
    level: PropTypes.string.isRequired,
    enrolled: PropTypes.number,
  }).isRequired,
  className: PropTypes.string,
};
