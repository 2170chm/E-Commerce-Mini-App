import React from "react";
import ProductList from "../components/Products/ProductList";

function HomePage() {
  return (
    <div className="container mt-5">
      <h1>Products</h1>
      <ProductList />
    </div>
  );
}

export default HomePage;
