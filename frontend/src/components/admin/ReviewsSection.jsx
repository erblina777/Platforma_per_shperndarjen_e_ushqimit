import { useEffect, useState } from "react";
import axios from "axios";

export default function ReviewsSection() {
  const [reviews, setReviews] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingReview, setEditingReview] = useState(null);

  const [formData, setFormData] = useState({
    order_id: "",
    user_id: "",
    restaurant_id: "",
    vleresimi: "",
    komenti: ""
  });

  useEffect(() => {
    loadReviews();
  }, []);

  const loadReviews = () => {
    axios
      .get("http://localhost:3000/reviews")
      .then((res) => setReviews(res.data))
      .catch((err) => console.log(err));
  };

  const openInsert = () => {
    setEditingReview(null);

    setFormData({
      order_id: "",
      user_id: "",
      restaurant_id: "",
      vleresimi: "",
      komenti: ""
    });

    setShowForm(true);
  };

  const openEdit = (review) => {
    setEditingReview(review);

    setFormData({
      order_id: review.order_id || "",
      user_id: review.user_id || "",
      restaurant_id: review.restaurant_id || "",
      vleresimi: review.vleresimi || "",
      komenti: review.komenti || ""
    });

    setShowForm(true);
  };

  const handleSave = async () => {
    try {
      if (editingReview) {
        await axios.put(
          `http://localhost:3000/reviews/${editingReview.id}`,
          formData
        );
      } else {
        await axios.post(
          "http://localhost:3000/reviews",
          formData
        );
      }

      setShowForm(false);
      loadReviews();
    } catch (err) {
      console.log(err.response?.data || err.message);
    }
  };

  const deleteReview = async (id) => {
    await axios.delete(`http://localhost:3000/reviews/${id}`);
    loadReviews();
  };

  return (
    <section className="dashboard-section">
      <h2>Reviews</h2>

      <button onClick={openInsert}>
        + Add Review
      </button>

      <div className="table-wrapper">
        <table className="admin-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>User</th>
              <th>Restaurant</th>
              <th>Rating</th>
              <th>Comment</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {reviews.map((review) => (
              <tr key={review.id}>
                <td>{review.id}</td>
                <td>{review.user_id}</td>
                <td>{review.restaurant_id}</td>
                <td>{"⭐".repeat(review.vleresimi)}</td>
                <td>{review.komenti}</td>

                <td>
                  <button onClick={() => openEdit(review)}>
                    Edit
                  </button>

                  <button
                    className="delete-btn"
                    onClick={() => deleteReview(review.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showForm && (
        <div>
          <h3>
            {editingReview ? "Edit Review" : "Add Review"}
          </h3>

          <input
            placeholder="Order ID"
            value={formData.order_id}
            onChange={(e) =>
              setFormData({ ...formData, order_id: e.target.value })
            }
          />

          <input
            placeholder="User ID"
            value={formData.user_id}
            onChange={(e) =>
              setFormData({ ...formData, user_id: e.target.value })
            }
          />

          <input
            placeholder="Restaurant ID"
            value={formData.restaurant_id}
            onChange={(e) =>
              setFormData({ ...formData, restaurant_id: e.target.value })
            }
          />

          <input
            placeholder="Rating (1-5)"
            value={formData.vleresimi}
            onChange={(e) =>
              setFormData({ ...formData, vleresimi: e.target.value })
            }
          />

          <textarea
            placeholder="Comment"
            value={formData.komenti}
            onChange={(e) =>
              setFormData({ ...formData, komenti: e.target.value })
            }
          />

          <button onClick={handleSave}>
            Save
          </button>

          <button onClick={() => setShowForm(false)}>
            Cancel
          </button>
        </div>
      )}
    </section>
  );
}