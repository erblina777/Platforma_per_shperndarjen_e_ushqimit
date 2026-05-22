

import { useEffect, useState } from "react";
import axios from "axios";

export default function DriverStats() {

  const [deliveries, setDeliveries] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3000/deliveries")
      .then((res) => setDeliveries(res.data))
      .catch(console.error);
  }, []);

  const totalDeliveries = deliveries.length;

  const pendingDeliveries =
    deliveries.filter(d => d.statusi === "Pending").length;

  const completedDeliveries =
    deliveries.filter(d => d.statusi === "Delivered").length;

  return (
    <div className="stats-grid">

      <div className="stat-card">
        <h3>Total Deliveries</h3>
        <p>{totalDeliveries}</p>
      </div>

      <div className="stat-card">
        <h3>Pending</h3>
        <p>{pendingDeliveries}</p>
      </div>

      <div className="stat-card">
        <h3>Completed</h3>
        <p>{completedDeliveries}</p>
      </div>

    </div>
  );
}