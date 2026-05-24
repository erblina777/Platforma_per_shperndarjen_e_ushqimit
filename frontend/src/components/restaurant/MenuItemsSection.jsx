import { useEffect, useState } from "react";
import axios from "axios";

export default function MenuItemsSection({ restaurant }) {
  const [items, setItems] = useState([]);
  const [categories, setCategories] = useState([]);

  const [selectedCategory, setSelectedCategory] = useState("");
  const [image, setImage] = useState(null);

  // CREATE FORM
  const [form, setForm] = useState({
    emertimi: "",
    pershkrimi: "",
    cmimi: "",
  });

  // EDIT STATE
  const [editId, setEditId] = useState(null);
  const [editForm, setEditForm] = useState({
    emertimi: "",
    pershkrimi: "",
    cmimi: "",
  });

  // ================= LOAD =================
  const loadCategories = async (id) => {
    try {
      const res = await axios.get(
        `http://localhost:3000/menucategories/restaurant/${id}`
      );
      setCategories(res.data || []);
    } catch (err) {
      console.error(err);
    }
  };

  const loadItems = async (id) => {
    try {
      const res = await axios.get(
        `http://localhost:3000/menuitems/restaurant/${id}`
      );
      setItems(res.data || []);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (restaurant?.id) {
      loadCategories(restaurant.id);
      loadItems(restaurant.id);
    }
  }, [restaurant?.id]);

  // ================= CREATE =================
  const addItem = async () => {
    try {
      const formData = new FormData();

      formData.append("restaurant_id", restaurant.id);
      formData.append("category_id", selectedCategory);
      formData.append("emertimi", form.emertimi);
      formData.append("pershkrimi", form.pershkrimi);
      formData.append("cmimi", form.cmimi);
      formData.append("disponueshme", 1);
      formData.append("alergjene", "");
      formData.append("kalori", 0);

      if (image) formData.append("foto", image);

      await axios.post("http://localhost:3000/menuitems", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setForm({ emertimi: "", pershkrimi: "", cmimi: "" });
      setSelectedCategory("");
      setImage(null);

      loadItems(restaurant.id);
    } catch (err) {
      console.error(err);
    }
  };

  // ================= DELETE =================
  const deleteItem = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/menuitems/${id}`);
      loadItems(restaurant.id);
    } catch (err) {
      console.error(err);
    }
  };

  // ================= EDIT =================
  const startEdit = (item) => {
    setEditId(item.id);
    setEditForm({
      emertimi: item.emertimi,
      pershkrimi: item.pershkrimi,
      cmimi: item.cmimi,
    });
  };

  const saveEdit = async () => {
    try {
      await axios.put(
        `http://localhost:3000/menuitems/${editId}`,
        editForm
      );

      setEditId(null);
      setEditForm({ emertimi: "", pershkrimi: "", cmimi: "" });

      loadItems(restaurant.id);
    } catch (err) {
      console.error(err);
    }
  };

  // ================= UI =================
  if (!restaurant?.id) return <p>Loading...</p>;

  return (
    <section className="dashboard-section">
      <h2>Menu Items</h2>

      {/* CREATE */}
      <div className="form-box">
        <input
          placeholder="Emri"
          value={form.emertimi}
          onChange={(e) =>
            setForm({ ...form, emertimi: e.target.value })
          }
        />

        <input
          placeholder="Përshkrimi"
          value={form.pershkrimi}
          onChange={(e) =>
            setForm({ ...form, pershkrimi: e.target.value })
          }
        />

        <input
          placeholder="Çmimi"
          type="number"
          value={form.cmimi}
          onChange={(e) =>
            setForm({ ...form, cmimi: e.target.value })
          }
        />

        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          <option value="">Select category</option>
          {categories.map((c) => (
            <option key={c.id} value={c.id}>
              {c.emertimi}
            </option>
          ))}
        </select>

        <input
          type="file"
          onChange={(e) => setImage(e.target.files[0])}
        />

        <button onClick={addItem}>Add Item</button>
      </div>

      {/* LIST */}
      <div className="promo-grid">
        {items.length === 0 ? (
          <p>No menu items</p>
        ) : (
          items.map((item) => (
            <div key={item.id} className="promo-card">

              {editId === item.id ? (
                <>
                  {/* EDIT MODE */}
                  <input
                    value={editForm.emertimi}
                    onChange={(e) =>
                      setEditForm({
                        ...editForm,
                        emertimi: e.target.value,
                      })
                    }
                  />

                  <input
                    value={editForm.pershkrimi}
                    onChange={(e) =>
                      setEditForm({
                        ...editForm,
                        pershkrimi: e.target.value,
                      })
                    }
                  />

                  <input
                    type="number"
                    value={editForm.cmimi}
                    onChange={(e) =>
                      setEditForm({
                        ...editForm,
                        cmimi: e.target.value,
                      })
                    }
                  />

                  <button onClick={saveEdit}>Save</button>
                  <button onClick={() => setEditId(null)}>
                    Cancel
                  </button>
                </>
              ) : (
                <>
                  {/* VIEW MODE */}
                  {item.foto && (
                    <img
                      src={`http://localhost:3000/uploads/${item.foto}`}
                      alt={item.emertimi}
                      style={{
                        width: "100px",
                        height: "100px",
                        objectFit: "cover",
                      }}
                    />
                  )}

                  <h3>{item.emertimi}</h3>
                  <p>{item.pershkrimi}</p>
                  <p>
                    <b>{item.cmimi} €</b>
                  </p>

                  <button onClick={() => startEdit(item)}>
                    Edit
                  </button>

                  <button onClick={() => deleteItem(item.id)}>
                    Delete
                  </button>
                </>
              )}

            </div>
          ))
        )}
      </div>
    </section>
  );
}