import { useEffect, useState } from "react";
import axios from "axios";

export default function UsersSection() {

  const [users, setUsers] = useState([]);

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = () => {
    axios
      .get("http://localhost:3000/users")
      .then(res => setUsers(res.data))
      .catch(err => console.log(err));
  };

  const deleteUser = async (id) => {
    try {

      const res = await axios.delete(
        `http://localhost:3000/users/${id}`
      );

      alert(res.data.message);

      loadUsers();

    } catch (err) {

      console.log("DELETE ERROR:", err);

      console.log(
        "SERVER RESPONSE:",
        err.response?.data
      );

      alert(
        err.response?.data?.message ||
        "Delete failed - shiko console"
      );
    }
  };

  return (
    <section className="dashboard-section">

      <h2>Users</h2>

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

                <td>
                  {user.emri} {user.mbiemri}
                </td>

                <td>{user.email}</td>

                <td>{user.phone_number}</td>

                <td>

                  <div className="action-buttons">

                    <button
                      className="delete-btn"
                      onClick={() => deleteUser(user.id)}
                    >
                      Delete
                    </button>

                  </div>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </section>
  );
}