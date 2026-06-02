import { useEffect, useState } from "react";
import axios from "axios";

export default function DriversSection() {
  const [drivers, setDrivers] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingDriver, setEditingDriver] = useState(null);

  const [formData, setFormData] = useState({
    user_id: "",
    automjeti: "",
    targa: "",
    zona: "",
    statusi: "",
    vleresimi: ""
  });

  useEffect(() => {
    loadDrivers();
  }, []);

  const loadDrivers = () => {
    axios
      .get("http://localhost:3000/drivers")
      .then(res => setDrivers(res.data))
      .catch(err => console.log(err));
  };

  const openInsert = () => {
    setEditingDriver(null);

    setFormData({
      user_id: "",
      automjeti: "",
      targa: "",
      zona: "",
      statusi: "",
      vleresimi: ""
    });

    setShowForm(true);
  };

  const openEdit = (driver) => {
    setEditingDriver(driver);

    setFormData({
      user_id: driver.user_id || "",
      automjeti: driver.automjeti || "",
      targa: driver.targa || "",
      zona: driver.zona || "",
      statusi: driver.statusi || "",
      vleresimi: driver.vleresimi || ""
    });

    setShowForm(true);
  };

  const handleSave = async () => {
    try {

      if (editingDriver) {
        await axios.put(
          `http://localhost:3000/drivers/${editingDriver.id}`,
          formData
        );
      } else {
        await axios.post(
          "http://localhost:3000/drivers",
          formData
        );
      }

      setShowForm(false);
      loadDrivers();

    } catch (err) {
      console.log(err.response?.data || err.message);
    }
  };

  const deleteDriver = async (id) => {
    await axios.delete(`http://localhost:3000/drivers/${id}`);
    loadDrivers();
  };

  return (
    <section className="dashboard-section">

      <h2>Drivers</h2>

      <button onClick={openInsert}>
        + Add Driver
      </button>

      <div className="table-wrapper">

        <table className="admin-table">

          <thead>
            <tr>
              <th>ID</th>
              <th>User ID</th>
              <th>Vehicle</th>
              <th>Plate</th>
              <th>Zone</th>
              <th>Status</th>
              <th>Rating</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>

            {drivers.map(driver => (
              <tr key={driver.id}>

                <td>{driver.id}</td>
                <td>{driver.user_id}</td>
                <td>{driver.automjeti}</td>
                <td>{driver.targa}</td>
                <td>{driver.zona}</td>
                <td>{driver.statusi}</td>
                <td>{driver.vleresimi}</td>

                <td>

                  <button
                    onClick={() => openEdit(driver)}
                  >
                    Edit
                  </button>

                  <button
                    className="delete-btn"
                    onClick={() => deleteDriver(driver.id)}
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
            {editingDriver ? "Edit Driver" : "Add Driver"}
          </h3>

          <input
            placeholder="User ID"
            value={formData.user_id}
            onChange={(e) =>
              setFormData({
                ...formData,
                user_id: e.target.value
              })
            }
          />

          <input
            placeholder="Vehicle"
            value={formData.automjeti}
            onChange={(e) =>
              setFormData({
                ...formData,
                automjeti: e.target.value
              })
            }
          />

          <input
            placeholder="Plate"
            value={formData.targa}
            onChange={(e) =>
              setFormData({
                ...formData,
                targa: e.target.value
              })
            }
          />

          <input
            placeholder="Zone"
            value={formData.zona}
            onChange={(e) =>
              setFormData({
                ...formData,
                zona: e.target.value
              })
            }
          />

          <input
            placeholder="Status"
            value={formData.statusi}
            onChange={(e) =>
              setFormData({
                ...formData,
                statusi: e.target.value
              })
            }
          />

          <input
            placeholder="Rating"
            value={formData.vleresimi}
            onChange={(e) =>
              setFormData({
                ...formData,
                vleresimi: e.target.value
              })
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