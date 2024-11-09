import React from "react";
import SideBar from "./SideBar";
import NamePopup from "../Home/NamePopup";
import { updateProfile } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { auth } from "../../firebase";
import "./styles/Auth.css";

function Auth() {
  const [authType, setAuthType] = React.useState("login");
  const [signedUp, setSignedUp] = React.useState(false);
  const [user, setUser] = React.useState(null);
  const navigate = useNavigate();

  function handleSignUp(_user) {
    setSignedUp(true);
    console.log(_user);
    setUser(_user);
  }

  // Research other data to store (such as profile image).
  // Read data from realtime database and display lessons in progress if present.

  function addName(firstName, lastName) {
    console.log(user);
    updateProfile(auth.currentUser, {
      displayName: `${firstName} ${lastName}`,
      photoURL:
        "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
    })
      .then(() => {
        navigate("/");
      })
      .catch((error) => {
        console.log(error);
        navigate("/");
      });
  }

  function switchAuth() {
    setAuthType((oldAuthType) => {
      return oldAuthType === "login" ? "sign up" : "login";
    });
  }

  return (
    <div className="auth">
      {signedUp && <NamePopup onSubmit={addName} />}
      <div className="branding">
        <div className="logo" alt="CodeWise logo"></div>
        <ul className="benefits">
          <li className="white-text">
            <span className="accent-text bold">Interactive</span> courses
          </li>
          <li className="white-text">
            <span className="accent-text bold">Beginner</span> to{" "}
            <span className="accent-text bold">advanced</span>
          </li>
          <li className="white-text">
            Completely <span className="accent-text bold">free</span>
          </li>
          <li className="white-text">
            Earn <span className="accent-text bold">certificates</span>
          </li>
        </ul>
      </div>
      <SideBar
        switchAuth={switchAuth}
        authType={authType}
        onSignUp={handleSignUp}
      />
    </div>
  );
}

export default Auth;
