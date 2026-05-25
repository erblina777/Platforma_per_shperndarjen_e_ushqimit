import { useEffect, useState } from "react";
import useRestaurant from "../../hooks/useRestaurant";

export default function RestaurantInfo({ restaurant }) {

  if (!restaurant) return <p>Loading...</p>;

  return (
    <section className="dashboard-section">
      <h2>Restaurant Information</h2>

      <div className="restaurant-box">
        <img
          src={`http://localhost:3000/uploads/${restaurant.logo}`}
          alt={restaurant.emertimi}
        />

        <div>
          <h3>{restaurant.emertimi}</h3>
          <p>{restaurant.adresa}</p>
          <p>
            {restaurant.orari_hapjes} - {restaurant.orari_mbylljes}
          </p>

          <span>{restaurant.status}</span>
        </div>
      </div>
    </section>
  );
}