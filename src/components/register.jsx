import React, { useState } from "react";
import "../styles/register.css";
import { postJson } from "../lib/api";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");
    setIsSubmitting(true);

    try {
      const response = await postJson("/api/auth/register", { email, password });
      setSuccessMessage(response?.message || "Registered successfully.");
      setEmail("");
      setPassword("");
      setTimeout(() => {
        window.location.href = "/login";
      }, 1000);
    } catch (error) {
      setErrorMessage(error.message || "Registration failed.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="register-page">
      <header className="register-topbar">
        <a className="register-brand" href="/">
          TECHATRONICS
        </a>
        <a className="register-nav-link" href="/login">
          Sign In
        </a>
      </header>

      <main className="register-main">
        <div className="register-card">
          <p className="register-kicker">SMART ELECTRONICS STORE</p>
          <h2>Create Account</h2>
          <p className="register-subtitle">Join TECHATRONICS and start building faster.</p>

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

            <div className="forgot">
              <a href="#">Forgot Password?</a>
            </div>

            <button type="submit" className="register-btn" disabled={isSubmitting}>
              {isSubmitting ? "Registering..." : "Register"}
            </button>
          </form>

          {errorMessage && (
            <p style={{ color: "#ffcccc", marginTop: "10px", fontSize: "14px" }}>{errorMessage}</p>
          )}
          {successMessage && (
            <p style={{ color: "#9ff4ba", marginTop: "10px", fontSize: "14px" }}>{successMessage}</p>
          )}

          <p className="signin">
            Already have an account? <a href="/login">Sign In</a>
          </p>
        </div>
      </main>
    </div>
  );
};

export default Register;
