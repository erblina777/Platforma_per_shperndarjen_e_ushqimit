import { useEffect, useState } from "react";
import axios from "axios";

export default function OrdersSection() {
  const [orders, setOrders] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingOrder, setEditingOrder] = useState(null);

  const [formData, setFormData] = useState({
    user_id: "",
    restaurant_id: "",
    adresa_dorezimit: "",
    shuma_totale: "",
    statusi: "",
    metoda_pageses: ""
  });

  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = () => {
    axios
      .get("http://localhost:3000/orders")
      .then(res => setOrders(res.data))
      .catch(err => console.log(err));
  };

  const openInsert = () => {
    setEditingOrder(null);

    setFormData({
      user_id: "",
      restaurant_id: "",
      adresa_dorezimit: "",
      shuma_totale: "",
      statusi: "",
      metoda_pageses: ""
    });

    setShowForm(true);
  };

  const openEdit = (order) => {
    setEditingOrder(order);

    setFormData({
      user_id: order.user_id || "",
      restaurant_id: order.restaurant_id || "",
      adresa_dorezimit: order.adresa_dorezimit || "",
      shuma_totale: order.shuma_totale || "",
      statusi: order.statusi || "",
      metoda_pageses: order.metoda_pageses || ""
    });

    setShowForm(true);
  };

  const handleSave = async () => {
    try {
      if (editingOrder) {
        await axios.put(
          `http://localhost:3000/orders/${editingOrder.id}`,
          formData
        );
      } else {
        await axios.post(
          "http://localhost:3000/orders",
          formData
        );
      }

      setShowForm(false);
      loadOrders();
    } catch (err) {
      console.log(err.response?.data || err.message);
    }
  };

  const deleteOrder = async (id) => {
    await axios.delete(`http://localhost:3000/orders/${id}`);
    loadOrders();
  };

  return (
    <section className="dashboard-section">
      <h2>Orders</h2>

      <button onClick={openInsert} className="edit-btn">
        + Add Order
      </button>

      <div className="table-wrapper">
        <table className="admin-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>User</th>
              <th>Restaurant</th>
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
                <td>{order.restaurant_id}</td>
                <td>€{order.shuma_totale}</td>
                <td>{order.statusi}</td>
                <td>{order.metoda_pageses}</td>

                <td>
                  <div className="action-buttons">
                    <button
                      className="edit-btn"
                      onClick={() => openEdit(order)}
                    >
                      Edit
                    </button>

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

      {showForm && (
        <div className="form-box">
          <h3>{editingOrder ? "Edit Order" : "Add Order"}</h3>

          <input
            placeholder="User ID"
            value={formData.user_id}
            onChange={(e) =>
              setFormData({ ...formData, user_id: e.target.value })
            }
          />

          <input
            placeholder="Restaurant ID"
            value={formData.restaurant_id}
            onChange={(e) =>
              setFormData({ ...formData, restaurant_id: e.target.value })
            }
          />

          <input
            placeholder="Delivery Address"
            value={formData.adresa_dorezimit}
            onChange={(e) =>
              setFormData({ ...formData, adresa_dorezimit: e.target.value })
            }
          />

          <input
            placeholder="Total Amount"
            value={formData.shuma_totale}
            onChange={(e) =>
              setFormData({ ...formData, shuma_totale: e.target.value })
            }
          />

          <input
            placeholder="Status"
            value={formData.statusi}
            onChange={(e) =>
              setFormData({ ...formData, statusi: e.target.value })
            }
          />

          <input
            placeholder="Payment Method"
            value={formData.metoda_pageses}
            onChange={(e) =>
              setFormData({ ...formData, metoda_pageses: e.target.value })
            }
          />

          <div className="action-buttons">
            <button className="edit-btn" onClick={handleSave}>
              Save
            </button>

            <button
              className="delete-btn"
              onClick={() => setShowForm(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </section>
  );
}