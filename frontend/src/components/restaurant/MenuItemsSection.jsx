import { useEffect, useState } from "react";
import axios from "axios";

export default function MenuItemsSection() {

  const [items, setItems] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3000/menuitems")
      .then((res) => setItems(res.data));
  }, []);

  return (
    <section className="dashboard-section">

      <h2>Menu Items</h2>

      <div className="menu-grid">

        {items.map(item => (

          <div className="menu-card" key={item.id}>

            <img
              src={`/images/menuitems/${item.foto}`}
              alt={item.emertimi}
            />

            <h3>{item.emertimi}</h3>

            <p>€{item.cmimi}</p>

          </div>

        ))}

      </div>

    </section>
  );
}