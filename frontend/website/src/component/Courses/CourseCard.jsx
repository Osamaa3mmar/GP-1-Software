import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardActions from "@mui/material/CardActions";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Popover from "@mui/material/Popover";
import usePopover from "../../hooks/usePopover";
import CourseCardContent from "./CourseContent/CourseCardContent";
import { Stack, Typography } from "@mui/material";
import PropTypes from "prop-types";
import AddToCart from "./AddToCart";
import CourseSchedule from "./CourseSchedule";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import { styled } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";

import { Link } from "react-router-dom";

const Arrow = styled("div")(({ theme, direction }) => ({
  position: "absolute",
  width: 0,
  height: 0,
  borderStyle: "solid",
  borderWidth: "8px 8px 8px 0",
  borderColor: `transparent ${theme.palette.background.paper} transparent transparent`,
  left: direction === "left" ? "-8px" : "auto",
  right: direction === "right" ? "-8px" : "auto",
  top: "50%",
  transform: "translateY(-50%)",
}));

export default function CourseCard({ course }) {
  const navigate = useNavigate();
  const {
    anchorEl,
    popoverDirection,
    handlePopoverOpen,
    handlePopoverClose,
    open,
  } = usePopover();

  const handleCardClick = () => {
    navigate(`/main/course/${course.id}`);
  };


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
          cursor: "pointer",
        },
      }}
      onMouseEnter={handlePopoverOpen}
      onMouseLeave={handlePopoverClose}
      onClick={handleCardClick}
    >
      <Card sx={{ width: 350, boxShadow: 3 , height: 560, 
  display: 'flex',
  flexDirection: 'column'}}>
        <CardMedia
          component="img"
          height="194"
          image={course.thumbnail}
          alt={course.title}
          sx={{ objectFit: "cover", maxHeight: 200 }}
        />
        <CourseCardContent course={course} />
        <AddToCart
          product={{
            id: course.id,
            title: course.title,
            price: course.price,
            thumbnail: course.thumbnail,
            teacher: course.teacher,
          }}
        />

        {/* </CardContent> */}

        {/* <CardActions sx={{ p: 2 }}>
          <Button 
            variant="contained" 
            fullWidth
            sx={{
              bgcolor: 'primary.main',
              transition: 'background-color 0.3s ease',
              '&:hover': {
                bgcolor: 'primary.dark',
              }
            }}
          >
            Add to Cart
          </Button>
          <Button component={Link} to={'/main/course/2'} fullWidth  variant='outlined'>
            View
          </Button>
        </CardActions> */}

        {/* </CardContent> */}

        {/* <CardActions sx={{ p: 2 }}>
          <Button 
            variant="contained" 
            fullWidth
            sx={{
              bgcolor: 'primary.main',
              transition: 'background-color 0.3s ease',
              '&:hover': {
                bgcolor: 'primary.dark',
              }
            }}
          >
            Add to Cart
          </Button>
          <Button component={Link} to={'/main/course/2'} fullWidth  variant='outlined'>
            View
          </Button>
        </CardActions> */}
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
          { !course.schedule.length ? null :
          <Stack
            direction="row"
            spacing={1}
            sx={{ mb: 1, display: "flex", alignItems: "center" }}
          >
            <AccessTimeIcon fontSize="small" />
            <Typography variant="h6" sx={{ fontWeight: "bold" }}>
              Course Schedule
            </Typography>
          </Stack>}
          {!course.schedule.length ? null :<CourseSchedule schedule={course.schedule} />}
          <Typography variant="h6" sx={{ fontWeight: "bold", mb: 1, mt: 2 }}>
            Course Details
          </Typography>

          <Typography variant="body2" sx={{ mb: 2 }}>
            {course.learningOutcomes}
            {/* This comprehensive course will take you from zero to hero in web
            development fundamentals. You will learn HTML5, CSS3, and modern
            JavaScript (ES6+) through hands-on projects. */}
          </Typography>
          <Typography variant="body2" sx={{ fontWeight: "bold", mb: 1 }}>
            What You Will Learn:
          </Typography>
          <Typography component="ul" variant="body2" sx={{ pl: 2 }}>
            {course.learningPath}
            {/* <li>Create responsive websites with HTML/CSS</li>
            <li>Implement interactive features with JavaScript</li>
            <li>Understand web development best practices</li>
            <li>Build real-world projects</li> */}
          </Typography>
        </Box>
      </Popover>
    </Box>
  );
}

CourseCard.propTypes = {
  course: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    title: PropTypes.string.isRequired,
    thumbnail: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    teacher: PropTypes.shape({
      username: PropTypes.string.isRequired,
    }),
    duration: PropTypes.number,
    enrollmentNumber: PropTypes.number,
    schedule: PropTypes.arrayOf(
      PropTypes.shape({
        day: PropTypes.string.isRequired,
        startTime: PropTypes.string.isRequired,
        endTime: PropTypes.string.isRequired,
      })
    ),
  }).isRequired,
};
