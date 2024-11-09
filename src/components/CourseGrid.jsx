import React from "react";
import CourseCard from "./CourseCard";
import "./styles/CourseGrid.css";

function CourseGrid(props) {
  const cards = props.cardData.map((item) => {
    return (
      <CourseCard
        courseName={item.courseName}
        courseLength={item.courseLength}
        description={item.description}
      />
    );
  });

  return <div className="grid-container">{...cards}</div>;
}

export default CourseGrid;
