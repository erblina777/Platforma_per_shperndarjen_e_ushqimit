import { useEffect, useState } from "react";
import axios from "axios";

export default function ReviewsSection() {

  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3000/reviews")
      .then((res) => setReviews(res.data));
  }, []);

  return (
    <section className="dashboard-section">

      <h2>Reviews</h2>

      {reviews.map(review => (

        <div className="review-card" key={review.id}>

          <p>
            {"⭐".repeat(review.vleresimi)}
          </p>

          <p>{review.komenti}</p>

        </div>

      ))}

    </section>
  );
}