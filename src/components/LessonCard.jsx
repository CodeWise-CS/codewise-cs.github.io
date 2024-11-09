import React from "react";
import ProgressBar from "./ProgressBar";
import "./styles/LessonCard.css";

function LessonCard(props) {
  return (
    <div
      className={`lesson-card ${props.completed && "completed-lesson-card"}`}
      onClick={props.onClick}
    >
      <p>{props.lessonName}</p>
      <ProgressBar progress={props.progress} />
    </div>
  );
}

export default LessonCard;
