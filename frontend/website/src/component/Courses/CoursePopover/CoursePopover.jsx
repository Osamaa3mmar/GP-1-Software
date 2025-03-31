import { Popover } from "@mui/material";
import CourseArrow from "./CourseArrow";
import CoursePopoverContent from "./CoursePopoverContent";

export default function CoursePopover(
  anchorEl,
  popoverDirection,
  handlePopoverClose,
  open
) {
  return (
    <Popover
      sx={{
        pointerEvents: "none",
        "& .MuiPopover-paper": {
          position: "relative",
          borderRadius: 2,
          padding: 2,
          maxWidth: 345,
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
      <CoursePopoverContent />
    </Popover>
  );
}
