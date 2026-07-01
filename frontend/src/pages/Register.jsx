import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";
import "../login-register.css";

function Register() {
  const [formData, setFormData] =
    useState({
      emri: "",
      mbiemri: "",
      email: "",
      password: "",
      phone_number: ""
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
  <div className="auth-container">

    <div className="auth-box">

      <h1 className="auth-title">
        Register
      </h1>

      <form
        className="auth-form"
        onSubmit={handleSubmit}
      >

        <input
          type="text"
          name="emri"
          placeholder="First Name"
          onChange={handleChange}
        />

        <input
          type="text"
          name="mbiemri"
          placeholder="Last Name"
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
<input
  type="text"
  name="phone_number"
  placeholder="Phone Number"
  onChange={handleChange}
/>
        <button
          className="auth-btn"
          type="submit"
        >
          Register
        </button>

      </form>

      <div className="auth-footer">
        Already have an account?{" "}

        <Link to="/login">
          Login.
        </Link>
      </div>

    </div>

  </div>
);
}

export default Register;