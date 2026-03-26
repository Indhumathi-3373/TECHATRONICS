import React, { useState } from "react";
import { useNavigate, Navigate, Link } from "react-router-dom";
import "../styles/login.css";
import { postJson } from "../lib/api";
import { useAuth } from "../context/AuthContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  // If already logged in, redirect to home
  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    setIsSubmitting(true);

    try {
      const response = await postJson("/api/auth/login", { email, password });
      login(response.token, {
        id: response.userId,
        email: response.email,
      });
      navigate("/", { replace: true });
    } catch (error) {
      setErrorMessage(error.message || "Login failed. Please check your credentials.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="login-page">
      <header className="login-topbar">
        <span className="login-brand">TECHATRONICS</span>
        <Link className="login-nav-link" to="/register">
          Sign Up
        </Link>
      </header>

      <main className="login-main">
        <div className="login-card">
          <div className="login-icon-wrap">
            <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#00ffff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
              <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
              <circle cx="12" cy="16" r="1"/>
            </svg>
          </div>
          <p className="login-kicker">SMART ELECTRONICS STORE</p>
          <h2>Welcome Back</h2>
          <p className="login-subtitle">Login to continue shopping.</p>

          <form onSubmit={handleSubmit}>
            <div className="input-group">
              <label htmlFor="login-email">Email Address</label>
              <input
                id="login-email"
                type="email"
                placeholder="Enter your email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="input-group">
              <label htmlFor="login-password">Password</label>
              <input
                id="login-password"
                type="password"
                placeholder="Enter your password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            {errorMessage && (
              <div className="login-error">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10"/>
                  <line x1="12" y1="8" x2="12" y2="12"/>
                  <line x1="12" y1="16" x2="12.01" y2="16"/>
                </svg>
                <span>{errorMessage}</span>
              </div>
            )}

            <button type="submit" className="login-btn" disabled={isSubmitting}>
              {isSubmitting ? (
                <span className="btn-loading">
                  <span className="btn-spinner" />
                  Logging in...
                </span>
              ) : (
                "Login"
              )}
            </button>
          </form>

          <div className="login-links">
            <a href="#">Forgot Password?</a>
            <Link to="/register">Create Account</Link>
          </div>

          <div className="login-divider">
            <span>or</span>
          </div>

          <p className="login-footer-text">
            New to TECHATRONICS? <Link to="/register">Create a free account</Link>
          </p>
        </div>
      </main>
    </div>
  );
};

export default Login;
