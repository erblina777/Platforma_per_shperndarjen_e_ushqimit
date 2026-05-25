import { useEffect, useState } from "react";
import axios from "axios";

export default function MenuCategoriesSection({ restaurant }) {
  const [categories, setCategories] = useState([]);

  const [form, setForm] = useState({
    emri: "",
    pershkrimi: "",
  });

  const [editId, setEditId] = useState(null);
  const [editForm, setEditForm] = useState({
    emri: "",
    pershkrimi: "",
  });

  const loadCategories = async (id) => {
    try {
      const res = await axios.get(
        `http://localhost:3000/menucategories/restaurant/${id}`
      );

      setCategories(res.data || []);
    } catch (err) {
      console.error("LOAD ERROR:", err);
      setCategories([]);
    }
  };

  useEffect(() => {
    if (restaurant?.id) {
      loadCategories(restaurant.id);
    }
  }, [restaurant?.id]);

  const addCategory = async () => {
    if (!form.emertimi) return;

    try {
        const payload = {
        restaurant_id: restaurant.id,
        emertimi: form.emertimi,
        pershkrimi: form.pershkrimi,
        };

        await axios.post(
        "http://localhost:3000/menucategories",
        payload
        );

        setForm({ emertimi: "", pershkrimi: "" });

        loadCategories(restaurant.id);
    } catch (err) {
        console.error("ADD ERROR:", err.response?.data || err);
    }
    };

  const deleteCategory = async (id) => {
    try {
      await axios.delete(
        `http://localhost:3000/menucategories/${id}`
      );

      loadCategories(restaurant.id);
    } catch (err) {
      console.error("DELETE ERROR:", err);
    }
  };

  const startEdit = (cat) => {
    setEditId(cat.id);
    setEditForm({
      emertimi: cat.emertimi,
      pershkrimi: cat.pershkrimi,
    });
  };

  const saveEdit = async () => {
    try {
        const payload = {
        emertimi: editForm.emertimi,
        pershkrimi: editForm.pershkrimi,
        restaurant_id: restaurant.id, // 🔥 SHUMË E RËNDËSISHME
        };

        await axios.put(
    `http://localhost:3000/menucategories/${editId}`,
    {
        emertimi: editForm.emertimi,
        pershkrimi: editForm.pershkrimi,
        restaurant_id: restaurant.id
    }
    );

        setEditId(null);
        setEditForm({ emertimi: "", pershkrimi: "" });

        loadCategories(restaurant.id);
    } catch (err) {
        console.error("UPDATE ERROR:", err.response?.data || err);
    }
    };

  if (!restaurant?.id) return <p>Loading...</p>;

  return (
    <section className="dashboard-section">
      <h2>Menu Categories</h2>

      <div className="form-box">
        <input
          name="emertimi"
          placeholder="Category name"
          value={form.emertimi}
          onChange={(e) =>
            setForm({ ...form, emertimi: e.target.value })
          }
        />

        <input
          name="pershkrimi"
          placeholder="Description"
          value={form.pershkrimi}
          onChange={(e) =>
            setForm({ ...form, pershkrimi: e.target.value })
          }
        />

        <button onClick={addCategory}>Add Category</button>
      </div>

      <div className="promo-grid">
        {categories.length === 0 ? (
          <p>No categories found</p>
        ) : (
          categories.map((cat) => (
            <div className="promo-card" key={cat.id}>

              {editId === cat.id ? (
                <>
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

                  <button onClick={saveEdit}>Save</button>
                  <button onClick={() => setEditId(null)}>
                    Cancel
                  </button>
                </>
              ) : (
                <>
                  {/* VIEW MODE */}
                  <h3>{cat.emertimi}</h3>
                  <p>{cat.pershkrimi}</p>

                  <button onClick={() => startEdit(cat)}>
                    Edit
                  </button>

                  <button onClick={() => deleteCategory(cat.id)}>
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