import { useEffect, useState } from "react";
import axios from "axios";

export default function DeliveriesSection() {
  const [deliveries, setDeliveries] = useState([]);
  const [orders, setOrders] = useState([]);
  const [drivers, setDrivers] = useState([]);

  const [showForm, setShowForm] = useState(false);
  const [editingDelivery, setEditingDelivery] = useState(null);

  const [formData, setFormData] = useState({
    order_id: "",
    driver_id: "",
    statusi: "Assigned",
    data_marrjes: "",
    data_dorezimit: "",
    koha_vleresuar: ""
  });

  useEffect(() => {
    loadDeliveries();
    loadOrders();
    loadDrivers();
  }, []);

  const loadDeliveries = async () => {
    const res = await axios.get("http://localhost:3000/deliveries");
    setDeliveries(res.data);
  };

  const loadOrders = async () => {
    const res = await axios.get("http://localhost:3000/orders");
    setOrders(res.data);
  };

  const loadDrivers = async () => {
    const res = await axios.get("http://localhost:3000/drivers");
    setDrivers(res.data);
  };

  const openInsert = () => {
    setEditingDelivery(null);
    setFormData({
      order_id: "",
      driver_id: "",
      statusi: "Assigned",
      data_marrjes: "",
      data_dorezimit: "",
      koha_vleresuar: ""
    });
    setShowForm(true);
  };

  const openEdit = (d) => {
    setEditingDelivery(d);

    setFormData({
      order_id: d.order_id,
      driver_id: d.driver_id,
      statusi: d.statusi,
      data_marrjes: d.data_marrjes?.slice(0, 16) || "",
      data_dorezimit: d.data_dorezimit?.slice(0, 16) || "",
      koha_vleresuar: d.koha_vleresuar
    });

    setShowForm(true);
  };

  const handleSave = async () => {
    try {
      if (editingDelivery) {
        await axios.put(
          `http://localhost:3000/deliveries/${editingDelivery.id}`,
          formData
        );
      } else {
        await axios.post(
          "http://localhost:3000/deliveries",
          formData
        );
      }

      setShowForm(false);
      loadDeliveries();
      loadOrders();
    } catch (err) {
      console.log(err.response?.data || err.message);
    }
  };

  const deleteDelivery = async (id) => {
    await axios.delete(`http://localhost:3000/deliveries/${id}`);
    loadDeliveries();
    loadOrders();
  };

  return (
    <section className="dashboard-section">
      <h2>Deliveries</h2>

      <button onClick={openInsert}>+ Add Delivery</button>
      {showForm && (
        <div className="form-box">
          <h3>
            {editingDelivery ? "Edit Delivery" : "Add Delivery"}
          </h3>

          <label>Order</label>
          <select
            value={formData.order_id}
            onChange={(e) =>
              setFormData({ ...formData, order_id: e.target.value })
            }
          >
            <option value="">Select Order</option>
            {orders.map((o) => (
              <option key={o.id} value={o.id}>
                Order #{o.id} - {o.statusi}
              </option>
            ))}
          </select>

          <label>Driver</label>
          <select
            value={formData.driver_id}
            onChange={(e) =>
              setFormData({ ...formData, driver_id: e.target.value })
            }
          >
            <option value="">Select Driver</option>
            {drivers.map((d) => (
              <option key={d.id} value={d.id}>
                Driver #{d.id} - {d.automjeti}
              </option>
            ))}
          </select>

          <label>Status</label>
          <select
            value={formData.statusi}
            onChange={(e) =>
              setFormData({ ...formData, statusi: e.target.value })
            }
          >
            <option value="Assigned">Assigned</option>
            <option value="Picked">Picked</option>
            <option value="On the way">On the way</option>
            <option value="Delivered">Delivered</option>
          </select>

          <input
            type="datetime-local"
            value={formData.data_marrjes}
            onChange={(e) =>
              setFormData({
                ...formData,
                data_marrjes: e.target.value
              })
            }
          />

          <input
            type="datetime-local"
            value={formData.data_dorezimit}
            onChange={(e) =>
              setFormData({
                ...formData,
                data_dorezimit: e.target.value
              })
            }
          />

          <input
            placeholder="ETA (minutes)"
            value={formData.koha_vleresuar}
            onChange={(e) =>
              setFormData({
                ...formData,
                koha_vleresuar: e.target.value
              })
            }
          />

          <button onClick={handleSave}>Save</button>
          <button onClick={() => setShowForm(false)}>
            Cancel
          </button>
        </div>
      )}
      <div className="table-wrapper">
        <table className="admin-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Order</th>
              <th>Driver</th>
              <th>Status</th>
              <th>ETA</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {deliveries.map((d) => (
              <tr key={d.id}>
                <td>{d.id}</td>

                <td>
                  #{d.order_id} - {
                    orders.find(o => o.id === d.order_id)?.statusi
                  }
                </td>

                <td>
                  {
                    drivers.find(dr => dr.id === d.driver_id)
                      ? `Driver #${d.driver_id}`
                      : "Unknown"
                  }
                </td>

                <td>
                  <span className={`status-${d.statusi}`}>
                    {d.statusi}
                  </span>
                </td>

                <td>{d.koha_vleresuar} min</td>

                <td>
                  <button onClick={() => openEdit(d)}>Edit</button>
                  <button onClick={() => deleteDelivery(d.id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}