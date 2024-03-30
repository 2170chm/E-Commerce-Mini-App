import React, { useEffect, useState } from "react";
import { getProducts } from "../../api/ServerAPI";
import Product from "./Product";
import SearchBar from "../Search/SearchBar";
import { useCart } from "../../context/CartContext";
import "./ProductList.css";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchType, setSearchType] = useState("name");
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(9);
  const { addToCart } = useCart();

  useEffect(() => {
    getProducts()
      .then((data) => {
        setProducts(data.products);
      })
      .catch((error) => console.error("Failed to fetch products:", error));
  }, []);

  // Filter products based on searchTerm
  const filteredProducts = products.filter((product) => {
    const term = searchTerm.toLowerCase();
    if (searchType === "name") {
      return product.title.toLowerCase().includes(term);
    } else if (searchType === "category") {
      return product.category.toLowerCase().includes(term);
    }
    return false;
  });

  // Get current products to display on the page
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  // Change page
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Calculate page numbers
  const pageNumbers = [];
  for (
    let i = 1;
    i <= Math.ceil(filteredProducts.length / productsPerPage);
    i++
  ) {
    pageNumbers.push(i);
  }

  return (
    <>
      <div className="search-bar-container">
        <SearchBar
          onSetSearchCriteria={setSearchTerm}
          onSetSearchType={setSearchType}
        />
      </div>
      <div className="row">
        {currentProducts.map((product) => (
          <Product
            key={product.id}
            product={product}
            onAddToCart={() => addToCart(product)}
          />
        ))}
      </div>
      <nav aria-label="Product Pagination">
        <ul className="pagination justify-content-center">
          {pageNumbers.map((number) => (
            <li
              key={number}
              className={`page-item ${currentPage === number ? "active" : ""}`}
            >
              <a onClick={() => handlePageChange(number)} className="page-link">
                {number}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </>
  );
};

export default ProductList;
