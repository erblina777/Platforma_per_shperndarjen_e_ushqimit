import { useState } from "react";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="navbar">
      <div className="container navbar-inner">
        <img className="logo" src="/library/logo.png" alt="Foodly Logo" />

        <nav className={`nav-links ${open ? "open" : ""}`}>
          <a href="#restaurants">Restaurants</a>
          <a href="#menu">Menu</a>
          <a href="#promotions">Deals</a>
          <a href="#reviews">Reviews</a>
        </nav>

        <button className="menu-btn" onClick={() => setOpen(!open)}>
          ☰
        </button>
      </div>
    </header>
  );
}