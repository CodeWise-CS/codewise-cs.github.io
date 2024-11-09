import React from "react";
import { auth } from "../firebase";
import "./styles/ProfilePicture.css";

function ProfilePicture(props) {
  return (
    <img
      src={props.src}
      alt={`${auth.currentUser.displayName} profile picture`}
      width={props.width}
      className="profile-picture"
    />
  );
}

export default ProfilePicture;
