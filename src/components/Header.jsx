import React from "react";
import "./styles/Header.css";

function Header(props) {
  return (
    <h1
      className={`title-text bold header ${
        props.color ? props.color : "secondary-text"
      }`}
      style={props.styles}
    >
      {props.text}
    </h1>
  );
}

export default Header;
