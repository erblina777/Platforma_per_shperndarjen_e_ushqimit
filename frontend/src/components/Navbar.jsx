import { useState } from "react";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="navbar">
      <div className="container navbar-inner">
        <a href="/">
          <img className="logo" src="/library/logo.png" alt="Foodly Logo" />
        </a>
        <nav className={`nav-links ${open ? "open" : ""}`}>
          <a href="restaurants">Restaurants</a>
          <a href="/menu-items">Menu</a>
          <a href="#reviews">Reviews</a>
        </nav>

        <button className="menu-btn" onClick={() => setOpen(!open)}>
          ☰
        </button>
      </div>
    </header>
  );
}