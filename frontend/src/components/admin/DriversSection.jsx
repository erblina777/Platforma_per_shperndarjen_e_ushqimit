import { useEffect,useState } from "react";
import axios from "axios";

export default function DriversSection() {

  const [drivers,setDrivers] = useState([]);

  useEffect(() => {
    loadDrivers();
  },[]);

  const loadDrivers = () => {

    axios
      .get("http://localhost:3000/deliverydrivers")
      .then(res => setDrivers(res.data));
  };

  const deleteDriver = async(id) => {

    await axios.delete(
      `http://localhost:3000/deliverydrivers/${id}`
    );

    loadDrivers();
  };

  return (

    <section className="dashboard-section">

      <h2>Drivers</h2>

      <div className="table-wrapper">

        <table className="admin-table">

          <thead>

            <tr>
              <th>ID</th>
              <th>Vehicle</th>
              <th>Plate</th>
              <th>Zone</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>

          </thead>

          <tbody>

            {drivers.map(driver => (

              <tr key={driver.id}>

                <td>{driver.id}</td>

                <td>{driver.automjeti}</td>

                <td>{driver.targa}</td>

                <td>{driver.zona}</td>

                <td>{driver.statusi}</td>

                <td>

                  <div className="action-buttons">

                    <button
                      className="delete-btn"
                      onClick={() =>
                        deleteDriver(driver.id)
                      }
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