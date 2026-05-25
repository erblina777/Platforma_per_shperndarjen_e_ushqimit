import { useEffect, useState } from "react";
import axios from "axios";

export default function OrdersSection({ restaurant }) {
  const [orders, setOrders] = useState([]);
  const [editId, setEditId] = useState(null);
  const [newStatus, setNewStatus] = useState("");

  useEffect(() => {
    if (!restaurant?.id) return;

    axios
      .get(`http://localhost:3000/orders/restaurant/${restaurant.id}`)
      .then((res) => setOrders(res.data))
      .catch((err) => console.error(err));
  }, [restaurant?.id]);

  const updateStatus = async (id, statusi) => {
    await axios.put(`http://localhost:3000/orders/${id}`, { statusi });

    const res = await axios.get(
      `http://localhost:3000/orders/restaurant/${restaurant.id}`
    );

    setOrders(res.data);
  };

  const startEdit = (order) => {
    setEditId(order.id);
    setNewStatus(order.statusi);
  };

  const saveEdit = async (id) => {
    await updateStatus(id, newStatus);
    setEditId(null);
    setNewStatus("");
  };

  if (!restaurant) return <p>Loading...</p>;

  const grouped = orders.reduce((acc, item) => {
    if (!acc[item.id]) {
      acc[item.id] = {
        id: item.id,
        statusi: item.statusi,
        shuma_totale: item.shuma_totale,
        items: [],
      };
    }

    if (item.item_name) {
      acc[item.id].items.push({
        name: item.item_name,
        price: item.item_price,
        sasia: item.sasia,
      });
    }

    return acc;
  }, {});

  return (
    <section className="dashboard-section">
      <h2>Orders</h2>

      <div className="orders-grid">
        {Object.values(grouped).map((o) => (
          <div className="order-card" key={o.id}>
            <h3>Order #{o.id}</h3>

            <p><b>Status:</b> {o.statusi}</p>
            <p><b>Total:</b> €{o.shuma_totale}</p>

            {/* ITEMS */}
            <h4>Items:</h4>
            <ul>
              {o.items.map((i, index) => (
                <li key={index}>
                  {i.name} - €{i.price} x {i.sasia}
                </li>
              ))}
            </ul>

            {/* EDIT SECTION */}
            {editId === o.id ? (
              <div className="buttons">
                <select
                  value={newStatus}
                  onChange={(e) => setNewStatus(e.target.value)}
                >
                  <option value="Pending">Pending</option>
                  <option value="Preparing">Preparing</option>
                  <option value="Accepted">Accepted</option>
                  <option value="Delivered">Delivered</option>
                  <option value="Rejected">Rejected</option>
                </select>

                <button onClick={() => saveEdit(o.id)}>Save</button>
                <button onClick={() => setEditId(null)}>Cancel</button>
              </div>
            ) : (
              <div className="buttons">
                <button onClick={() => startEdit(o)}>Edit</button>
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}