
import { Button, CardActions } from "@mui/material";
import { useCart } from '../../contexts/CartContext';

export default function AddToCart({ product }) {
  const { addToCart } = useCart();

  return (
    <CardActions sx={{ p: 2 }}>
      <Button
        variant="contained"
        fullWidth
        sx={{
          bgcolor: "primary.main",
          transition: "background-color 0.3s ease",
          "&:hover": { bgcolor: "primary.dark" },
        }}
        onClick={() => addToCart(product)}
      >
        Add to Cart
      </Button>
    </CardActions>
  );
}