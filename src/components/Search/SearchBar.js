// src/components/SearchBar/SearchBar.js

import React, { useState } from "react";

const SearchBar = ({ onSetSearchCriteria, onSetSearchType }) => {
  const [inputValue, setInputValue] = useState("");
  const [searchType, setSearchType] = useState("name"); // Default search type

  const handleSubmit = (e) => {
    e.preventDefault();
    onSetSearchCriteria(inputValue);
    onSetSearchType(searchType);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="d-flex justify-content-center mt-3"
    >
      {/* Add a dropdown to select search type */}
      <select
        className="form-control mr-2"
        value={searchType}
        onChange={(e) => setSearchType(e.target.value)}
        style={{ width: "auto" }}
      >
        <option value="name">Name</option>
        <option value="category">Category</option>
      </select>
      {/* Add a search input field */}
      <input
        type="text"
        className="form-control"
        placeholder="Search products..."
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
      <button type="submit" className="btn btn-primary ml-2">
        Search
      </button>
    </form>
  );
};

export default SearchBar;
