import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "../styles/MenuItemDetails.css";

export default function MenuItemDetails() {
  const { id } = useParams();
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadItem();
  }, [id]);

  const loadItem = async () => {
    try {
      const res = await axios.get(
        `http://localhost:3000/menuitems/${id}`
      );
      setItem(res.data);
    } catch (err) {
      console.log("Error loading item:", err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (!item) return <p>Item not found</p>;

  return (
    <div className="menu-item-details">
      <div className="menu-card">
        <h1>{item.emertimi}</h1>

        <p className="desc">
          {item.pershkrimi || "No description available"}
        </p>

        <div className="info">
          <p><b>Price:</b> €{item.cmimi}</p>
          <p><b>Calories:</b> {item.kalori || "N/A"} kcal</p>
          <p>
            <b>Available:</b>{" "}
            {item.disponueshme ? "Yes" : "No"}
          </p>
        </div>

        {item.foto && (
          <img
            src={`http://localhost:3000/uploads/${item.foto}`}
            alt={item.emertimi}
            className="menu-img"
          />
        )}

        {item.alergjene && (
          <div className="alert">
            <b>Allergens:</b> {item.alergjene}
          </div>
        )}
      </div>
    </div>
  );
}