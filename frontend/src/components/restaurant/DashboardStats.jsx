import { useEffect, useState } from "react";
import axios from "axios";

export default function DashboardStats() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3000/orders")
      .then((res) => setOrders(res.data))
      .catch(console.error);
  }, []);

  const totalOrders = orders.length;

  const pendingOrders =
    orders.filter(o => o.statusi === "Pending").length;

  const revenue =
    orders.reduce(
      (sum, o) => sum + Number(o.shuma_totale || 0),
      0
    );

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