import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Home() {
  const [restaurants, setRestaurants] = useState([]);
  const [menuitems, setMenuitems] = useState([]);
  const [promotions, setPromotions] = useState([]);
  const [reviews, setReviews] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Restaurants
    axios.get("http://localhost:3000/restaurants")
    .then((res) => {
      console.log(res.data);
      setRestaurants(res.data);
    })
    .catch((err) => console.log(err));

    // Menu Items
    axios
      .get("http://localhost:3000/menuitems")
      .then((res) => {
        setMenuitems(res.data);
      })
      .catch((err) => console.log(err));

    // Promotions
    axios
      .get("http://localhost:3000/promotions")
      .then((res) => {
        setPromotions(res.data);
      })
      .catch((err) => console.log(err));

    // Reviews
    axios
      .get("http://localhost:3000/reviews")
      .then((res) => {
        setReviews(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <main>
      {/* HERO */}
      <section className="hero">
        <div className="hero-container">
          
          <div className="hero-text">
            <h1>Delicious Food</h1>
            <h1><span>Delivered Fast</span></h1>

            <p>
              Order your favorite meals from the best restaurants in town.
            </p>

            <button>Order Now</button>
          </div>

          <div className="hero-image">
            <img src="/images/hero-food.jpg" alt="Food" />
          </div>

        </div>
      </section>

      {/* RESTAURANTS */}
      <section className="section">
        <div className="container">
          <h2>Popular Restaurants</h2>

          <div className="grid">
            {restaurants.map((restaurant) => (
              <div className="card" key={restaurant.id}>
                <img src={`/images/restaurants/${restaurant.logo}`} alt={restaurant.emertimi} />

                <h3>{restaurant.emertimi}</h3>

                <p>{restaurant.pershkrimi}</p>

                <p>{restaurant.qyteti}</p>
              </div>
            ))}
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

                <button
                  onClick={() => navigate("/order", { state: { item } })}
                >
                  Order Now
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROMOTIONS */}
      <section className="section">
        <div className="container">
          <h2>Special Offers</h2>

          <div className="grid">
            {promotions.map((promo) => (
              <div className="card" key={promo.id}>
                <h3>{promo.kodi}</h3>

                <p>{promo.zbritja_perqind}% OFF</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* REVIEWS */}
      <section className="section">
        <div className="container">
          <h2>Customer Reviews</h2>

          <div className="grid">
            {reviews.map((review) => (
              <div className="card" key={review.id}>
                <p>{"⭐".repeat(review.vleresimi)}</p>

                <p>"{review.komenti}"</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

export default Home;