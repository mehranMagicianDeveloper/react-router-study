import React from "react";
import { Link, NavLink } from "react-router-dom";
import AvatarIcon from "../assets/images/avatar-icon.png";
import { Button } from "@mui/material";

export default function Header() {
  const activeStyles = {
    fontWeight: "bold",
    textDecoration: "underline",
    color: "#161616",
  };

  function fakeLogOut() {
    localStorage.removeItem("loggedIn");
  }

  return (
    <header>
      <Link className="site-logo" to="/">
        #VanLife
      </Link>
      <nav>
        <NavLink
          to="host"
          style={({ isActive }) => (isActive ? activeStyles : null)}
        >
          Host
        </NavLink>
        <NavLink
          to="about"
          style={({ isActive }) => (isActive ? activeStyles : null)}
        >
          About
        </NavLink>
        <NavLink
          to="vans"
          style={({ isActive }) => (isActive ? activeStyles : null)}
        >
          Vans
        </NavLink>
        <Link to="login" className="login-link">
          <img src={AvatarIcon} className="login-icon" alt="login logo" />
        </Link>
        <Button onClick={fakeLogOut}>X</Button>
      </nav>
    </header>
  );
}
// <button onClick={fakeLogOut}>X</button>
