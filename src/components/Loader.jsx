import React from "react";
import "./styles/Loader.css";

function Loader(props) {
  return (
    <div className="loader">
      <h3 className="loading-text">{props.text ? props.text : "Loading..."}</h3>
      <div className="lds-ellipsis">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
}

export default Loader;
