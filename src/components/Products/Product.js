// Product.js
import React, { useContext } from "react";
import Slider from "react-slick";
import { CartContext } from "../../context/CartContext";
import "./Product.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Product = ({ product, onAddToCart }) => {
  const { cartItems } = useContext(CartContext);

  // Slider settings
  const settings = {
    dots: true,
    infinite: product.images.length > 1,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    lazyLoad: true,
  };

  // Find the product in the cart to determine its quantity
  const cartProduct = cartItems.find((item) => item.id === product.id);
  const quantityInCart = cartProduct ? cartProduct.quantity : 0;

  return (
    <div className="col-md-4 mb-4">
      <div className="card h-100">
        {/* Slider that displays product images */}
        <Slider {...settings}>
          {product.images.map((image, index) => (
            <div key={index}>
              <img
                src={image}
                alt={`Product image ${index + 1}`}
                className="card-img-top"
                style={{ objectFit: "cover", height: "200px", width: "100%" }}
              />
            </div>
          ))}
        </Slider>
        {/* Product details */}
        <div className="card-body d-flex flex-column">
          <h5 className="card-title product-title">{product.title}</h5>
          <p className="card-text product-description">{product.description}</p>
          <p className="card-text">
            <strong>Brand:</strong> {product.brand}
          </p>
          <p className="card-text">
            <strong>Category:</strong> {product.category}
          </p>
          <p className="card-text">
            <strong>Price:</strong> ${product.price}{" "}
            <span className="text-muted">
              ({product.discountPercentage.toFixed(2)}% off)
            </span>
          </p>
          <p className="card-text">
            <strong>Rating:</strong> {product.rating} / 5
          </p>
          <p className="card-text">
            <strong>Stock:</strong> {product.stock} available
          </p>
          {/* Add to Cart button with number of quantities in cart if any */}
          <button
            onClick={() => onAddToCart(product)}
            className="btn btn-primary position-relative"
          >
            Add to Cart
            {quantityInCart > 0 && (
              <span
                className="badge badge-success position-absolute"
                style={{
                  right: "20px",
                  top: "50%",
                  transform: "translateY(-50%)",
                }}
              >
                {quantityInCart} in cart
              </span>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Product;
