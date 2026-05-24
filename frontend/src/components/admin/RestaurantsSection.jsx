import { useEffect,useState } from "react";
import axios from "axios";

export default function RestaurantsSection() {

  const [restaurants,setRestaurants] = useState([]);

  useEffect(() => {
    loadRestaurants();
  },[]);

  const loadRestaurants = () => {

    axios
      .get("http://localhost:3000/restaurants")
      .then(res => setRestaurants(res.data));
  };

  const deleteRestaurant = async(id) => {

    await axios.delete(
      `http://localhost:3000/restaurants/${id}`
    );

    loadRestaurants();
  };

  return (

    <section className="dashboard-section">

      <h2>Restaurants</h2>

      <div className="table-wrapper">

        <table className="admin-table">

          <thead>

            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>City</th>
              <th>Status</th>
              <th>Rating</th>
              <th>Actions</th>
            </tr>

          </thead>

          <tbody>

            {restaurants.map(restaurant => (

              <tr key={restaurant.id}>

                <td>{restaurant.id}</td>

                <td>{restaurant.emertimi}</td>

                <td>{restaurant.qyteti}</td>

                <td>

                  <span className={`status-badge ${
                    restaurant.status === "Active"
                    ? "active"
                    : "inactive"
                  }`}>

                    {restaurant.status}

                  </span>

                </td>

                <td>
                  ⭐ {restaurant.vleresimi}
                </td>

                <td>

                  <div className="action-buttons">

                    <button
                      className="delete-btn"
                      onClick={() =>
                        deleteRestaurant(restaurant.id)
                      }
                    >
                      Delete
                    </button>

                  </div>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </section>
  );
}