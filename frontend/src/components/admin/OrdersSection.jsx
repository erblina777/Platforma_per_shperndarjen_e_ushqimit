import { useEffect, useState } from "react";
import axios from "axios";

export default function OrdersSection() {
  const [orders, setOrders] = useState([]);
  const [users, setUsers] = useState([]);
  const [restaurants, setRestaurants] = useState([]);

  useEffect(() => {
    loadOrders();
    loadUsers();
    loadRestaurants();
  }, []);
  
  const loadUsers = async () => {
    const res = await axios.get("http://localhost:3000/users");
    setUsers(res.data);
  };

  const loadRestaurants = async () => {
    const res = await axios.get("http://localhost:3000/restaurants");
    setRestaurants(res.data);
  };
  const loadOrders = () => {
    axios
      .get("http://localhost:3000/orders")
      .then(res => setOrders(res.data))
      .catch(err => console.log(err));
  };

  const deleteOrder = async (id) => {
    await axios.delete(`http://localhost:3000/orders/${id}`);
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
              <th>Restaurant</th>
              <th>Address</th>
              <th>Items</th>
              <th>Total</th>
              <th>Status</th>
              <th>Payment</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {orders.map((order) => (
              <tr key={order.id}>
                <td>{order.id}</td>

                <td>{order.user_name || order.user_id}</td>

                <td>{order.restaurant_name || order.restaurant_id}</td>

                <td>{order.adresa_dorezimit}</td>

                <td>
                  {order.items?.map((item) => (
                    <div key={item.id}>
                      {item.name} x{item.quantity} (€{item.price})
                    </div>
                  ))}
                </td>

                <td>€{order.shuma_totale}</td>

                <td>
                  <span className={`status-${order.statusi?.toLowerCase()}`}>
                    {order.statusi}
                  </span>
                </td>

                <td>{order.metoda_pageses}</td>

                <td>
                  <button onClick={() => deleteOrder(order.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}