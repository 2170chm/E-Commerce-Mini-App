import React, { createContext, useContext, useState } from "react";
import {
  addToCartAPI,
  removeFromCartAPI,
  updateCartItemAPI,
} from "../api/ServerAPI";

export const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = async (product) => {
    // Simulate Database API call
    const response = await addToCartAPI(product.id);
    if (response.success) {
      setCartItems((prevItems) => {
        const itemExists = prevItems.find((item) => item.id === product.id);
        if (itemExists) {
          // Increase quantity if item already exists
          return prevItems.map((item) =>
            item.id === product.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          );
        } else {
          // Add new item to cart
          return [...prevItems, { ...product, quantity: 1 }];
        }
      });
    }
  };

  const removeFromCart = async (productId) => {
    // Simulate API call
    const response = await removeFromCartAPI(productId);
    if (response.success) {
      setCartItems((prevItems) =>
        prevItems.filter((item) => item.id !== productId)
      );
    }
  };

  const updateCartItem = async (productId, quantity) => {
    // Simulate API call
    const response = await updateCartItemAPI(productId, quantity);
    if (response.success) {
      setCartItems((prevItems) =>
        prevItems.map((item) =>
          item.id === productId ? { ...item, quantity } : item
        )
      );
    }
  };

  const clearCart = () => {
    setCartItems([]); // Clears the cart
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateCartItem,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
