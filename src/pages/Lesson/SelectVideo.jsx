import React from "react";
import "./styles/SelectVideo.css";

function SelectVideo(props) {
  return (
    <div className="select-video">
      <h1 className="secondary-text title">Select a video</h1>
      {props.children}
    </div>
  );
}

export default SelectVideo;
