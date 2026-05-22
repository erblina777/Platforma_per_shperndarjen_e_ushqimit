

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
      .then((res) => setDeliveries(res.data));
  };

  const updateStatus = async (id, statusi) => {

    await axios.put(
      `http://localhost:3000/deliveries/${id}`,
      { statusi }
    );

    loadDeliveries();
  };

  return (
    <section className="dashboard-section">

      <h2>Deliveries</h2>

      <div className="deliveries-grid">

        {deliveries.map(delivery => (

          <div className="delivery-card" key={delivery.id}>

            <h3>Delivery #{delivery.id}</h3>

            <p>Order ID: {delivery.order_id}</p>

            <p>Status: {delivery.statusi}</p>

            <p>
              Estimated Time:
              {" "}
              {delivery.koha_vleresuar} min
            </p>

            <div className="buttons">

              <button
                onClick={() =>
                  updateStatus(delivery.id, "Picked Up")
                }
              >
                Picked Up
              </button>

              <button
                onClick={() =>
                  updateStatus(delivery.id, "On The Way")
                }
              >
                On The Way
              </button>

              <button
                onClick={() =>
                  updateStatus(delivery.id, "Delivered")
                }
              >
                Delivered
              </button>

            </div>

          </div>

        ))}

      </div>

    </section>
  );
}