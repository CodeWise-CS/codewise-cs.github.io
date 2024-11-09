import React from "react";
import TextInput from "./TextInput";
import "./styles/TopNavbar.css";
import SearchBar from "./SearchBar";
import { useNavigate } from "react-router-dom";

function TopNavbar() {
  const navigate = useNavigate();

  return (
    <div className="top-navbar">
      <button
        className="nav-button interactable"
        onClick={() => {
          navigate("/");
        }}
      >
        Dashboard
      </button>
      <SearchBar />
    </div>
  );
}

export default TopNavbar;
