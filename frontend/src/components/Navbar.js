/*Navbar components*/
import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

/*navbar links to homepage*/
function Navbar() {
  return (
    <nav className="navbar">
      <Link to="/" className="navbar-brand">
        WLU CS Course Tracker
      </Link>
      <div className="navbar-links">
        <Link to="/">Home</Link>
        <Link to="/">About</Link>
        <Link to="/">Login / Register</Link>
      </div>
    </nav>
  );
}

export default Navbar;