import { useEffect, useState } from "react";
import axios from "axios";

export default function DashboardStats({ restaurant }) {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    if (!restaurant?.id) return;

    axios
      .get(`http://localhost:3000/orders/restaurant/${restaurant.id}`)
      .then((res) => setOrders(res.data))
      .catch(console.error);
  }, [restaurant?.id]);

  // ✅ GROUP ORDERS (1 order = 1 object)
  const grouped = orders.reduce((acc, item) => {
    if (!acc[item.id]) {
      acc[item.id] = {
        id: item.id,
        statusi: item.statusi,
        shuma_totale: item.shuma_totale,
      };
    }
    return acc;
  }, {});

  const cleanOrders = Object.values(grouped);

  const totalOrders = cleanOrders.length;

  const pendingOrders = cleanOrders.filter(
    (o) => o.statusi === "Pending"
  ).length;

  const revenue = cleanOrders.reduce(
    (sum, o) => sum + Number(o.shuma_totale || 0),
    0
  );

  if (!restaurant) return <p>Loading...</p>;

  return (
    <div className="stats-grid">
      <div className="stat-card">
        <h3>Total Orders</h3>
        <p>{totalOrders}</p>
      </div>

      <div className="stat-card">
        <h3>Pending Orders</h3>
        <p>{pendingOrders}</p>
      </div>

      <div className="stat-card">
        <h3>Revenue</h3>
        <p>€{revenue}</p>
      </div>
    </div>
  );
}