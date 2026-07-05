import { useEffect, useState } from "react";
import axios from "axios";

export default function RestaurantsSection() {
  const [restaurants, setRestaurants] = useState([]);
  const [users, setUsers] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState(null);
  const [logo, setLogo] = useState(null);
  const [formData, setFormData] = useState({
    user_id: "",
    emertimi: "",
    pershkrimi: "",
    adresa: "",
    qyteti: "",
    telefoni: "",
    email: "",
    logo: "",
    orari_hapjes: "",
    orari_mbylljes: "",
    vleresimi: 0,
    status: "active"
  });

  useEffect(() => {
    loadRestaurants();
    loadUsers();
  }, []);

  const loadRestaurants = () => {
    axios
      .get("http://localhost:3000/restaurants")
      .then((res) => setRestaurants(res.data))
      .catch((err) => console.log(err));
  };

  const loadUsers = () => {
    axios
      .get("http://localhost:3000/users")
      .then((res) => setUsers(res.data))
      .catch((err) => console.log(err));
  };

  const openInsert = () => {
    setEditing(null);

    setFormData({
      user_id: "",
      emertimi: "",
      pershkrimi: "",
      adresa: "",
      qyteti: "",
      telefoni: "",
      email: "",
      logo: "",
      orari_hapjes: "",
      orari_mbylljes: "",
      vleresimi: 0,
      status: "active"
    });

    setShowForm(true);
  };

  const openEdit = (r) => {
    setEditing(r);

    setFormData({
      user_id: r.user_id || "",
      emertimi: r.emertimi || "",
      pershkrimi: r.pershkrimi || "",
      adresa: r.adresa || "",
      qyteti: r.qyteti || "",
      telefoni: r.telefoni || "",
      email: r.email || "",
      logo: r.logo || "",
      orari_hapjes: r.orari_hapjes || "",
      orari_mbylljes: r.orari_mbylljes || "",
      vleresimi: r.vleresimi || 0,
      status: r.status || "active"
    });

    setShowForm(true);
  };

  const handleSave = async () => {
    try {
      const data = new FormData();

      Object.keys(formData).forEach((key) => {
        data.append(key, formData[key]);
      });

      if (logo) {
        data.append("logo", logo);
      }

      if (editing) {
        await axios.put(
          `http://localhost:3000/restaurants/${editing.id}`,
          data
        );
      } else {
        await axios.post(
          "http://localhost:3000/restaurants",
          data
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
      {showForm && (
        <div className="form-box">
          <h3>
            {editing ? "Edit Restaurant" : "Add Restaurant"}
          </h3>

          <label>Owner</label>
          <select
            value={formData.user_id}
            onChange={(e) =>
              setFormData({
                ...formData,
                user_id: e.target.value
              })
            }
          >
            <option value="">Select Owner</option>

            {users.map((u) => (
              <option key={u.id} value={u.id}>
                {u.emri} {u.mbiemri}
              </option>
            ))}
          </select>

          <input
            placeholder="Restaurant Name"
            value={formData.emertimi}
            onChange={(e)=>
                setFormData({
                    ...formData,
                    emertimi:e.target.value
                })
            }
          />

          <textarea
            placeholder="Description"
            value={formData.pershkrimi}
            onChange={(e)=>
                setFormData({
                    ...formData,
                    pershkrimi:e.target.value
                })
            }
          />

          <input
            placeholder="Address"
            value={formData.adresa}
            onChange={(e)=>
                setFormData({
                    ...formData,
                    adresa:e.target.value
                })
            }
          />

          <input
            placeholder="City"
            value={formData.qyteti}
            onChange={(e)=>
                setFormData({
                    ...formData,
                    qyteti:e.target.value
                })
            }
          />

          <input
            placeholder="Phone"
            value={formData.telefoni}
            onChange={(e)=>
                setFormData({
                    ...formData,
                    telefoni:e.target.value
                })
            }
          />

          <input
            type="email"
            placeholder="Restaurant Email"
            value={formData.email}
            onChange={(e)=>
                setFormData({
                    ...formData,
                    email:e.target.value
                })
            }
          />

          <input
            type="file"
            onChange={(e)=>{
                setLogo(e.target.files[0]);
            }}
          />

          <input
            type="time"
            value={formData.orari_hapjes}
            onChange={(e)=>
                setFormData({
                    ...formData,
                    orari_hapjes:e.target.value
                })
            }
          />

          <input
            type="time"
            value={formData.orari_mbylljes}
            onChange={(e)=>
                setFormData({
                    ...formData,
                    orari_mbylljes:e.target.value
                })
            }
          />

          <label>Status</label>
          <select
            value={formData.status}
            onChange={(e) =>
              setFormData({
                ...formData,
                status: e.target.value,
              })
            }
          >
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>

          <div>
            <button onClick={handleSave}>Save</button>
            <button onClick={() => setShowForm(false)}>
              Cancel
            </button>
          </div>
        </div>
      )}
      <div className="table-wrapper">
        <table className="admin-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Logo</th>
              <th>Restaurant</th>
              <th>Owner</th>
              <th>City</th>
              <th>Phone</th>
              <th>Email</th>
              <th>Working Hours</th>
              <th>Rating</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {restaurants.map((r) => (
              <tr key={r.id}>
                <td>{r.id}</td>

                <td>
                  {r.logo ? (
                    <img
                      src={`http://localhost:3000/uploads/${r.logo}`}
                      alt={r.emertimi}
                      style={{
                        width: "55px",
                        height: "55px",
                        objectFit: "cover",
                        borderRadius: "8px"
                      }}
                    />
                  ) : (
                    "No Logo"
                  )}
                </td>

                <td>{r.emertimi}</td>

                <td>
                  {r.owner || "-"}
                  <br />
                  <small>{r.owner_email || ""}</small>
                </td>

                <td>{r.qyteti}</td>

                <td>{r.telefoni}</td>

                <td>{r.email}</td>

                <td>
                  {r.orari_hapjes} - {r.orari_mbylljes}
                </td>

                <td>
                  ⭐ {r.vleresimi ?? 0}
                </td>

                <td>
                  <span
                    className={
                      r.status === "active"
                        ? "status-active"
                        : "status-inactive"
                    }
                  >
                    {r.status}
                  </span>
                </td>

                <td>
                  <button
                    onClick={() => openEdit(r)}
                  >
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
    </section>
  );
}