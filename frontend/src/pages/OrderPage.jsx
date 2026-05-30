import { useLocation } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import "../styles/OrderPage.css";

export default function OrderPage() {

  const { state } = useLocation();

  const item = state?.item;

  const [formData, setFormData] = useState({
    adresa: "",
    telefoni: "",
    komenti: ""
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const placeOrder = async () => {

    const user =
      JSON.parse(localStorage.getItem("user"));

    try {

      await axios.post(
        "http://localhost:3000/orders",
        {
          user_id: user.id,
          menuitem_id: item.id,
          shuma_totale: item.cmimi,
          statusi: "Pending",
          adresa_dorezimit: formData.adresa,
          telefoni: formData.telefoni,
          shenimet: formData.shenimet,
          metoda_pageses: formData.metoda_pageses
        }
      );

      alert("Order placed successfully");

    } catch (err) {
      console.log(err);
      alert("Error");
    }
  };

  if (!item) {
    return <h2>No item selected</h2>;
  }

  return (
    <div className="order-page">

      <div className="order-card">

        <img
          src={`http://localhost:3000/uploads/${item.foto}`}
          alt={item.emertimi}
        />

        <h1>{item.emertimi}</h1>

        <p>{item.pershkrimi}</p>

        <h2>€{item.cmimi}</h2>

        <input
          type="text"
          name="adresa"
          placeholder="Delivery Address"
          onChange={handleChange}
        />

        <input
          type="text"
          name="telefoni"
          placeholder="Phone Number"
          onChange={handleChange}
        />

        <textarea
          name="komenti"
          placeholder="Order Notes"
          onChange={handleChange}
        />
        <div className="payment-methods">

  <div
    className={
      formData.forma_pageses === "Cash"
      ? "payment active"
      : "payment"
    }
    onClick={() =>
      setFormData({
        ...formData,
        forma_pageses: "Cash"
      })
    }
  >
    💵 Cash
  </div>

  <div
    className={
      formData.forma_pageses === "Card"
      ? "payment active"
      : "payment"
    }
    onClick={() =>
      setFormData({
        ...formData,
        forma_pageses: "Card"
      })
    }
  >
    💳 Card
  </div>

  <div
    className={
      formData.forma_pageses === "PayPal"
      ? "payment active"
      : "payment"
    }
    onClick={() =>
      setFormData({
        ...formData,
        forma_pageses: "PayPal"
      })
    }
  >
    🟦 PayPal
  </div>

</div>

        <button onClick={placeOrder}>
          Confirm Order
        </button>

      </div>

    </div>
  );
}