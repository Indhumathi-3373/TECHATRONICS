import React, { useState } from "react";
import "../styles/register.css";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Registered Successfully!");
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

            <button type="submit" className="register-btn">
              Register
            </button>
          </form>

          <p className="signin">
            Already have an account? <a href="/login">Sign In</a>
          </p>
        </div>
      </main>
    </div>
  );
};

export default Register;
