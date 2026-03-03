import React, { useState } from "react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Login Data:", { email, password });
  };

  return (
    <>
      <style>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
          font-family: "Times New Roman", Times, serif;
        }

        body {
          background-color: #0f0f0f;
        }

        .container {
          height: 100vh;
          display: flex;
          justify-content: center;
          align-items: center;
          background: linear-gradient(135deg, #141e30, #243b55);
        }

        .card {
          width: 400px;
          padding: 50px;
          background: #1a1a1a;
          border-radius: 15px;
          box-shadow: 0 0 25px rgba(0, 0, 0, 0.8);
          text-align: center;
          color: white;
          transition: 0.4s ease;
        }

        .card:hover {
          transform: translateY(-5px);
          box-shadow: 0 0 35px rgba(0, 0, 0, 1);
        }

        h2 {
          margin-bottom: 10px;
          font-size: 28px;
          letter-spacing: 1px;
        }

        p {
          margin-bottom: 30px;
          color: #aaa;
          font-size: 14px;
        }

        .input-group {
          margin-bottom: 25px;
          text-align: left;
        }

        label {
          display: block;
          margin-bottom: 5px;
          font-size: 14px;
          color: #ccc;
        }

        input {
          width: 100%;
          padding: 12px;
          border-radius: 8px;
          border: 1px solid #333;
          background: #111;
          color: white;
          font-size: 15px;
          transition: 0.3s;
        }

        input:focus {
          border-color: #00bfff;
          outline: none;
          box-shadow: 0 0 8px #00bfff;
        }

        button {
          width: 100%;
          padding: 12px;
          border-radius: 25px;
          border: none;
          background: #00bfff;
          color: black;
          font-size: 16px;
          font-weight: bold;
          cursor: pointer;
          transition: 0.3s ease;
        }

        button:hover {
          background: white;
          color: black;
          transform: scale(1.05);
        }

        .links {
          margin-top: 20px;
          display: flex;
          justify-content: space-between;
          font-size: 13px;
        }

        .links a {
          color: #00bfff;
          text-decoration: none;
        }

        .links a:hover {
          text-decoration: underline;
        }
      `}</style>

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

            <button type="submit">Login</button>
          </form>

          <div className="links">
            <a href="#">Forgot Password?</a>
            <a href="#">Create Account</a>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;