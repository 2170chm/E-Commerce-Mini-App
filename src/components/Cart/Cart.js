import React from "react";
import { useCart } from "../../context/CartContext";
import CartItem from "./CartItem";

const Cart = () => {
  const { cartItems } = useCart();

  // Calculate total items and total price
  const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const totalPrice = cartItems
    .reduce((acc, item) => acc + item.price * item.quantity, 0)
    .toFixed(0);

  if (cartItems.length === 0) {
    return (
      <div className="container mt-5">
        <h2>Your Cart is Empty</h2>
        <p>All items you added to the cart appear here</p>
      </div>
    );
  }

  return (
    <div className="container mt-5">
      <h2>Your Shopping Cart</h2>
      <div className="card mb-3">
        <div className="card-body">
          <h5 className="card-title">Cart Summary</h5>
          <p className="card-text">Total Items: {totalItems}</p>
          <p className="card-text">Total Price: ${totalPrice}</p>
        </div>
      </div>
      {cartItems.map((item) => (
        <CartItem key={item.id} item={item} />
      ))}
    </div>
  );
};

export default Cart;
