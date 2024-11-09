import React from "react";
import "./styles/TextInput.css";

function TextInput(props) {
  const styles = {
    border: props.error ? "2px solid var(--error-color)" : "none",
  };

  return (
    <div className="text-input">
      <p className="title">{props.title}</p>
      <input
        style={styles}
        className="input-field"
        type={props.type}
        name={props.name}
        value={props.value}
        onChange={props.onChange}
      />
      {props.error && <p className="error-text">{props.error}</p>}
    </div>
  );
}

export default TextInput;
