import React from 'react';
import { motion } from 'framer-motion';

// ScrollAnimation component for consistent scroll animations across the landing page
const ScrollAnimation = ({ 
  children, 
  animation = 'fadeIn', // fadeIn, slideUp, slideRight, slideLeft, scale, rotate
  duration = 0.6,
  delay = 0,
  threshold = 0.1, // Viewport threshold to trigger animation
  once = true, // Only animate once
  ...props 
}) => {
  // Define animation variants
  const animations = {
    fadeIn: {
      hidden: { opacity: 0 },
      visible: { opacity: 1 }
    },
    slideUp: {
      hidden: { opacity: 0, y: 50 },
      visible: { opacity: 1, y: 0 }
    },
    slideDown: {
      hidden: { opacity: 0, y: -50 },
      visible: { opacity: 1, y: 0 }
    },
    slideRight: {
      hidden: { opacity: 0, x: -50 },
      visible: { opacity: 1, x: 0 }
    },
    slideLeft: {
      hidden: { opacity: 0, x: 50 },
      visible: { opacity: 1, x: 0 }
    },
    scale: {
      hidden: { opacity: 0, scale: 0.8 },
      visible: { opacity: 1, scale: 1 }
    },
    rotate: {
      hidden: { opacity: 0, rotate: -5 },
      visible: { opacity: 1, rotate: 0 }
    },
    scaleRotate: {
      hidden: { opacity: 0, scale: 0.8, rotate: -5 },
      visible: { opacity: 1, scale: 1, rotate: 0 }
    },
    stagger: {
      hidden: { opacity: 0, y: 20 },
      visible: { opacity: 1, y: 0 }
    }
  };

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once, threshold }}
      transition={{ duration, delay, ease: "easeOut" }}
      variants={animations[animation]}
      {...props}
    >
      {children}
    </motion.div>
  );
};

export default ScrollAnimation;
