import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import { useCart } from '../../contexts/CartContext';

export default function Cart() {
  const { cartItems } = useCart();
  const itemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <IconButton aria-label="cart">
      <Badge badgeContent={itemCount} color="primary">
        <ShoppingCartIcon sx={{ fontSize: "26px", color: "black" }}/>
      </Badge>
    </IconButton>
  );
}