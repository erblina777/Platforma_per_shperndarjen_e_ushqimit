import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

const api = axios.create({
  baseURL: "http://localhost:3000"
});

export default function App() {
  const [module, setModule] = useState("restaurants");
  const [data, setData] = useState([]);
  const [formData, setFormData] = useState({});
  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState(null);

  const fields = {
    users: ["emri", "mbiemri", "email", "password"],
    roles: ["emertimi", "pershkrimi"],
    userroles: ["user_id", "role_id"],
    restaurants: ["emertimi", "pershkrimi", "adresa", "qyteti"],
    menuitems: ["category_id", "emertimi", "cmimi"],
    orders: ["user_id", "restaurant_id", "total", "status"],
    menucategories: ["emertimi", "pershkrimi"],
    orderitems:["order_id", "menuitem_id","quantity"],
    drivers:["emri","telefoni","status"],
    deliveries:["order_id","driver_id","status"]
  };

  const placeholders = {
    users: {
      emri: "emri",
      mbiemri: "mbiemri",
      email: "email",
      password: "min 6 karaktere"
    },
     roles: {
      emertimi: "p.sh. Admin",
      pershkrimi: "p.sh. Roli"
    },
    userroles: {
    user_id: "p.sh. 1",
    role_id: "p.sh. 2"
    },
    restaurants: {
      emertimi: "p.sh. Restaurant Freskia",
      pershkrimi: "p.sh. Restoranti Freskia në Gërmi ofron...",
      adresa: "p.sh. Germi",
      qyteti: "p.sh. Prishtinë"
    },
    menuitems: {
      category_id: "p.sh. 1",
      emertimi: "p.sh. Pizza",
      cmimi: "p.sh. 4.50"
    },
    orders: {
      user_id: "p.sh. 1",
      restaurant_id: "p.sh. 2",
      total: "p.sh. 12.50",
      status: "p.sh. pending"
    },
    menucategories: {
      emertimi: "p.sh. Drinks",
      pershkrimi: "p.sh. Pije"
    },
    orderitems: {
      order_id: "p.sh. 1",
      menuitem_id: "p.sh. 2",
      quantity: "p.sh. 3"
    },
    drivers: {
      emri: "p.sh. Dren",
      telefoni: "p.sh. 044123456",
      status: "active / inactive"
    },
    deliveries: {
      order_id: "p.sh. 1",
      driver_id: "p.sh. 2",
      status: "delivering / delivered"
    },
  };

  const loadData = async () => {
    try {
      const res = await api.get(`/${module}`);
      setData(res.data);
    } catch {
      alert("Gabim gjatë marrjes së të dhënave");
    }
  };

  useEffect(() => {
    loadData();
    setShowForm(false);
    setEditId(null);
  }, [module]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async () => {
    for (let f of fields[module]) {
      if (!formData[f]) {
        alert("Plotëso të gjitha fushat!");
        return;
      }
    }

    try {
      if (editId) {
        await api.put(`/${module}/${editId}`, formData);
      } else {
        await api.post(`/${module}`, formData);
      }

      setFormData({});
      setShowForm(false);
      setEditId(null);
      loadData();
    } catch {
      alert("Gabim gjatë ruajtjes");
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("A jeni i sigurt?")) {
      try {
        await api.delete(`/${module}/${id}`);
        loadData();
      } catch {
        alert("Gabim gjatë fshirjes");
      }
    }
  };

  const handleEdit = (item) => {
    setFormData(item);
    setEditId(item.id);
    setShowForm(true);
  };

  return (
    <div className="container">
      <div className="header">
        <div className="logo-box">
          <img
            src="library/logo.png"
            alt="logo"
            className="logo"
          />
          <h1 className="title">Food Delivery Dashboard</h1>
        </div>
      </div>

      <div className="menu">
        {Object.keys(fields).map((m) => (
          <button
            key={m}
            className={module === m ? "active" : ""}
            onClick={() => setModule(m)}
          >
            {m}
          </button>
        ))}
      </div>

      <button
        className="add-btn"
        onClick={() => {
          setFormData({});
          setEditId(null);
          setShowForm(true);
        }}
      >
        + Add
      </button>

      <table className="table">
        <thead>
          <tr>
            {fields[module].map((f) => (
              <th key={f}>{f}</th>
            ))}
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {data.map((item) => (
            <tr key={item.id}>
              {fields[module].map((f) => (
                <td key={f}>{item[f]}</td>
              ))}
              <td>
                <button className="edit-btn" onClick={() => handleEdit(item)}>
                  Edit
                </button>
                <button
                  className="delete-btn"
                  onClick={() => handleDelete(item.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {showForm && (
        <div className="modal">
          <div className="form">
            <h3>{editId ? "Edit" : "Add"} {module}</h3>

            {fields[module].map((f) => (
              <input
                key={f}
                name={f}
                type={
                  f.includes("email")
                    ? "email"
                    : f.includes("cmimi") ||
                      f.includes("total") ||
                      f.includes("rating") ||
                      f.includes("amount")
                    ? "number"
                    : "text"
                }
                placeholder={placeholders[module]?.[f] || f}
                value={formData[f] || ""}
                onChange={handleChange}
              />
            ))}

            <button className="save-btn" onClick={handleSubmit}>
              Save
            </button>
            <button
              className="cancel-btn"
              onClick={() => setShowForm(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}