import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../login-register.css";

function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "http://localhost:3000/auth/login",
        formData
      );

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify({...res.data.user, role: res.data.user.role?.toLowerCase()}));

      alert("Login successful");
      const role = res.data.user?.role?.trim()?.toLowerCase();
      const user = res.data.user;
      if (role === "owner") {
        const restaurantRes = await axios.get(`http://localhost:3000/restaurants/user/${user.id}`);
        localStorage.setItem("restaurant", JSON.stringify(restaurantRes.data));
        navigate("/restaurant-dashboard");
      } 
      else if (role === "admin") {
        navigate("/admin-dashboard");
      } 
      else if (role === "driver") {
        navigate("/driver-dashboard");
      } 
      else {
        navigate("/");
      }

    } catch (err) {
      console.log(err);
      alert("Gabim login");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h1 className="auth-title">Login</h1>

        <form className="auth-form" onSubmit={handleSubmit}>
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

          <button className="auth-btn" type="submit">
            Login
          </button>
        </form>

        <div className="auth-footer">
          Nuk keni llogari?{" "}
          <Link to="/register">Regjistrohu.</Link>
        </div>
      </div>
    </div>
  );
}

export default Login;