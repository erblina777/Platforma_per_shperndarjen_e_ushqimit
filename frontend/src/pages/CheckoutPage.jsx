import { useState } from "react";
import axios from "axios";
import "../styles/CheckoutPage.css";

export default function CheckoutPage() {

  const cart =
    JSON.parse(
      localStorage.getItem("cart")
    ) || [];

  const [formData, setFormData] =
    useState({
      adresa: "",
      telefoni: "",
      shenimet: "",
      metoda_pageses: "Cash",
    });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]:
        e.target.value,
    });
  };

  const total =
    cart.reduce(
      (sum, item) =>
        sum +
        item.cmimi *
          item.quantity,
      0
    );

  const placeOrder = async () => {

    const user =
      JSON.parse(
        localStorage.getItem("user")
      );

    try {

      await axios.post(
        "http://localhost:3000/orders",
        {
          user_id: user.id,
          items: cart,
          shuma_totale: total,
          statusi: "Pending",

          adresa_dorezimit:
            formData.adresa,

          telefoni:
            formData.telefoni,

          shenimet:
            formData.shenimet,

          metoda_pageses:
            formData.metoda_pageses,
        }
      );

      alert(
        "Order placed successfully!"
      );

      localStorage.removeItem(
        "cart"
      );

    } catch (err) {

      console.log(err);

      alert(
        "Error placing order"
      );

    }
  };

  return (
    <div className="checkout-page">

      <div className="checkout-card">

        <h1>Checkout</h1>

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
          name="shenimet"
          placeholder="Order Notes"
          onChange={handleChange}
        />

        <select
          name="metoda_pageses"
          value={
            formData.metoda_pageses
          }
          onChange={handleChange}
        >
          <option value="Cash">
            💵 Cash
          </option>

          <option value="Card">
            💳 Card
          </option>

          <option value="PayPal">
            🟦 PayPal
          </option>
        </select>

        <h2>
          Total:
          €
          {total.toFixed(2)}
        </h2>

        <button
          onClick={placeOrder}
        >
          Confirm Order
        </button>

      </div>

    </div>
  );
}