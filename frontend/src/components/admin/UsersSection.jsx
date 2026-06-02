import { useEffect, useState } from "react";
import axios from "axios";

export default function UsersSection() {
  const [users, setUsers] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingUser, setEditingUser] = useState(null);

  const [formData, setFormData] = useState({
    emri: "",
    mbiemri: "",
    email: "",
    phone_number: "",
    password: ""
  });

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = () => {
    axios
      .get("http://localhost:3000/users")
      .then(res => setUsers(res.data))
      .catch(err => console.log(err));
  };

  const openInsert = () => {
    setEditingUser(null);

    setFormData({
      emri: "",
      mbiemri: "",
      email: "",
      phone_number: "",
      password: ""
    });

    setShowForm(true);
  };

  const openEdit = (user) => {
    setEditingUser(user);

    setFormData({
      emri: user.emri || "",
      mbiemri: user.mbiemri || "",
      email: user.email || "",
      phone_number: user.phone_number || "",
      password: ""
    });

    setShowForm(true);
  };

  const handleSave = async () => {
    try {
      if (editingUser) {
        await axios.put(
          `http://localhost:3000/users/${editingUser.id}`,
          formData
        );
      } else {
        await axios.post(
          "http://localhost:3000/users",
          formData
        );
      }

      setShowForm(false);
      loadUsers();
    } catch (err) {
      console.log(err.response?.data || err.message);
    }
  };

  const deleteUser = async (id) => {
    await axios.delete(`http://localhost:3000/users/${id}`);
    loadUsers();
  };

  return (
    <section className="dashboard-section">
      <h2>Users</h2>

      <button onClick={openInsert}>+ Add User</button>

      <div className="table-wrapper">
        <table className="admin-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {users.map(user => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.emri} {user.mbiemri}</td>
                <td>{user.email}</td>
                <td>{user.phone_number}</td>

                <td>
                  <button onClick={() => openEdit(user)}>
                    Edit
                  </button>

                  <button
                    className="delete-btn"
                    onClick={() => deleteUser(user.id)}
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
        <div className="form-box">
          <h3>
            {editingUser ? "Edit User" : "Add User"}
          </h3>

          <input
            placeholder="Emri"
            value={formData.emri}
            onChange={(e) =>
              setFormData({ ...formData, emri: e.target.value })
            }
          />

          <input
            placeholder="Mbiemri"
            value={formData.mbiemri}
            onChange={(e) =>
              setFormData({ ...formData, mbiemri: e.target.value })
            }
          />

          <input
            placeholder="Email"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
          />

          <input
            placeholder="Phone"
            value={formData.phone_number}
            onChange={(e) =>
              setFormData({ ...formData, phone_number: e.target.value })
            }
          />

          <input
            type="password"
            placeholder="Password"
            value={formData.password}
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
          />

          <div className="action-buttons">
            <button onClick={handleSave} className="edit-btn">
              Save
            </button>

            <button onClick={() => setShowForm(false)} className="delete-btn">
              Cancel
            </button>
          </div>
        </div>
      )}
    </section>
  );
}