import React from "react";
import Exercise from "./Exercise";
import Lesson from "./Lesson";
import { UserContext } from "../../context/UserContext";
import { useNavigate, useParams } from "react-router-dom";
import { CourseContext } from "../../context/CourseContext";
import "./styles/LessonHandler.css";
import { setUserData } from "../../firebase";
import Loader from "../../components/Loader";

function LessonHandler() {
  const { courses } = React.useContext(CourseContext);
  const { user } = React.useContext(UserContext);
  const { course } = useParams();
  const queryParameters = new URLSearchParams(window.location.search);
  const [lessonNumber, setLessonNumber] = React.useState(
    queryParameters.get("lesson")
  );
  const navigate = useNavigate();
  const [lesson, setLesson] = React.useState(null);

  console.log(courses);

  function handleEnd(accuracy) {
    console.log("handle end: ", user);
    if (user) {
      if (user.coursesInProgress[course].currentLesson == lessonNumber) {
        // setUserData(course, { currentLesson: Number(lessonNumber) + 1 }, `coursesInProgress`);
        setUserData(
          Number(lessonNumber) + 1,
          `coursesInProgress/${course}/currentLesson`
        );
      }
      queryParameters.set("lesson", Number(lessonNumber) + 1);
      setLessonNumber(Number(lessonNumber) + 1);
      history.replaceState(null, null, "?" + queryParameters.toString());
    }
  }

  React.useEffect(() => {
    if (courses) {
      if (courses.courses.courseNames.includes(course)) {
        setLesson(courses.courses[course][lessonNumber]);
      }
    }
  }, [courses, lessonNumber]);

  return lesson ? (
    lesson.type === "exercise" ? (
      <Exercise handleEnd={handleEnd} lesson={lesson} />
    ) : (
      <Lesson handleEnd={handleEnd} lesson={lesson} />
    )
  ) : (
    <Loader />
    // <h1>Loading...</h1>
  );
}

export default LessonHandler;
