import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../styles/RestaurantPage.css";

export default function RestaurantsPage() {
  const [restaurants, setRestaurants] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:3000/restaurants")
      .then((res) => setRestaurants(res.data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <section className="restaurants-page">
      <h2>Restaurants</h2>

      <div className="restaurants-grid">
        {restaurants.map((r) => (
          <div className="restaurant-card" key={r.id}>
            
            {/* IMAGE */}
            <div className="image-box">
              {r.logo ? (
                <img
                  src={`/images/restaurants/${r.logo}`}
                  alt={r.emertimi}
                />
              ) : (
                <div className="no-image">No Image</div>
              )}
            </div>

            {/* NAME */}
            <h3>{r.emertimi || "Unknown Restaurant"}</h3>

            {/* DESCRIPTION */}
            <p className="desc">
              {r.pershkrimi || "No description available"}
            </p>

            {/* INFO */}
            <div className="info">
              <span>📍 {r.qyteti || "-"}</span>
              <span>📞 {r.telefoni || "-"}</span>
              <span>⭐ {r.vleresimi ?? "0"}</span>
            </div>

            {/* BUTTON */}
            <button onClick={() => navigate("/menu-items")}>
              View Menu
            </button>

          </div>
        ))}
      </div>
    </section>
  );
}