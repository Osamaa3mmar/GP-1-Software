
import { Button, CardActions } from "@mui/material";
import { useCart } from '../../contexts/CartContext';

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
          addToCart(product)
          e.stopPropagation();
        }}
      >
        Add to Cart
      </Button>
    </CardActions>
  );
}