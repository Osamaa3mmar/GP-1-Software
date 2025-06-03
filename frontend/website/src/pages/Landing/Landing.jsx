import React, { useEffect } from "react";
import { Box } from "@mui/material";
import Header from "../../component/landing/Header";
import Hero from "../../component/landing/Hero";
import Features from "../../component/landing/Features";
import PopularCourses from "../../component/landing/PopularCourses";
import Testimonials from "../../component/landing/Testimonials";
import Stats from "../../component/landing/Stats";
import AIFeatures from "../../component/landing/AIFeatures";
import CallToAction from "../../component/landing/CallToAction";
import Footer from "../../component/landing/Footer";

export default function Landing() {
  // Scroll to top on component mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <Box sx={{ overflow: 'hidden' }}>
      <Header />
      <Hero />
      <Features />
      <AIFeatures />
      <Stats />
      <Testimonials />
      <CallToAction />
      <Footer />
    </Box>
  );
}
