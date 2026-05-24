import { useEffect,useState } from "react";
import axios from "axios";

export default function ReviewsSection() {

  const [reviews,setReviews] = useState([]);

  useEffect(() => {

    axios
      .get("http://localhost:3000/reviews")
      .then(res => setReviews(res.data));

  },[]);

  return (

    <section className="dashboard-section">

      <h2>Reviews</h2>

      <div className="table-wrapper">

        <table className="admin-table">

          <thead>

            <tr>
              <th>ID</th>
              <th>User</th>
              <th>Restaurant</th>
              <th>Rating</th>
              <th>Comment</th>
            </tr>

          </thead>

          <tbody>

            {reviews.map(review => (

              <tr key={review.id}>

                <td>{review.id}</td>

                <td>{review.user_id}</td>

                <td>{review.restaurant_id}</td>

                <td>
                  {"⭐".repeat(review.vleresimi)}
                </td>

                <td>{review.komenti}</td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </section>
  );
}