
import { useEffect, useState } from "react";
import axios from "axios";

export default function DriverInfo() {

  const [driver, setDriver] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:3000/deliverydrivers/1")
      .then((res) => setDriver(res.data))
      .catch(console.error);
  }, []);

  if (!driver) return null;

  return (
    <section className="dashboard-section">

      <h2>Driver Information</h2>

      <div className="driver-box">

        <div>
          <h3>{driver.automjeti}</h3>

          <p>Plate: {driver.targa}</p>

          <p>Zone: {driver.zona}</p>

          <p>Rating: ⭐ {driver.vleresimi}</p>

          <span className="status-badge">
            {driver.statusi}
          </span>
        </div>

      </div>

    </section>
  );
}