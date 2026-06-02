import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "../styles/RestaurantDetails.css";

export default function RestaurantDetailsPage() {
  const { id } = useParams();

  const [restaurant, setRestaurant] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`http://localhost:3000/restaurants/${id}`)
      .then((res) => {
        setRestaurant(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return <h2>Loading...</h2>;
  }

  if (!restaurant) {
    return <h2>Restaurant not found</h2>;
  }

  return (
    <section className="restaurant-details">
      <div className="details-card">

        <div className="details-image">
          {restaurant.logo ? (
            <img
              src={`/images/restaurants/${restaurant.logo}`}
              alt={restaurant.emertimi}
            />
          ) : (
            <div className="no-image">No Image</div>
          )}
        </div>

        <div className="details-content">
          <h1>{restaurant.emertimi}</h1>

          <p className="description">
            {restaurant.pershkrimi}
          </p>

          <div className="info">
            <p>
              <strong>📍 Address:</strong>{" "}
              {restaurant.adresa}
            </p>

            <p>
              <strong>🏙️ City:</strong>{" "}
              {restaurant.qyteti}
            </p>

            <p>
              <strong>📞 Phone:</strong>{" "}
              {restaurant.telefoni || "-"}
            </p>

            <p>
              <strong>📧 Email:</strong>{" "}
              {restaurant.email || "-"}
            </p>

            <p>
              <strong>⭐ Rating:</strong>{" "}
              {restaurant.vleresimi || "0"}
            </p>

            <p>
              <strong>🕒 Opening:</strong>{" "}
              {restaurant.orari_hapjes || "-"}
            </p>

            <p>
              <strong>🕘 Closing:</strong>{" "}
              {restaurant.orari_mbylljes || "-"}
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}
