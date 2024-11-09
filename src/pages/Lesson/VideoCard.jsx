import React from "react";
import "./styles/VideoCard.css";

function VideoCard(props) {
  const textColor = props.recommended ? "white-text" : "secondary-text";
  const backgroundColor = props.recommended
    ? "var(--secondary-color)"
    : "var(--tertiary-color)";

  return (
    <button
      onClick={() => props.onSelected(props.video)}
      className="video-card interactable"
      style={{ backgroundColor: backgroundColor }}
    >
      {props.recommended && <p className="accent-text">Recommended</p>}
      <p className={textColor}>
        <span className={`bold ${textColor}`}>Title:</span> {props.title}
      </p>
      <p className={textColor}>
        <span className={`bold ${textColor}`}>Channel:</span> {props.channel}
      </p>
      <p className={textColor}>
        <span className={`bold ${textColor}`}>Length:</span> {props.length}
      </p>
    </button>
  );
}

export default VideoCard;
