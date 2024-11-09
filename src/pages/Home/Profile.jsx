import React from "react";
import ProfilePicture from "../../components/ProfilePicture";
import { auth } from "../../firebase";
import "./styles/Profile.css";

function Profile() {
  function onUpload(event) {
    const upload = event.target.files[0];
    console.log(upload);
    axios.post("");
  }

  return (
    <div className="profile">
      <h1 className="title-text secondary-text bold section-title">Profile</h1>
      <div className="picture-container">
        <ProfilePicture width="150px" src={auth.currentUser.photoURL} />
        <label className="upload-label" for="upload-image">
          Change picture
        </label>
        <input
          id="upload-image"
          type="file"
          className="upload-image"
          accept="image/*"
          onChange={onUpload}
        />
      </div>
    </div>
  );
}

export default Profile;
