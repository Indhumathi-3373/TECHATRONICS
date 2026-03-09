import React, { useState } from "react";
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
    <>
      <div className="container">
        <div className="card">
          <h2>TECHATRONICS</h2>
          <p>Login to continue shopping</p>

          <form onSubmit={handleSubmit}>
            <div className="input-group">
              <label>Email Address</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="input-group">
              <label>Password</label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Logging in..." : "Login"}
            </button>
          </form>

          {errorMessage && (
            <p style={{ color: "#ff8f8f", marginTop: "12px", fontSize: "14px" }}>{errorMessage}</p>
          )}

          <div className="links">
            <a href="#">Forgot Password?</a>
            <a href="/register">Create Account</a>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
