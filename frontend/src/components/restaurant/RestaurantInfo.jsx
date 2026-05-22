import { useEffect, useState } from "react";
import axios from "axios";

export default function RestaurantInfo() {

  const [restaurant, setRestaurant] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:3000/restaurants/1")
      .then((res) => setRestaurant(res.data))
      .catch(console.error);
  }, []);

  if (!restaurant) return null;

  return (
    <section className="dashboard-section">

      <h2>Restaurant Information</h2>

      <div className="restaurant-box">

        <img
          src={`/images/restaurants/${restaurant.logo}`}
          alt={restaurant.emertimi}
        />

        <div>

          <h3>{restaurant.emertimi}</h3>

          <p>{restaurant.adresa}</p>

          <p>
            {restaurant.orari_hapjes}
            -
            {restaurant.orari_mbylljes}
          </p>

          <span className="status-badge">
            {restaurant.status}
          </span>

        </div>

      </div>

    </section>
  );
}