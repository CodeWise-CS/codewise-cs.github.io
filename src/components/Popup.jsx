import React from "react";
import Button from "./Button";
import "./styles/Popup.css";

function Popup(props) {
  return (
    <div className="popup">
      <h1 className="title">{props.title}</h1>
      {props.bodyText && <h3 className="body-text">{props.bodyText}</h3>}
      <div className="menu">
        <Button
          text="Cancel"
          onClick={props.onCancel}
          type="transparent"
          styles={{
            color: "var(--text-color)",
          }}
        />
        <Button
          text="OK"
          onClick={props.onConfirm}
          type="accent"
          styles={{
            padding: "10px 16px",
          }}
        />
      </div>
    </div>
  );
}

export default Popup;
