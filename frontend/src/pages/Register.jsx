import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";

function Register() {
  const [formData, setFormData] =
    useState({
      emri: "",
      mbiemri: "",
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
      await axios.post(
        "http://localhost:3000/auth/register",
        formData
      );

      alert("Register successful");
    } catch (err) {
      console.log(err);

      alert("Gabim");
    }
  };

  return (
    <div>
      <h1>Register</h1>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="emri"
          placeholder="Emri"
          onChange={handleChange}
        />

        <input
          type="text"
          name="mbiemri"
          placeholder="Mbiemri"
          onChange={handleChange}
        />

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
          Register
        </button>
      </form>

      <Link to="/">
        Login
      </Link>
    </div>
  );
}

export default Register;