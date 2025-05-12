import { createContext, useContext, useState, useEffect } from "react";
import { getLocalStorage, setLocalStorage } from "../helpers/localStorage";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState(() => getLocalStorage("cart", []));

  useEffect(() => {
    setLocalStorage("cart", cartItems);
  }, [cartItems]);

  const addToCart = (course) => {
  setCartItems((prevItems) => {
    const existingItem = prevItems.find((item) => item?.course?.id === course.id);
    if (existingItem) {
      return prevItems;
    }
    return [...prevItems, { course }];
  });
};

  const removeFromCart = (courseId) => {
    setCartItems((prevItems) =>
      prevItems.filter((item) => item?.course?.id !== courseId)
    );
  };

  const getCartTotal = () => {
    return cartItems.reduce((total, item) => total + item?.course?.price, 0);
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        getCartTotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
