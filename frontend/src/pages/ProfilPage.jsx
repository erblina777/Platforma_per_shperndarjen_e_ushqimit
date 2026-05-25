import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../styles/ProfilPage.css";

export default function ProfilPage() {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [orders, setOrders] = useState([]);
  const [newPassword, setNewPassword] = useState("");

  useEffect(() => {
    const loggedUser = JSON.parse(localStorage.getItem("user"));

    if (!loggedUser) {
      navigate("/login");
      return;
    }

    setUser(loggedUser);

    axios
      .get(`http://localhost:3000/orders/user/${loggedUser.id}`)
      .then((res) => {
        setOrders(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("restaurant");

    navigate("/login");
  };

  const handlePasswordChange = async () => {
    try {
      await axios.put(
        `http://localhost:3000/users/change-password/${user.id}`,
        {
          password: newPassword,
        }
      );

      alert("Password updated");
      setNewPassword("");
    } catch (err) {
      console.log(err);
      alert("Gabim");
    }
  };

  if (!user) return null;

  return (
    <div className="profile-container">
      <div className="profile-card">

        <h1>My Profile</h1>

        <div className="profile-info">
          <p>
            <strong>Emri:</strong> {user.emri}
          </p>

          <p>
            <strong>Mbiemri:</strong> {user.mbiemri}
          </p>

          <p>
            <strong>Email:</strong> {user.email}
          </p>
        </div>

        <div className="password-box">
          <h2>Ndrysho Password</h2>

          <input
            type="password"
            placeholder="Password i ri"
            value={newPassword}
            onChange={(e) =>
              setNewPassword(e.target.value)
            }
          />

          <button onClick={handlePasswordChange}>
            Change Password
          </button>
        </div>

        <div className="orders-box">
          <h2>My Orders</h2>

          {orders.length === 0 ? (
            <p>Nuk ka porosi.</p>
          ) : (
            orders.map((order) => (
              <div className="order-card" key={order.id}>
                <p>
                  <strong>Order ID:</strong> {order.id}
                </p>

                <p>
                  <strong>Total:</strong>{" "}
                  {order.shuma_totale}€
                </p>

                <p>
                  <strong>Status:</strong>{" "}
                  {order.statusi}
                </p>

                <p>
                  <strong>Address:</strong>{" "}
                  {order.adresa_dorezimit}
                </p>

                <p>
                  <strong>Date:</strong>{" "}
                  {new Date(
                    order.data_porosise
                  ).toLocaleDateString()}
                </p>
              </div>
            ))
          )}
        </div>

        <button
          className="logout-btn"
          onClick={handleLogout}
        >
          Logout
        </button>

      </div>
    </div>
  );
}
