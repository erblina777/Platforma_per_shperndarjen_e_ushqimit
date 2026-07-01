import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../styles/CheckoutPage.css";

export default function CheckoutPage() {
  const navigate = useNavigate();

  const user =
    JSON.parse(
      localStorage.getItem("user")
    );

  const cart =
    JSON.parse(
      localStorage.getItem("cart")
    ) || [];
    const [promotions, setPromotions] =
    useState([]);

  const [formData, setFormData] =
    useState({
      adresa: "",
      telefoni: "",
      shenimet: "",
      metoda_pageses: "Cash",
    });
    const [deliveryFee] =
    useState(2);

  const [discount,
    setDiscount] =
    useState(0);

  const [coupon,
    setCoupon] =
    useState("");

  useEffect(() => {
    fetchPromotions();
  }, []);

  const fetchPromotions = async () => {
    try {

      const res =
        await axios.get(
          "http://localhost:3000/promotions"
        );

      setPromotions(
        res.data
      );

    } catch (err) {
      console.log(err);
    }
  };


  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]:
        e.target.value,
    });
  };
  if (!user) {
    return <h2>Please login first.</h2>;
  }

  if (cart.length === 0) {
    return <h2>Your cart is empty.</h2>;
  }

  const subtotal =
    cart.reduce(
      (sum, item) =>
        sum +
        item.cmimi *
        item.quantity,
      0
    );

  const total =
    subtotal +
    deliveryFee -
    discount;

  const applyCoupon = () => {

    const promo =
      promotions.find(
        p =>
          p.kodi.toLowerCase() ===
          coupon.toLowerCase()
      );

    if (promo) {

      const zbritja =
        subtotal *
        promo.zbritja_perqind /
        100;

      setDiscount(
        zbritja
      );

      alert(
        `${promo.zbritja_perqind}% discount applied`
      );

    } else {

      setDiscount(0);

      alert(
        "Invalid coupon"
      );
    }
  };

  /*const total =
    cart.reduce(
      (sum, item) =>
        sum +
        item.cmimi *
          item.quantity,
      0
    );*/


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
          restaurant_id: cart[0].restaurant_id,
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
            tarifa_dorezimit:
            deliveryFee,

          zbritja:
            discount,
        }
      );

      alert(
        "Order placed successfully!"
      );

      localStorage.removeItem(
        "cart"
      );
      navigate("/");

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
        <input
          type="text"
          placeholder="Coupon Code"
          value={coupon}
          onChange={(e) =>
            setCoupon(
              e.target.value
            )
          }
        />

        <button
          onClick={applyCoupon}
        >
          Apply Coupon
        </button>

        <div className="checkout-summary">

          <p className = "summary-row">
            Subtotal:
            €{subtotal.toFixed(2)}
          </p>

          <p className="summary-row">
            Delivery Fee:
            €{deliveryFee.toFixed(2)}
          </p>

          <p className="summary-row discount">
            Discount:
            -€{discount.toFixed(2)}
          </p>

        <h2 className="summary-total">
          Total:
          €
          {total.toFixed(2)}
        </h2>
       </div> 

        <button
          onClick={placeOrder}
        >
          Confirm Order
        </button>

      </div>

    </div>
  );
}