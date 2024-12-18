import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { Home } from "./components/Home";
import { Feed } from "./components/Feed";
import { LoginRegister } from "./components/LoginRegister";
import { Navbar } from "./components/Navbar";
import { Error } from "./components/Error";
import './index.css';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Check login status in localStorage on initial load
  useEffect(() => {
    const storedLoginStatus = localStorage.getItem("isLoggedIn");
    if (storedLoginStatus === "true") {
      setIsLoggedIn(true);
    }
  }, []);

  // Function to handle login status change
  const handleLoginStatusChange = (status) => {
    setIsLoggedIn(status);
    localStorage.setItem("isLoggedIn", status);
  };

  // Function to handle logout
  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.setItem("isLoggedIn", "false");
  };

  return (
    <>
      <Navbar isLoggedIn={isLoggedIn} onLogout={handleLogout} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/feed"
          element={isLoggedIn ? <Feed /> : <LoginRegister onLogin={handleLoginStatusChange} />}
        />
        <Route
          path="/login-register"
          element={<LoginRegister onLogin={handleLoginStatusChange} />}
        />
        <Route path="*" element={<Error />} />
      </Routes>
    </>
  );
}

export default App;
