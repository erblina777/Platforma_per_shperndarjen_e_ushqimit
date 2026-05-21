import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";
import "../login-register.css";

function Login() {
  const [formData, setFormData] =
    useState({
      email: "",
      password: "",
    });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]:
        e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res =
        await axios.post(
          "http://localhost:3000/auth/login",
          formData
        );

      localStorage.setItem(
        "token",
        res.data.token
      );

      alert("Login successful");
    } catch (err) {
      console.log(err);

      alert("Gabim");
    }
  };

  return (
  <div className="auth-container">

    <div className="auth-box">

      <h1 className="auth-title">
        Login
      </h1>

      <form
        className="auth-form"
        onSubmit={handleSubmit}
      >

        <input
          type="email"
          name="email"
          placeholder="Email"
          onChange={handleChange}
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
        />

        <button
          className="auth-btn"
          type="submit"
        >
          Login
        </button>

      </form>

      <div className="auth-footer">
        Nuk keni llogari?{" "}

        <Link to="/register">
          Regjistrohu.
        </Link>
      </div>

    </div>

  </div>
);
}

export default Login;