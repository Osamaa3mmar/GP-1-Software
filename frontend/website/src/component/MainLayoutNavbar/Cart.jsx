import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import { useCart } from '../../contexts/CartContext';
import { useNavigate } from 'react-router-dom';

export default function Cart() {
  const { cartItems } = useCart();
  const itemCount = cartItems.length;
  const navigate = useNavigate();

  return (
    <IconButton aria-label="cart" onClick={() => navigate('/main/cart')}>
      <Badge badgeContent={itemCount} color="primary">
        <ShoppingCartIcon sx={{ fontSize: "26px", color: "black" }}/>
      </Badge>
    </IconButton>
  );
}