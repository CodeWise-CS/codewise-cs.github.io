import React from "react";
import TopNavbar from "../../components/TopNavbar";
import PathGrid from "../../components/PathGrid";
import capitalize from "../../utils/capitalize";
import Loader from "../../components/Loader";
import { useParams } from "react-router-dom";
import { CourseContext } from "../../context/CourseContext";
import "./styles/CourseOverview.css";
import { UserContext } from "../../context/UserContext";

function CourseOverview() {
  const { course } = useParams();
  const { courses } = React.useContext(CourseContext);
  const { user } = React.useContext(UserContext);
  let currentCourse = null;
  let found = true;

  if (courses) {
    if (courses.courses.courseNames.includes(course)) {
      currentCourse = courses.courses[course];
      console.log(currentCourse);
    } else {
      found = false;
    }
  }

  return (
    <div className="course-overview">
      <TopNavbar />
      <h1 className="secondary-text">{capitalize(course)}</h1>
      {found && user ? (
        currentCourse ? (
          <PathGrid course={currentCourse} courseName={course} />
        ) : (
          <p className="secondary-text">Loading course...</p>
        )
      ) : !found && user ? (
        <p>{`Course "${course}" not found`}</p>
      ) : null}
    </div>
  );
}

export default CourseOverview;
