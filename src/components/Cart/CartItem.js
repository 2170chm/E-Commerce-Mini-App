import React from "react";
import { useCart } from "../../context/CartContext";

const CartItem = ({ item }) => {
  const { updateCartItem, removeFromCart } = useCart();

  // Increment item quantity
  const incrementQuantity = () => {
    updateCartItem(item.id, item.quantity + 1);
  };

  // Decrement item quantity
  const decrementQuantity = () => {
    if (item.quantity > 1) {
      updateCartItem(item.id, item.quantity - 1);
    } else {
      removeFromCart(item.id); // Remove the item if quantity becomes less than 1
    }
  };

  return (
    <div className="d-flex justify-content-between align-items-center border-bottom mb-3 pb-3">
      <div className="d-flex align-items-center">
        <img
          src={item.thumbnail}
          alt={item.title}
          style={{
            width: "100px",
            height: "100px",
            objectFit: "cover",
            marginRight: "20px",
          }}
        />
        <div>
          <h5>{item.title}</h5>
          <p>Price: $ {item.price}</p>
          <p>Total: $ {(item.price * item.quantity).toFixed(2)}</p>
        </div>
      </div>
      <div className="d-flex align-items-center">
        <button className="btn btn-secondary" onClick={decrementQuantity}>
          -
        </button>
        <div className="mx-2" style={{ minWidth: "50px", textAlign: "center" }}>
          {item.quantity}
        </div>
        <button className="btn btn-secondary" onClick={incrementQuantity}>
          +
        </button>
        <button
          className="btn btn-danger ml-2"
          onClick={() => removeFromCart(item.id)}
        >
          <i className="fas fa-trash"></i>
        </button>
      </div>
    </div>
  );
};

export default CartItem;
