
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
        return prevCart.map((cartItem) => {
          if (cartItem.id === item.id) {
            const newQuantity = Math.min(
              cartItem.quantity + quantity,
              cartItem.stock
            );

            return {
              ...cartItem,
              quantity: newQuantity,
            };
          }

          return cartItem;
        });
      }

      return [
        ...prevCart,
        {
          ...item,
          quantity: Math.min(quantity, item.stock),
        },
      ];
    });
  };

  const increaseItem = (itemId) => {
    setCart((prevCart) =>
      prevCart.map((cartItem) =>
        cartItem.id === itemId &&
        cartItem.quantity < cartItem.stock
          ? {
              ...cartItem,
              quantity: cartItem.quantity + 1,
            }
          : cartItem
      )
    );
  };

  const decreaseItem = (itemId) => {
    setCart((prevCart) =>
      prevCart.map((cartItem) =>
        cartItem.id === itemId &&
        cartItem.quantity > 1
          ? {
              ...cartItem,
              quantity: cartItem.quantity - 1,
            }
          : cartItem
      )
    );
  };

  const removeItem = (itemId) => {
    setCart((prevCart) =>
      prevCart.filter(
        (cartItem) => cartItem.id !== itemId
      )
    );
  };

  const clear = () => {
    setCart([]);
  };

  const isInCart = (id) => {
    return cart.some(
      (cartItem) => cartItem.id === id
    );
  };

  const totalItems = cart.reduce(
    (total, cartItem) =>
      total + cartItem.quantity,
    0
  );

  const totalPrice = cart.reduce(
    (total, cartItem) =>
      total +
      cartItem.price * cartItem.quantity,
    0
  );

  return (
    <CartContext.Provider
      value={{
        cart,
        addItem,
        increaseItem,
        decreaseItem,
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