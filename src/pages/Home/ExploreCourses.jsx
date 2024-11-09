import React from "react";
import Header from "../../components/Header";
import { CourseContext } from "../../context/CourseContext";
import CourseGrid from "../../components/CourseGrid";

function ExploreCourses() {
  let { courses } = React.useContext(CourseContext);
  courses = courses.courses;
  console.log("Courses: ", courses);
  let cardData = [];

  if (courses) {
    const courseNames = courses.courseNames;
    const cardCount = courseNames.length <= 10 ? courseNames.length : 10;

    for (let i = 0; i < cardCount; i++) {
      let course = courses[courseNames[i]];
      console.log(course.length);
      console.log(course);
      cardData.push({
        courseName: courseNames[i],
        courseLength: course.length,
        description: "",
      });
    }
  }

  return (
    <div className="explore-courses">
      {/* <h1 className="title-text secondary-text bold section-title">
        Explore courses
      </h1> */}
      <Header text="Explore courses" styles={{ marginBottom: "20px" }} />
      {courses && <CourseGrid cardData={cardData} />}
    </div>
  );
}

export default ExploreCourses;
