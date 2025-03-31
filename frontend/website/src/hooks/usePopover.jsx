import React from 'react';
export default function usePopover() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [popoverDirection, setPopoverDirection] = React.useState("right");

  const handlePopoverOpen = (event) => {
    const cardRect = event.currentTarget.getBoundingClientRect();
    const isLeftHalf = cardRect.left < window.innerWidth / 2;
    setPopoverDirection(isLeftHalf ? "right" : "left");
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  return { anchorEl, popoverDirection, handlePopoverOpen, handlePopoverClose, open };
}
