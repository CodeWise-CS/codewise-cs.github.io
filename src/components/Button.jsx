import React from "react";
import "./styles/Button.css";

function Button(props) {
  let color = "var(--tertiary-color)";
  if (props.type === "secondary") {
    color = "var(--secondary-color)";
  } else if (props.type === "accent") {
    color = "var(--accent-color)";
  } else if (props.type === "transparent") {
    color = "transparent";
  }

  const styles = {
    ...props.styles,
    backgroundColor: color,
    color: props.type ? "var(--white-color)" : "var(--text-color)",
    fontWeight: props.bold ? "bold" : "",
  };

  return (
    <button
      className="button interactable"
      style={{ ...styles, ...props.styles }}
      onClick={props.onClick}
    >
      {props.text}
    </button>
  );
}

export default Button;
