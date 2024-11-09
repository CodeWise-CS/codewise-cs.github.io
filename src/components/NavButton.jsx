import React from "react";
import "./styles/NavButton.css";

function NavButton(props) {
  const styles = {
    fontWeight: props.selected && "bold",
    textDecoration: props.selected && "underline",
  };

  return (
    <button
      className="nav-button interactable"
      onClick={props.onClick}
      style={styles}
    >
      {props.text}
    </button>
  );
}

export default NavButton;
