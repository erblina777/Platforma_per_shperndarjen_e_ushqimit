import { useEffect, useState } from "react";
import axios from "axios";

export default function MenuCategoriesSection({ restaurant }) {
  console.log("RESTAURANT PROP:", restaurant);
  const [categories, setCategories] = useState([]);

  const [form, setForm] = useState({
    emertimi: "",
    pershkrimi: "",
  });

  const [editId, setEditId] = useState(null);
  const [editForm, setEditForm] = useState({
    emertimi: "",
    pershkrimi: "",
  });

  const restaurantId = restaurant?.id;

  // LOAD
  const loadCategories = async () => {
    if (!restaurantId) return;

    try {
      const res = await axios.get(
        `http://localhost:3000/menucategories/restaurant/${restaurantId}`
      );

      setCategories(res.data || []);
    } catch (err) {
      console.error(err);
      setCategories([]);
    }
  };

  useEffect(() => {
    loadCategories();
  }, [restaurantId]);

  // ADD
  const addCategory = async () => {
    if (!restaurantId || !form.emertimi) return;

    try {
      await axios.post("http://localhost:3000/menucategories", {
        restaurant_id: restaurantId,
        emertimi: form.emertimi,
        pershkrimi: form.pershkrimi,
      });

      setForm({ emertimi: "", pershkrimi: "" });
      loadCategories();
    } catch (err) {
      console.error(err);
    }
  };

  // DELETE
  const deleteCategory = async (id) => {
    try {
      await axios.delete(
        `http://localhost:3000/menucategories/${id}`
      );

      loadCategories();
    } catch (err) {
      console.error(err);
    }
  };

  // EDIT
  const startEdit = (cat) => {
    setEditId(cat.id);
    setEditForm({
      emertimi: cat.emertimi,
      pershkrimi: cat.pershkrimi,
    });
  };

  const saveEdit = async () => {
    try {
      await axios.put(
        `http://localhost:3000/menucategories/${editId}`,
        {
          emertimi: editForm.emertimi,
          pershkrimi: editForm.pershkrimi,
          restaurant_id: restaurantId,
        }
      );

      setEditId(null);
      setEditForm({ emertimi: "", pershkrimi: "" });

      loadCategories();
    } catch (err) {
      console.error(err);
    }
  };

  if (!restaurantId) return <p>Loading...</p>;

  return (
    <section className="dashboard-section">
      <h2>Menu Categories</h2>

      {/* FORM */}
      <div className="form-box">
        <input
          placeholder="Category name"
          value={form.emertimi}
          onChange={(e) =>
            setForm({ ...form, emertimi: e.target.value })
          }
        />

        <input
          placeholder="Description"
          value={form.pershkrimi}
          onChange={(e) =>
            setForm({ ...form, pershkrimi: e.target.value })
          }
        />

        <button onClick={addCategory}>Add Category</button>
      </div>

      {/* LIST */}
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