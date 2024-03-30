import React, { useState } from "react";
import { useCart } from "../../context/CartContext";
import CartItem from "./CartItem";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

const Cart = () => {
  const { cartItems, clearCart } = useCart();
  const [show, setShow] = useState(false);
  // separate state to track if order has been placed, which resolves the issue of modal not showing up
  const [orderPlaced, setOrderPlaced] = useState(false);

  const handleClose = () => {
    setShow(false);
    // Clear the cart only after the modal is closed, if an order was placed
    if (orderPlaced) {
      clearCart();
      setOrderPlaced(false); // Reset the order placed flag
    }
  };

  const handleShow = () => {
    setShow(true);
  };

  const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const totalPrice = cartItems
    .reduce((acc, item) => acc + item.price * item.quantity, 0)
    .toFixed(2);

  const handlePlaceOrder = () => {
    setOrderPlaced(true);
    handleShow(true);
  };

  const handleEmptyCart = () => {
    clearCart();
  };

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
      <div className="d-flex justify-content-end">
        <Button
          variant="secondary"
          className="mt-2 mr-2"
          onClick={handleEmptyCart}
        >
          Empty Cart
        </Button>
        <Button variant="primary" className="mt-2" onClick={handlePlaceOrder}>
          Place Order
        </Button>
      </div>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Order Confirmation</Modal.Title>
        </Modal.Header>
        <Modal.Body>Your order has been placed successfully!</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Cart;
