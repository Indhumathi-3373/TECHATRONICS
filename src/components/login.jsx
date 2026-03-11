import React, { useState } from "react";

import "../styles/login.css";
import { postJson } from "../lib/api";


const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    setIsSubmitting(true);

    try {
      const response = await postJson("/api/auth/login", { email, password });
      localStorage.setItem("authToken", response.token);
      localStorage.setItem(
        "authUser",
        JSON.stringify({
          id: response.userId,
          email: response.email,
        })
      );
      window.location.href = "/";
    } catch (error) {
      setErrorMessage(error.message || "Login failed.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="login-page">
      <header className="login-topbar">
        <a className="login-brand" href="/">
          TECHATRONICS
        </a>
        <a className="login-nav-link" href="/register">
          Sign Up
        </a>
      </header>

      <main className="login-main">
        <div className="login-card">
          <p className="login-kicker">SMART ELECTRONICS STORE</p>
          <h2>Welcome Back</h2>
          <p className="login-subtitle">Sign in to continue shopping and managing orders.</p>

          <form onSubmit={handleSubmit}>
            <input
              type="email"
              placeholder="Enter Email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <input
              type="password"
              placeholder="Enter Password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <div className="login-forgot">
              <a href="#">Forgot Password?</a>
            </div>


            <button type="submit" className="login-btn">
              Sign In
            </button>
          </form>

          <p className="login-signup">
            New user? <a href="/register">Create Account</a>
          </p>

        </div>
      </main>
    </div>
  );
};

export default Login;
