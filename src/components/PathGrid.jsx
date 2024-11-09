import React from "react";
import LessonCard from "./LessonCard";
import { UserContext } from "../context/UserContext";
import "./styles/PathGrid.css";
import { useNavigate } from "react-router-dom";

function PathGrid(props) {
  const [courses, setCourses] = React.useState(props.course);
  const [loading, setLoading] = React.useState(true);
  const navigate = useNavigate();
  const { user } = React.useContext(UserContext);
  let rows = null;

  const completedLessons = user.coursesInProgress.courseNames.includes(
    props.courseName
  )
    ? user.coursesInProgress[props.courseName].currentLesson
    : null;

  let elements = null;

  React.useEffect(() => {
    setLoading(false);
  }, []);

  if (!loading) {
    const filteredCourses = courses.filter((item) => item.type !== "exercise");
    elements = filteredCourses.map((item, index) => {
      const row = Math.floor(index / 3);

      const completed = index + 1 <= Math.floor(completedLessons / 2);
      let progress = completedLessons % 2 === 0 ? 100 : 50;
      let started = !completed;

      if (index === Math.floor(completedLessons / 2)) {
        started = false;
        progress = completedLessons % 2 === 0 ? 0 : 50;
      }

      if (completed) {
        progress = null;
      }
      if (started) {
        progress = 0;
      }

      return index % 3 ? (
        <React.Fragment key={index}>
          <div className="horizontal-line"></div>
          <LessonCard
            onClick={() => {
              console.log(
                `/lesson/${props.courseName}?lesson=${
                  index * 2 + (progress === 50 ? 1 : 0)
                }`
              );
              navigate(
                `/lesson/${props.courseName}?lesson=${
                  index * 2 + (progress === 50 ? 1 : 0)
                }`
              );
            }}
            lessonName={item.lessonName}
            completed={completed}
            progress={progress}
          />
        </React.Fragment>
      ) : (
        // Fix styling
        <React.Fragment key={index}>
          {/* {row !== 0 && (
            <div className={row % 2 ? "right-line" : "left-line"}></div>
          )} */}
          <LessonCard
            onClick={() => {
              console.log(
                `/lesson/${props.courseName}?lesson=${
                  index * 2 + (progress === 50 ? 1 : 0)
                }`
              );
              navigate(
                `/lesson/${props.courseName}?lesson=${
                  index * 2 + (progress === 50 ? 1 : 0)
                }`
              );
            }}
            lessonName={item.lessonName}
            completed={completed}
            progress={progress}
          />
        </React.Fragment>
      );
    });

    const chunkedElements = chunkArray(elements, 3);
    rows = chunkedElements.map((item, index) => {
      return (
        <React.Fragment key={index}>
          {index !== 0 && (
            <div className={index % 2 ? "right-line" : "left-line"}></div>
          )}
          <div className={`row ${index % 2 ? "reverse" : ""}`}>{...item}</div>
        </React.Fragment>
      );
    });
  }
  function chunkArray(array, size) {
    const result = [];
    for (let i = 0; i < array.length; i += size) {
      const chunk = array.slice(i, i + size);
      result.push(chunk);
    }

    return result;
  }

  return <div className="path-grid">{rows !== null && rows}</div>;
}

export default PathGrid;
