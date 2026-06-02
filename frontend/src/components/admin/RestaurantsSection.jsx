import { useEffect, useState } from "react";
import axios from "axios";

export default function RestaurantsSection() {
  const [restaurants, setRestaurants] = useState([]);

  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState(null);

  const [formData, setFormData] = useState({
    emertimi: "",
    pershkrimi: "",
    adresa: "",
    qyteti: "",
    status: "active"
  });

  useEffect(() => {
    loadRestaurants();
  }, []);

  const loadRestaurants = () => {
    axios
      .get("http://localhost:3000/restaurants")
      .then((res) => setRestaurants(res.data))
      .catch((err) => console.log(err));
  };

  const openInsert = () => {
    setEditing(null);

    setFormData({
      emertimi: "",
      pershkrimi: "",
      adresa: "",
      qyteti: "",
      status: "active"
    });

    setShowForm(true);
  };

  const openEdit = (r) => {
    setEditing(r);

    setFormData({
      emertimi: r.emertimi || "",
      pershkrimi: r.pershkrimi || "",
      adresa: r.adresa || "",
      qyteti: r.qyteti || "",
      status: r.status || "active"
    });

    setShowForm(true);
  };

  const handleSave = async () => {
    try {
      if (editing) {
        await axios.put(
          `http://localhost:3000/restaurants/${editing.id}`,
          formData
        );
      } else {
        await axios.post(
          "http://localhost:3000/restaurants",
          formData
        );
      }

      setShowForm(false);
      loadRestaurants();
    } catch (err) {
      console.log(err.response?.data || err.message);
    }
  };

  const deleteRestaurant = async (id) => {
    await axios.delete(`http://localhost:3000/restaurants/${id}`);
    loadRestaurants();
  };

  return (
    <section className="dashboard-section">
      <h2>Restaurants</h2>

      <button onClick={openInsert}>+ Add Restaurant</button>

      <div className="table-wrapper">
        <table className="admin-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>City</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {restaurants.map((r) => (
              <tr key={r.id}>
                <td>{r.id}</td>
                <td>{r.emertimi}</td>
                <td>{r.qyteti}</td>
                <td>{r.status || "active"}</td>

                <td>
                  <button onClick={() => openEdit(r)}>
                    Edit
                  </button>

                  <button
                    className="delete-btn"
                    onClick={() => deleteRestaurant(r.id)}
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
            {editing ? "Edit Restaurant" : "Add Restaurant"}
          </h3>

          <input
            placeholder="Emertimi"
            value={formData.emertimi}
            onChange={(e) =>
              setFormData({ ...formData, emertimi: e.target.value })
            }
          />

          <input
            placeholder="Pershkrimi"
            value={formData.pershkrimi}
            onChange={(e) =>
              setFormData({ ...formData, pershkrimi: e.target.value })
            }
          />

          <input
            placeholder="Adresa"
            value={formData.adresa}
            onChange={(e) =>
              setFormData({ ...formData, adresa: e.target.value })
            }
          />

          <input
            placeholder="Qyteti"
            value={formData.qyteti}
            onChange={(e) =>
              setFormData({ ...formData, qyteti: e.target.value })
            }
          />

          <input
            placeholder="Status"
            value={formData.status}
            onChange={(e) =>
              setFormData({ ...formData, status: e.target.value })
            }
          />

          <div>
            <button onClick={handleSave}>Save</button>
            <button onClick={() => setShowForm(false)}>
              Cancel
            </button>
          </div>
        </div>
      )}
    </section>
  );
}