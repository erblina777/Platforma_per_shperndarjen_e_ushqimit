import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Home() {
  const navigate = useNavigate();
  const [restaurants, setRestaurants] = useState([]);
  const [menuitems, setMenuitems] = useState([]);
  const [promotions, setPromotions] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [addedId, setAddedId] = useState(null);

  useEffect(() => {
    axios.get("http://localhost:3000/restaurants")
      .then((res) => setRestaurants(res.data))
      .catch(console.log);

    axios.get("http://localhost:3000/menuitems")
      .then((res) => setMenuitems(res.data))
      .catch(console.log);

    axios.get("http://localhost:3000/promotions")
      .then((res) => setPromotions(res.data))
      .catch(console.log);

    axios.get("http://localhost:3000/reviews")
      .then((res) => setReviews(res.data))
      .catch(console.log);
  }, []);

  const addToCart = (item) => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];

    const existing = cart.find(i => i.id === item.id);

    if (existing) {
      existing.quantity += 1;
    } else {
      cart.push({
        id: item.id,
        emertimi: item.emertimi,
        cmimi: item.cmimi,
        foto: item.foto,
        quantity: 1
      });
    }

    localStorage.setItem("cart", JSON.stringify(cart));

    setAddedId(item.id);
    setTimeout(() => setAddedId(null), 1000);
  };

  return (
    <main>

      {/* HERO */}
      <section className="hero">
        <div className="hero-container">

          <div className="hero-text">
            <h1>Delicious Food</h1>
            <h1><span>Delivered Fast</span></h1>
            <p>Order your favorite meals from the best restaurants in town.</p>
            <button onClick={() => navigate("/menu-items")} className="hero-btn">
              Order Now
            </button>
          </div>

          <div className="hero-image">
            <img src="/images/hero-food.jpg" alt="Food" />
          </div>

        </div>
      </section>

      {/* MENU ITEMS */}
      <section className="section">
        <div className="container">
          <h2>Featured Menu</h2>

          <div className="grid">
            {menuitems.map((item) => (
              <div className="card" key={item.id}>
                <img
                  src={`http://localhost:3000/uploads/${item.foto}`}
                  alt={item.emertimi}
                />

                <h3>{item.emertimi}</h3>
                <p>{item.cmimi} €</p>

                <button onClick={() => addToCart(item)}>
                  {addedId === item.id ? "Added ✔" : "Add to Cart"}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

    </main>
  );
}

export default Home;