import { useEffect,useState } from "react";
import axios from "axios";

export default function OrdersSection() {

  const [orders,setOrders] = useState([]);

  useEffect(() => {
    loadOrders();
  },[]);

  const loadOrders = () => {

    axios
      .get("http://localhost:3000/orders")
      .then(res => setOrders(res.data));
  };

  const deleteOrder = async(id) => {

    await axios.delete(
      `http://localhost:3000/orders/${id}`
    );

    loadOrders();
  };

  return (

    <section className="dashboard-section">

      <h2>Orders</h2>

      <div className="table-wrapper">

        <table className="admin-table">

          <thead>

            <tr>
              <th>ID</th>
              <th>User</th>
              <th>Total</th>
              <th>Status</th>
              <th>Payment</th>
              <th>Actions</th>
            </tr>

          </thead>

          <tbody>

            {orders.map(order => (

              <tr key={order.id}>

                <td>{order.id}</td>

                <td>{order.user_id}</td>

                <td>€{order.shuma_totale}</td>

                <td>{order.statusi}</td>

                <td>{order.metoda_pageses}</td>

                <td>

                  <div className="action-buttons">

                    <button
                      className="delete-btn"
                      onClick={() => deleteOrder(order.id)}
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