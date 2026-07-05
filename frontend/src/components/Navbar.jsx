import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  const handleDashboard = () => {
    switch (user.role?.toLowerCase()) {
      case "admin":
        navigate("/admin-dashboard");
        break;

      case "owner":
        navigate("/restaurant-dashboard");
        break;

      case "driver":
        navigate("/driver-dashboard");
        break;

      default:
        break;
    }
  };
  const handleProfile = () => {
    navigate("/profil");
  };

  return (
    <header className="navbar">
      <div className="container navbar-inner">
        <a href="/">
          <img className="logo" src="/library/logo.png" alt="Foodly Logo" />
        </a>
        <nav className={`nav-links ${open ? "open" : ""}`}>
          <a href="restaurants">Restaurants</a>
          <a href="/menu-items">Menu</a>
        </nav>

        <div className="nav-right">
          {!user ? (
            <Link to="/login" className="login-btn">
              Login
            </Link>
          ) : (
            <>
              <button className="profile-btn" onClick={handleProfile}>
                <img src="/library/profile.png" alt="Profile" />
              </button>
              <button className="cart-btn" onClick={() => navigate("/cart")}>
                <img src="/library/cart.png" alt="Cart" />
              </button>
              {user?.role === "customer" && (
                <button
                  className="add-restaurant-btn"
                  onClick={() => navigate("/register-restaurant")}
                >
                  <img src="/library/registerrestaurant.png" alt="Register Restaurant" />
                </button>
              )}

              {user.role !== "customer" && (
                <button className="dashboard-btn" onClick={handleDashboard}>
                  <img src="/library/dashboard.png" alt="Dashboard" />
                </button>
              )}
            </>
          )}

          <button className="menu-btn" onClick={() => setOpen(!open)}>
            <img src="/library/menu.png" alt="Menu" />
          </button>
        </div>
      </div>
    </header>
  );
}