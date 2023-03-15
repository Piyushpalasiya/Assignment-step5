import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import './Login.css'

const Login = () => {
  const [Email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const naviagte = useNavigate();

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (Email === "admin@gmail.com" && password === "Zcon@123") {
      // Redirect to dashboard page upon successful login
      naviagte("/dashboard");
    } else {
      setErrorMessage("Invalid E-mail or password");
    }
  };

  return (
    <div className="login-container">
    <form className="login-from" onSubmit={handleSubmit}>
      <h1>Login</h1>
      {errorMessage && <div className="errorMessage">{errorMessage}</div>}

      <div className="form-group">
        <label htmlFor="Email">E-mail:</label>
        <input
          type="text"
          id="Email"
          onChange={handleEmailChange}
          name= "Email"
          placeholder="E-mail"
          required
        />
      </div>
      
      <div className="form-group">
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          onChange={handlePasswordChange}
          name="password"
          placeholder="Enter password"
          required
        />
      </div>
      <button type="submit" className="login-btn">Login</button>
    </form>
    </div>
  );
};

export default Login;
