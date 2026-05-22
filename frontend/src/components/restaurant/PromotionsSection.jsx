import { useEffect, useState } from "react";
import axios from "axios";

export default function PromotionsSection() {

  const [promotions, setPromotions] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3000/promotions")
      .then((res) => setPromotions(res.data));
  }, []);

  return (
    <section className="dashboard-section">

      <h2>Promotions</h2>

      <button>Create Coupon</button>

      <div className="promo-grid">

        {promotions.map(promo => (

          <div className="promo-card" key={promo.id}>

            <h3>{promo.kodi}</h3>

            <p>{promo.zbritja_perqind}% OFF</p>

          </div>

        ))}

      </div>

    </section>
  );
}