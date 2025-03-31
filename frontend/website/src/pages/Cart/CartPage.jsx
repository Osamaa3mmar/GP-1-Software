import { useCart } from '../../contexts/CartContext';

export default function CartPage() {
  const { cartItems } = useCart();

  return (
    <div>
      <h1>Your Cart</h1>
      {cartItems.map(item => (
        <div key={item.id}>
          <h3>{item.name}</h3>
          <p>Quantity: {item.quantity}</p>
          <p>Price: ${(item.price * item.quantity).toFixed(2)}</p>
        </div>
      ))}
    </div>
  );
}