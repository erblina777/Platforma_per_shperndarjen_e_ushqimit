import { useEffect, useState } from "react";
import axios from "axios";

export default function OrdersSection() {

  const [orders, setOrders] = useState([]);

  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = () => {
    axios
      .get("http://localhost:3000/orders")
      .then((res) => setOrders(res.data));
  };

  const updateStatus = async (id, statusi) => {

    await axios.put(
      `http://localhost:3000/orders/${id}`,
      { statusi }
    );

    loadOrders();
  };

  return (
    <section className="dashboard-section">

      <h2>Orders</h2>

      <div className="orders-grid">

        {orders.map(order => (

          <div className="order-card" key={order.id}>

            <h3>Order #{order.id}</h3>

            <p>Status: {order.statusi}</p>

            <p>Total: €{order.shuma_totale}</p>

            <div className="buttons">

              <button
                onClick={() =>
                  updateStatus(order.id,"Accepted")
                }
              >
                Accept
              </button>

              <button
                onClick={() =>
                  updateStatus(order.id,"Rejected")
                }
              >
                Reject
              </button>

              <button
                onClick={() =>
                  updateStatus(order.id,"Preparing")
                }
              >
                Preparing
              </button>

              <button
                onClick={() =>
                  updateStatus(order.id,"Delivered")
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