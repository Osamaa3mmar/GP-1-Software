import { Popover } from "@mui/material";
import CourseArrow from "./CourseArrow";
import CoursePopoverContent from "./CoursePopoverContent";
import PropTypes from "prop-types";

export default function CoursePopover({ 
  anchorEl, 
  popoverDirection, 
  handlePopoverClose, 
  open,
  course 
}) {
  return (
    <Popover
      sx={{
        pointerEvents: "none",
        "& .MuiPopover-paper": {
          position: "relative",
          borderRadius: 2,
          padding: 2,
          maxWidth: 420,
          pointerEvents: "auto",
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
      <CourseArrow direction={popoverDirection} />
      <CoursePopoverContent course={course} />
    </Popover>
  );
}

CoursePopover.propTypes = {
  anchorEl: PropTypes.object,
  popoverDirection: PropTypes.string,
  handlePopoverClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  course: PropTypes.object.isRequired
};
