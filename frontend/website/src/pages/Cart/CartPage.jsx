import { Container, Box } from "@mui/material";
import CartItems from "../../component/Cart/CartItems";
import SuggestedCourses from "../../component/Cart/SuggestedCourses";
import CardSchedule from "../../component/Cart/CardSchedule";
import CartSchedule from "../../component/Cart/CartSchedule";
import { useCart } from "../../contexts/CartContext";
import { useEffect, useState } from "react";

const CartPage = () => {
  const [conflicts, setConflicts] = useState([]);
  const [suggestedCourses, setSuggestedCourses] = useState([]);

  // Mock function to fetch alternative courses - replace with real API call
  const fetchAlternatives = async (conflictIds) => {
    return [
      {
        id: 101,
        title: "Web Development Fundamentals",
        teacher: { username: "Sarah Johnson" },
        price: 89.99,
        thumbnail: "/web-dev.jpg",
        duration: 6,
        schedule: {
          start: "2024-03-01T10:00:00",
          end: "2024-03-01T12:00:00",
        },
        rating: { value: 4.5, count: 250 },
      },
      // Add more mock courses as needed
    ];
  };

  useEffect(() => {
    const conflictIds = conflicts.flatMap((c) => [c.course1, c.course2]);
    if (conflictIds.length > 0) {
      fetchAlternatives(conflictIds).then(setSuggestedCourses);
    }
  }, [conflicts]);

  return (
    <Container
      maxWidth="xl"
      sx={{
        py: 4,
        "& .MuiGrid-container": {
          justifyContent: { xs: "center", md: "flex-start" },
        },
      }}
    >
      {/* <Box sx={{ mb: 4 }}>
        <CartSchedule/>
      </Box> */}
      {/* <Box sx={{ mb: 4 }}>
        <CardSchedule
          cartItems={cartItems}
          onConflictsDetected={setConflicts}
        />
      </Box> */}

      <Box sx={{ mb: 4 }}>
        <CartItems />
      </Box>

      {suggestedCourses.length > 0 && (
        <SuggestedCourses
          courses={suggestedCourses}
          conflictNames={conflicts.map((c) => `${c.course1} and ${c.course2}`)}
        />
      )}
    </Container>
  );
};

export default CartPage;
