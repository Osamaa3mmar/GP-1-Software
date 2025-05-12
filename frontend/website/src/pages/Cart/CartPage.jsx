import { Container, Box } from "@mui/material";
import CartItems from "../../component/Cart/CartItems";
import SuggestedCourses from "../../component/Cart/SuggestedCourses";
// import CardSchedule from "../../component/Cart/CardSchedule";
import { useCart } from "../../contexts/CartContext";

const CartPage = () => {
  const { cartItems } = useCart();

  const conflictAlternatives = [
    {
      id: 1,
      title: "Alternative Course 1",
      instructor: "John Doe",
      price: 49.99,
      thumbnail: "/course1.jpg",
      schedule: { /* ... */ }
    }
  ];
  return (
    <Container maxWidth="xl">
      {/* <CardSchedule cartItems={cartItems} /> */}
      <Box sx={{ py: 4 }}>
        <CartItems />
      </Box>
      {conflictAlternatives.length > 0 && (
        <SuggestedCourses courses={conflictAlternatives} />
      )}
    </Container>
  );
};

export default CartPage;
