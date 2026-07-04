import { useEffect, useState } from "react";
import axios from "axios";

export default function PromotionsSection({ restaurant }) {
  const [promotions, setPromotions] = useState([]);

  const [form, setForm] = useState({
    kodi: "",
    zbritja_perqind: "",
  });

  const loadPromos = async (id) => {
    try {
      const res = await axios.get(
        `http://localhost:3000/promotions/restaurant/${id}`
      );

      console.log("PROMOS RESPONSE:", res.data); // DEBUG

      setPromotions(res.data || []);
    } catch (err) {
      console.error("LOAD PROMOS ERROR:", err);
    }
  };

  useEffect(() => {
    if (restaurant?.id) {
      console.log("Restaurant ID:", restaurant.id); // DEBUG
      loadPromos(restaurant.id);
    }
  }, [restaurant?.id]);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const addPromo = async () => {
    if (!restaurant?.id) return;

    try {
      await axios.post("http://localhost:3000/promotions", {
        kodi: form.kodi,
        zbritja_perqind: Number(form.zbritja_perqind),
        restaurant_id: restaurant.id,
      });

      setForm({
        kodi: "",
        zbritja_perqind: "",
      });

      loadPromos(restaurant.id);
    } catch (err) {
      console.error("ADD PROMO ERROR:", err);
    }
  };

  const deletePromo = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/promotions/${id}`);
      loadPromos(restaurant.id);
    } catch (err) {
      console.error("DELETE PROMO ERROR:", err);
    }
  };

  if (!restaurant) return <p>Loading...</p>;
  
  return (
    <section className="dashboard-section">
      <h2>Promotions</h2>

      {/* FORM */}
      <div className="form-box">
        <input
          name="kodi"
          placeholder="Coupon Code"
          value={form.kodi}
          onChange={handleChange}
        />

        <input
          name="zbritja_perqind"
          placeholder="Discount %"
          type="number"
          value={form.zbritja_perqind}
          onChange={handleChange}
        />

        <button onClick={addPromo}>Create</button>
      </div>

      {/* DEBUG VIEW (hiqe kur punon) */}
      {/* <pre>{JSON.stringify(promotions, null, 2)}</pre> */}

      {/* LIST */}
      <div className="promo-grid">
        {promotions.length === 0 ? (
          <p>No promotions found.</p>
        ) : (
          promotions.map((promo) => (
            <div className="promo-card" key={promo.id}>
              <h3>{promo.kodi}</h3>
              <p>{promo.zbritja_perqind}% OFF</p>

              <button onClick={() => deletePromo(promo.id)}>
                Delete
              </button>
            </div>
          ))
        )}
      </div>
    </section>
  );
}