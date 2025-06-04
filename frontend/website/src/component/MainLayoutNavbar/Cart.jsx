import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import { useCart } from '../../contexts/CartContext';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { OsamaCartContext } from '../../Context/CartOsama';

export default function Cart() {
  const navigate = useNavigate();
  const {cartCount}=useContext(OsamaCartContext);
  return (
    <IconButton aria-label="cart" onClick={() => navigate('/main/cart')}>
      <Badge badgeContent={cartCount?cartCount:0} color="primary">
        <ShoppingCartIcon sx={{ fontSize: "26px", color: "black" }}/>
      </Badge>
    </IconButton>
  );
}