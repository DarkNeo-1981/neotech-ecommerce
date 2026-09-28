
import { useEffect, useState } from "react";
import { CartContext } from "./CartContext";

const CART_STORAGE_KEY = "neotech-cart";

function loadCart() {
  try {
    const savedCart = localStorage.getItem(CART_STORAGE_KEY);

    if (!savedCart) {
      return [];
    }

    const parsedCart = JSON.parse(savedCart);

    if (!Array.isArray(parsedCart)) {
      return [];
    }

    return parsedCart
      .filter(
        (item) =>
          item !== null &&
          typeof item === "object" &&
          typeof item.id === "string" &&
          typeof item.name === "string" &&
          Number.isFinite(item.price) &&
          item.price >= 0 &&
          Number.isInteger(item.stock) &&
          item.stock > 0 &&
          Number.isInteger(item.quantity) &&
          item.quantity > 0
      )
      .map((item) => ({
        ...item,
        quantity: Math.min(item.quantity, item.stock),
      }));
  } catch {
    return [];
  }
}

export function CartProvider({ children }) {
  const [cart, setCart] = useState(loadCart);

  useEffect(() => {
    try {
      localStorage.setItem(
        CART_STORAGE_KEY,
        JSON.stringify(cart)
      );
    } catch {
      // El carrito sigue funcionando en memoria
      // si el navegador no permite guardarlo.
    }
  }, [cart]);

  const addItem = (item, quantity) => {
    if (
      !Number.isInteger(quantity) ||
      quantity <= 0 ||
      !Number.isInteger(item.stock) ||
      item.stock <= 0
    ) {
      return;
    }

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