import React from "react";
import "./styles/ProgressBar.css";

function ProgressBar(props) {
  let textPadding = "10px";

  if (props.progress === null || props.progress === undefined) {
    return <h1 className="completed">&#10004;</h1>;
  }

  if (props.progress === 100) {
    textPadding = "15px";
  }

  const styles = {
    width: props.progress + "%",
    borderRadius: props.progress === 0 || props.progress === 100 ? "0" : "",
    paddingRight: textPadding,
    backgroundColor:
      props.progress === 0 ? "transparent" : "var(--accent-color)",
  };

  return (
    <div
      className="progress-container"
      style={{
        backgroundColor: props.barColor
          ? props.barColor
          : "var(--secondary-color)",
        paddingLeft: props.progress === 0 ? "20px" : "0",
      }}
    >
      {props.progress === 0 && <p>{props.progress}%</p>}
      <div className="progress-bar" style={styles}>
        {props.progress}%
      </div>
    </div>
  );
}

export default ProgressBar;
