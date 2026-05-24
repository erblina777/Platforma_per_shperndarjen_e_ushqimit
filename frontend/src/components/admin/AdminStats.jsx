import { useEffect, useState } from "react";
import axios from "axios";

export default function AdminStats() {

  const [users,setUsers] = useState([]);
  const [restaurants,setRestaurants] = useState([]);
  const [orders,setOrders] = useState([]);
  const [drivers,setDrivers] = useState([]);

  useEffect(() => {

    axios.get("http://localhost:3000/users")
      .then(res => setUsers(res.data));

    axios.get("http://localhost:3000/restaurants")
      .then(res => setRestaurants(res.data));

    axios.get("http://localhost:3000/orders")
      .then(res => setOrders(res.data));

    axios.get("http://localhost:3000/deliverydrivers")
      .then(res => setDrivers(res.data));

  },[]);

  return (

    <div className="stats-grid">

      <div className="stat-card">
        <h3>Total Users</h3>
        <p>{users.length}</p>
      </div>

      <div className="stat-card">
        <h3>Restaurants</h3>
        <p>{restaurants.length}</p>
      </div>

      <div className="stat-card">
        <h3>Total Orders</h3>
        <p>{orders.length}</p>
      </div>

      <div className="stat-card">
        <h3>Drivers</h3>
        <p>{drivers.length}</p>
      </div>

    </div>
  );
}






































