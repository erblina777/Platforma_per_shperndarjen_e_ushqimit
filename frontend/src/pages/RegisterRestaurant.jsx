import axios from "axios";
import { useState } from "react";

export default function CreateRestaurant() {
  const token = localStorage.getItem("token");
  const [logo, setLogo] = useState(null);

  const [form, setForm] = useState({
    emertimi: "",
    pershkrimi: "",
    adresa: "",
    qyteti: "",
    telefoni: "",
    email: "",
    orari_hapjes: "",
    orari_mbylljes: ""
  });
  
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = new FormData();

      data.append("emertimi", form.emertimi);
      data.append("pershkrimi", form.pershkrimi);
      data.append("adresa", form.adresa);
      data.append("qyteti", form.qyteti);
      data.append("telefoni", form.telefoni);
      data.append("email", form.email);
      data.append("orari_hapjes", form.orari_hapjes);
      data.append("orari_mbylljes", form.orari_mbylljes);

      if (logo) data.append("logo", logo);

      await axios.post(
      "http://localhost:3000/auth/register-restaurant",
      data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      alert("Restaurant created successfully!");
      navigate("/restaurant-dashboard");

    } catch (err) {
      console.log(err);
      alert(err.response?.data?.message || "Error");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-box">

        <h1 className="auth-title">Create Restaurant</h1>

        <form className="auth-form" onSubmit={handleSubmit}>

          <input
            name="emertimi"
            placeholder="Restaurant Name"
            value={form.emertimi}
            onChange={handleChange}
          />

          <input
            name="adresa"
            placeholder="Address"
            value={form.adresa}
            onChange={handleChange}
          />

          <input
            name="qyteti"
            placeholder="City"
            value={form.qyteti}
            onChange={handleChange}
          />

          <input
            name="telefoni"
            placeholder="Phone"
            value={form.telefoni}
            onChange={handleChange}
          />

          <input
            name="email"
            placeholder="Restaurant Email"
            value={form.email}
            onChange={handleChange}
          />

          <textarea
            name="pershkrimi"
            placeholder="Description"
            value={form.pershkrimi}
            onChange={handleChange}
          />

          <input
            type="file"
            onChange={(e) => setLogo(e.target.files[0])}
          />

          <input
            type="time"
            name="orari_hapjes"
            value={form.orari_hapjes}
            onChange={handleChange}
          />

          <input
            type="time"
            name="orari_mbylljes"
            value={form.orari_mbylljes}
            onChange={handleChange}
          />

          <button type="submit" className="auth-btn">
            Create Restaurant
          </button>

        </form>
      </div>
    </div>
  );
}