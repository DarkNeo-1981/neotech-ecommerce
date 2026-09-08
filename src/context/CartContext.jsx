
import { createContext, useContext, useState } from "react";

export const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);

  const addItem = (item, quantity) => {
    setCart((prevCart) => {
      const itemInCart = prevCart.find(
        (cartItem) => cartItem.id === item.id
      );

      if (itemInCart) {
        return prevCart.map((cartItem) =>
          cartItem.id === item.id
            ? {
                ...cartItem,
                quantity: cartItem.quantity + quantity,
              }
            : cartItem
        );
      }

      return [...prevCart, { ...item, quantity }];
    });
  };

  const removeItem = (itemId) => {
    setCart((prevCart) =>
      prevCart.filter((cartItem) => cartItem.id !== itemId)
    );
  };

  const clear = () => {
    setCart([]);
  };

  const isInCart = (id) => {
    return cart.some((cartItem) => cartItem.id === id);
  };

  const totalItems = cart.reduce(
    (total, cartItem) => total + cartItem.quantity,
    0
  );

  const totalPrice = cart.reduce(
    (total, cartItem) =>
      total + cartItem.price * cartItem.quantity,
    0
  );

  return (
    <CartContext.Provider
      value={{
        cart,
        addItem,
        removeItem,
        clear,
        isInCart,
        totalItems,
        totalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}