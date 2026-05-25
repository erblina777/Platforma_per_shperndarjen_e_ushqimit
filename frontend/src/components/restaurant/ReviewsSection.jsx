import { useEffect, useState } from "react";
import axios from "axios";
import useRestaurant from "../../hooks/useRestaurant";

export default function ReviewsSection({ restaurant }) {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadReviews = async () => {
    if (!restaurant?.id) return;

    try {
      const res = await axios.get(
        `http://localhost:3000/reviews/restaurant/${restaurant.id}`
      );
      console.log(res.data);
      setReviews(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (restaurant?.id) {
      loadReviews();
    }
  }, [restaurant?.id]);

  if (!restaurant) return <p>Loading...</p>;

  return (
    <section className="dashboard-section">
      <h2>Reviews</h2>

      {reviews.length === 0 ? (
        <p>No reviews yet</p>
      ) : (
        reviews.map((review) => (
          <div className="review-card" key={review.id}>
            <p>{"⭐".repeat(review.vleresimi)}</p>
            <p>{review.komenti}</p>
          </div>
        ))
      )}
    </section>
  );
}