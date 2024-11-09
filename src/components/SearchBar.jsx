import React from "react";
import "./styles/SearchBar.css";
import Home from "../pages/Home/Home";

function SearchBar(props) {
  return (
    <input type="text" className="search-bar" placeholder="Search courses" />
  );
}

export default SearchBar;
