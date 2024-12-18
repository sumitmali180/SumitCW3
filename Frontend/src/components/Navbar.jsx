import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Navbar.css";

export const Navbar = ({ isLoggedIn, onLogout }) => {
  const navigate = useNavigate();

  // Handle navigation based on login status
  const handleNavigation = (path) => {
    if (isLoggedIn || path === "/login-register" || path === "/") {
      navigate(path);
    } else {
      navigate("/login-register");
    }
  };

  // Handle logout functionality
  const handleLogout = () => {
    onLogout();  // Call the onLogout function passed as a prop
    navigate("/");  // Redirect to home page after logout
  };

  return (
    <>
    <div className="nav-container">
      <button onClick={() => handleNavigation("/")}>Home</button>
      <button onClick={() => handleNavigation("/feed")}>
        {isLoggedIn ? "Feed" : "Feed"}
      </button>
      <button
        onClick={isLoggedIn ? handleLogout : () => handleNavigation("/login-register")}
      >
        {isLoggedIn ? "Logout" : "Login/Register"}
      </button>
    </div>
    
    </>
  );
};
