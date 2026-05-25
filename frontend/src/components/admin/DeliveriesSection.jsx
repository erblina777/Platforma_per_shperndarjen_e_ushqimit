import { useEffect, useState } from "react";
import axios from "axios";

export default function DeliveriesSection() {

  const [deliveries, setDeliveries] = useState([]);

  useEffect(() => {
    loadDeliveries();
  }, []);

  const loadDeliveries = () => {

    axios
      .get("http://localhost:3000/deliveries")
      .then(res => setDeliveries(res.data));
  };

  const deleteDelivery = async(id) => {

    await axios.delete(
      `http://localhost:3000/deliveries/${id}`
    );

    loadDeliveries();
  };

  return (

    <section className="dashboard-section">

      <h2>Deliveries</h2>

      <div className="table-wrapper">

        <table className="admin-table">

          <thead>

            <tr>
              <th>ID</th>
              <th>Order</th>
              <th>Driver</th>
              <th>Status</th>
              <th>Estimated</th>
              <th>Actions</th>
            </tr>

          </thead>

          <tbody>

            {deliveries.map(delivery => (

              <tr key={delivery.id}>

                <td>{delivery.id}</td>

                <td>{delivery.order_id}</td>

                <td>{delivery.driver_id}</td>

                <td>{delivery.statusi}</td>

                <td>
                  {delivery.koha_vleresuar} min
                </td>

                <td>

                  <div className="action-buttons">

                    <button
                      className="delete-btn"
                      onClick={() =>
                        deleteDelivery(delivery.id)
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