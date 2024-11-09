import React from "react";
import ProgressBar from "./ProgressBar";
import "./styles/CourseCard.css";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import { CourseContext } from "../context/CourseContext";

function CourseCard(props) {
  const navigate = useNavigate();
  const { courses } = React.useContext(CourseContext);
  const { user } = React.useContext(UserContext);
  const [cardData, setCardData] = React.useState(null);
  const [length, setLength] = React.useState(1);
  const [progress, setProgress] = React.useState(0);
  const [lessonTitle, setLessonTitle] = React.useState("loading...");

  React.useEffect(() => {
    if (user && courses) {
      const tempProgress = user.coursesInProgress.courseNames.includes(
        props.courseName
      )
        ? user.coursesInProgress[props.courseName].currentLesson
        : 0;
      setLength(courses.courses[props.courseName].length);
      setProgress(tempProgress);
      setLessonTitle(
        courses.courses[props.courseName][tempProgress].lessonName
      );
      console.log(user, courses);
    }
  }, [courses, user]);

  React.useEffect(() => {
    if (courses) {
      setCardData(courses.courses.cardData[props.courseName]);
    }
  }, [courses]);

  return (
    <button
      tabIndex="1"
      className="interactable course-card"
      onClick={() => {
        navigate(`/course-overview/${props.courseName}`);
      }}
    >
      {cardData !== null && (
        <div
          style={{ backgroundColor: cardData.color }}
          className="course-header"
        >
          <p className="course-title">{cardData.title}</p>
          <img
            className="course-logo"
            src={cardData.imageURL}
            alt={props.courseName + " logo"}
          />
        </div>
      )}
      <div className="info-section">
        <p className="secondary-text current-lesson">
          <span className="bold">Current lesson:</span> {lessonTitle}
        </p>
        <ProgressBar progress={Math.round((progress / length) * 100)} />
      </div>
    </button>
  );
}

export default CourseCard;
