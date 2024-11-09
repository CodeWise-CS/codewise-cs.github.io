import React from "react";
import { logOut } from "../../firebase";
import NavButton from "../../components/NavButton";
import Button from "../../components/Button";
import "./styles/Navbar.css";

function Navbar(props) {
  return (
    <div className="navbar">
      <img
        className="logo"
        src="src/assets/codewise-logo.svg"
        alt="CodeWise logo"
      />
      <div className="menu">
        <div>
          <NavButton
            onClick={() => props.changePage(0)}
            text="Dashboard"
            selected={props.page === 0}
          />
          <NavButton
            onClick={() => props.changePage(1)}
            text="Explore courses"
            selected={props.page === 1}
          />
          <NavButton
            onClick={() => props.changePage(2)}
            text="Profile"
            selected={props.page === 2}
          />
        </div>
        <Button
          onClick={logOut}
          bold={true}
          styles={{
            top: "auto",
            padding: "14px",
          }}
          text="Log out"
          type="accent"
        />
      </div>
    </div>
  );
}

export default Navbar;
