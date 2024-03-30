import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { CartProvider } from "../context/CartContext";
import HomePage from "../pages/HomePage";
import CartPage from "../pages/CartPage";
import Header from "../components/Header/Header";

function App() {
  return (
    // Wrap with CartProvider to provide cart context to all components
    <CartProvider>
      <Router>
        <div>
          <Header />
          <Routes>
            <Route path="/" element={<HomePage />} exact />
            <Route path="/cart" element={<CartPage />} />
          </Routes>
        </div>
      </Router>
    </CartProvider>
  );
}

export default App;
