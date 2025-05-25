
import { Button, CardActions } from "@mui/material";
import { useCart } from '../../contexts/CartContext';
import axios from "axios";

export default function AddToCart({ product }) {
  const { addToCart } = useCart();

  return (
    <CardActions sx={{ px: 2 , pb: 2 }}>
      <Button
        variant="contained"
        fullWidth
        sx={{
          bgcolor: "primary.main",
          transition: "background-color 0.3s ease",
          "&:hover": { bgcolor: "primary.dark" },
        }}
        onClick={(e) => {
          console.log("product", product);
          addToCart(product);
          // axios.post("http://localhost:4545/cart/create", {
          //   productId: product._id,
          // });
          e.stopPropagation();
        }}
      >
        Add to Cart
      </Button>
    </CardActions>
  );
}