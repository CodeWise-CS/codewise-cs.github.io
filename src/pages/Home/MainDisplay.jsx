import React from "react";
import Dashboard from "./Dashboard";
import ExploreCourses from "./ExploreCourses";
import Profile from "./Profile";
import "./styles/MainDisplay.css";

function MainDisplay(props) {
  const pages = [<Dashboard />, <ExploreCourses />, <Profile />];

  let display = pages[props.page];

  return <div className="main-display">{display}</div>;
}

export default MainDisplay;
