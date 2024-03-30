import React, { useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import { CartContext } from "../../context/CartContext";

const Header = ({ onSearch }) => {
  const location = useLocation();
  const { cartItems } = useContext(CartContext);

  // Calculate the total number of items in the cart
  const totalItemsInCart = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  return (
    <header className="bg-dark bg-gradient text-white p-3">
      <div className="container d-flex justify-content-between align-items-center">
        <h1>E-Commerce</h1>
        <nav>
          {/* If the current location is the home page, display a cart icon with the total number of items in the cart */
          /* If the current location is the cart page, display a home icon */}
          {location.pathname === "/" ? (
            <Link to="/cart" className="btn btn-light position-relative">
              <i className="fas fa-shopping-cart"></i>{" "}
              {totalItemsInCart > 0 && (
                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-success">
                  {totalItemsInCart}
                </span>
              )}
            </Link>
          ) : (
            <Link to="/" className="btn btn-light">
              <i className="fas fa-home"></i>
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
