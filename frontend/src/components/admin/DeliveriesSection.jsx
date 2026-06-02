import { useEffect, useState } from "react";
import axios from "axios";

export default function DeliveriesSection() {
  const [deliveries, setDeliveries] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingDelivery, setEditingDelivery] = useState(null);

  const [formData, setFormData] = useState({
    order_id: "",
    driver_id: "",
    statusi: "",
    data_marrjes: "",
    data_dorezimit: "",
    koha_vleresuar: ""
  });

  useEffect(() => {
    loadDeliveries();
  }, []);

  const loadDeliveries = () => {
    axios
      .get("http://localhost:3000/deliveries")
      .then((res) => setDeliveries(res.data))
      .catch((err) => console.log(err));
  };

  const openInsert = () => {
    setEditingDelivery(null);

    setFormData({
      order_id: "",
      driver_id: "",
      statusi: "",
      data_marrjes: "",
      data_dorezimit: "",
      koha_vleresuar: ""
    });

    setShowForm(true);
  };

  const openEdit = (delivery) => {
    setEditingDelivery(delivery);

    setFormData({
      order_id: delivery.order_id || "",
      driver_id: delivery.driver_id || "",
      statusi: delivery.statusi || "",
      data_marrjes: delivery.data_marrjes
        ? delivery.data_marrjes.slice(0, 16)
        : "",
      data_dorezimit: delivery.data_dorezimit
        ? delivery.data_dorezimit.slice(0, 16)
        : "",
      koha_vleresuar: delivery.koha_vleresuar || ""
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
    } catch (err) {
      console.log(err.response?.data || err.message);
    }
  };

  const deleteDelivery = async (id) => {
    await axios.delete(
      `http://localhost:3000/deliveries/${id}`
    );

    loadDeliveries();
  };

  return (
    <section className="dashboard-section">
      <h2>Deliveries</h2>

      <button onClick={openInsert}>
        + Add Delivery
      </button>

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
            {deliveries.map((delivery) => (
              <tr key={delivery.id}>
                <td>{delivery.id}</td>
                <td>{delivery.order_id}</td>
                <td>{delivery.driver_id}</td>
                <td>{delivery.statusi}</td>
                <td>{delivery.koha_vleresuar} min</td>

                <td>
                  <button
                    onClick={() => openEdit(delivery)}
                  >
                    Edit
                  </button>

                  <button
                    className="delete-btn"
                    onClick={() =>
                      deleteDelivery(delivery.id)
                    }
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
            {editingDelivery
              ? "Edit Delivery"
              : "Add Delivery"}
          </h3>

          <input
            placeholder="Order ID"
            value={formData.order_id}
            onChange={(e) =>
              setFormData({
                ...formData,
                order_id: e.target.value
              })
            }
          />

          <input
            placeholder="Driver ID"
            value={formData.driver_id}
            onChange={(e) =>
              setFormData({
                ...formData,
                driver_id: e.target.value
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
            placeholder="Estimated Minutes"
            value={formData.koha_vleresuar}
            onChange={(e) =>
              setFormData({
                ...formData,
                koha_vleresuar: e.target.value
              })
            }
          />

          <button onClick={handleSave}>
            Save
          </button>

          <button
            onClick={() => setShowForm(false)}
          >
            Cancel
          </button>
        </div>
      )}
    </section>
  );
}