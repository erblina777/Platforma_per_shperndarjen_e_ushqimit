import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import "../styles/MenuItemsPage.css";

export default function MenuItemsPage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [items, setItems] = useState([]);

  const [filters, setFilters] = useState({
    search: "",
    minPrice: "",
    maxPrice: "",
  });

  const [tempFilters, setTempFilters] = useState(filters);

  useEffect(() => {
    const timer = setTimeout(() => {
      setFilters(tempFilters);
    }, 400);

    return () => clearTimeout(timer);
  }, [tempFilters]);

  useEffect(() => {
    fetchItems();
  }, [filters]);

  const fetchItems = async () => {
    try {
      console.log("Restaurant ID:", id);

      const res = await axios.get("http://localhost:3000/menuitems", {
        params: {
          search: filters.search,
          minPrice: filters.minPrice,
          maxPrice: filters.maxPrice,
          restaurantId: id
        }
      });

      console.log("Response:", res.data);

      setItems(res.data || []);
    } catch (err) {
      console.error(err);
      setItems([]);
    }
  };
  const addToCart = (item) => {

  const cart =
    JSON.parse(
      localStorage.getItem("cart")
    ) || [];

  const existing =
    cart.find(
      p => p.id === item.id
    );

  if (existing) {
    existing.quantity += 1;
  } else {
    cart.push({
      ...item,
      quantity: 1
    });
  }

  localStorage.setItem(
    "cart",
    JSON.stringify(cart)
  );

  alert("Added to cart");
};

  return (
    <div className="menu-items-page">
      <h1>Menu Items</h1>

      {/* FILTERS */}
      <div className="menu-items-filters">
        <input
          type="text"
          placeholder="Search..."
          value={tempFilters.search}
          onChange={(e) =>
            setTempFilters({ ...tempFilters, search: e.target.value })
          }
        />

        <input
          type="number"
          placeholder="Min Price"
          value={tempFilters.minPrice}
          onChange={(e) =>
            setTempFilters({ ...tempFilters, minPrice: e.target.value })
          }
        />

        <input
          type="number"
          placeholder="Max Price"
          value={tempFilters.maxPrice}
          onChange={(e) =>
            setTempFilters({ ...tempFilters, maxPrice: e.target.value })
          }
        />
      </div>

      {/* ITEMS */}
      <div className="menu-items-grid">
        {items.map((item) => (
          <div className="menu-item-card" key={item.id}>
            
            {/* CLICK CARD -> DETAILS */}
            <div
              onClick={() => navigate(`/menuitems/${item.id}`)}
              style={{ cursor: "pointer" }}
            >
              <img
src={`http://localhost:3000/uploads/${item.foto}`}
  alt={item.emertimi}
/>
              <div className="menu-item-content">
                <h2>{item.emertimi}</h2>
                <p>{item.pershkrimi}</p>

                <p className="menu-item-price">€{item.cmimi}</p>

                <p>
                  <strong>Category:</strong> {item.category_name}
                </p>

                <p>
                  <strong>Restaurant:</strong> {item.restaurant_name}
                </p>
              </div>
            </div>

            {/* BUTTONS */}
            <div className="menu-item-actions">
              <button
                className="order-btn"
                  onClick={() =>
                    addToCart(item)
                }
              >
              Add To Cart
              </button>

              <button
                className="details-btn"
                onClick={() =>
                  navigate(`/menu/${item.id}`)
                }
              >
                View Details
              </button>
            </div>

          </div>
        ))}
      </div>
      <div className="checkout-box">

  <button
    className="checkout-btn"
    onClick={() =>
      navigate("/cart")
    }
  >
    Go To Cart
  </button>

</div>
    </div>
  );
}