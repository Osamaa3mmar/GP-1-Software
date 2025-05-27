import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardActions from "@mui/material/CardActions";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import usePopover from "../../hooks/usePopover";
import CourseCardContent from "./CourseContent/CourseCardContent";
import PropTypes from "prop-types";
import AddToCart from "./AddToCart";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import CoursePopover from "./CoursePopover/CoursePopover";



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
          image={course?.thumbnail}
          alt={course?.title}
          sx={{ objectFit: "cover", maxHeight: 200 }}
        />
        <CourseCardContent course={course} />
        
        <AddToCart
           product={course}
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
      <CoursePopover
        anchorEl={anchorEl}
        popoverDirection={popoverDirection}
        handlePopoverClose={handlePopoverClose}
        open={open}
        course={course}
      />
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
    startDate: PropTypes.string,
    endDate: PropTypes.string,
    schedule: PropTypes.arrayOf(
      PropTypes.shape({
        day: PropTypes.string.isRequired,
        startTime: PropTypes.string.isRequired,
        endTime: PropTypes.string.isRequired,
      })
    ),
  }).isRequired,
};
