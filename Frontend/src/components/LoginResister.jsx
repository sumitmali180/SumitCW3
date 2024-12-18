import React, { useState } from "react";
import "../styles/LoginResister.css";
//import googleImage from "../assets/google.png";

export const LoginResister = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const toggleForm = () => {
    setIsSignUp(!isSignUp);
  };

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loading) return;
    setLoading(true);
    setError("");

    const firebaseUrl = "https://grid-space-default-rtdb.asia-southeast1.firebasedatabase.app";

    try {
      let response;
      let userRef;

      if (isSignUp) {
        const usersSnapshot = await fetch(`${firebaseUrl}/users.json`);
        const usersData = await usersSnapshot.json();

        if (usersData) {
            for (let userId in usersData) {
              if (usersData[userId].email === formData.email) {
                setTimeout(() => {
                    toggleForm(); 
                  }, 3000);
                throw new Error("Account already registered.Please log in.");
                
                
                 
              }
            }
          }

        if (!formData.name || !formData.email || !formData.password) {
          throw new Error("All fields are required for sign up.");
        }

        response = await fetch(`${firebaseUrl}/users.json`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: formData.name,
            email: formData.email,
            password: formData.password,
          }),
        });

        const data = await response.json();
        if (!response.ok) {
          throw new Error(data.message || "An error occurred. Please try again.");
        }

        alert("Account created successfully!");

        toggleForm();
      } else {
        

        if (!formData.email || !formData.password) {
          throw new Error("Email and password are required for sign in.");
        }

       
        const usersSnapshot = await fetch(`${firebaseUrl}/users.json`);
        const usersData = await usersSnapshot.json();

        if (!usersData) {
          throw new Error("No users found. Please sign up.");
        }

        // Find the user by matching the email
        let user = null;
        for (let userId in usersData) {
          if (usersData[userId].email === formData.email) {
            user = usersData[userId];
            break;
          }
        }

        if (!user) {
          throw new Error("User not found. Please sign up.");
        }

        if (user.password !== formData.password) {
          throw new Error("Incorrect password.");
        }

        alert("Login successful! Redirecting...");
        window.location.href = "/dashboard";
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`container ${isSignUp ? "right-panel-active" : ""}`}>
      {/* Sign Up Form */}
      <div className="form-container sign-up-container">
        <form id="signupForm" onSubmit={handleSubmit}>
          <h1>Create Account</h1>
          <div className="social-container">
             {/*<a href="#" className="social"> <img src={googleImage} alt="Google SignUp" /> </a>*/}
          </div>
          <span>or use your email for registration</span>
          {isSignUp && (
            <input
              type="text"
              id="name"
              placeholder="Enter your name"
              value={formData.name}
              onChange={handleInputChange}
              required
            />
          )}
          <input
            type="email"
            id="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleInputChange}
            required
          />
          <input
            type="password"
            id="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleInputChange}
            required
          />
          <button type="submit" disabled={loading}>
            {loading ? "Loading..." : "Sign Up"}
          </button>
          {error && <div className="error">{error}</div>}
        </form>
      </div>

      {/* Sign In Form */}
      <div className="form-container sign-in-container">
        <form id="loginForm" onSubmit={handleSubmit}>
          <h1>Sign in</h1>
          <div className="social-container">
            {/*<a href="#" className="social"> <img src={googleImage} alt="Google SignUp" /> </a>*/}
            
          </div>
          <span>or use your account</span>
          <input
            type="email"
            id="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleInputChange}
            required
          />
          <input
            type="password"
            id="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleInputChange}
            required
          />
          <a href="#">Forgot your password?</a>
          <button type="submit" disabled={loading}>
            {loading ? "Loading..." : "Sign In"}
          </button>
          {error && <div className="error">{error}</div>}
        </form>
      </div>

      {/* Overlay Panel for toggling between Sign Up and Sign In */}
      <div className="overlay-container">
        <div className="overlay">
          <div className="overlay-panel overlay-left">
            <h1>Welcome Back!</h1>
            <p>Let’s pick up right where we left off. Log in to continue your experience.</p>
            <button className="ghost" onClick={toggleForm}>
              Sign In
            </button>
          </div>
          <div className="overlay-panel overlay-right">
            <h1>Welcome Aboard!</h1>
            <p>Join us today and explore!</p>
            <button className="ghost" onClick={toggleForm}>
              Sign Up
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
