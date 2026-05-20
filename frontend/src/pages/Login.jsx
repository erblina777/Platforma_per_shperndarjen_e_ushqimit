import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";

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
    <div>
      <h1>Login</h1>

      <form onSubmit={handleSubmit}>
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

        <button type="submit">
          Login
        </button>
      </form>

      <Link to="/register">
        Register
      </Link>
    </div>
  );
}

export default Login;