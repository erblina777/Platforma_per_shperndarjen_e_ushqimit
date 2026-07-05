const connection = require('../database/database');

class MenuItems {
  static findAll(filters, cb) {

    let query = `
      SELECT 
        mi.*,
        mc.emertimi AS category_name,
        r.id AS restaurant_id,
        r.emertimi AS restaurant_name
      FROM menuitems mi
      JOIN menucategories mc 
        ON mi.category_id = mc.id
      JOIN restaurants r 
        ON mc.restaurant_id = r.id
      WHERE 1=1
    `;

    const values = [];

    // SEARCH

    if (filters.search && filters.search.trim() !== "") {
      query += ` AND mi.emertimi LIKE ?`;
      values.push(`%${filters.search}%`);
    }

    // MIN PRICE

    if (filters.minPrice !== "" && filters.minPrice != null) {
      query += ` AND mi.cmimi >= ?`;
      values.push(Number(filters.minPrice));
    }

    // MAX PRICE

    if (filters.maxPrice !== "" && filters.maxPrice != null) {
      query += ` AND mi.cmimi <= ?`;
      values.push(Number(filters.maxPrice));
    }

    connection.query(query, values, (err, rows) => {

      if (err) {
        console.log(err);
        return cb([]);
      }

      cb(rows);
    });
  }
  static findByRestaurantId(restaurantId, cb) {
    connection.query(
      `
      SELECT mi.*
      FROM menuitems mi
      JOIN menucategories mc 
        ON mi.category_id = mc.id
      WHERE mc.restaurant_id = ?
      `,
      [restaurantId],
      (err, rows) => {
        if (err) throw err;
        cb(rows);
      }
    );
  }
  static findById(id, cb) {
    connection.query("SELECT * FROM menuitems WHERE id=?", [id], (err, rows) => {
      if (err) throw err;
      cb(rows[0]);
    });
  }

  static create(data, cb) {
    const q = `INSERT INTO menuitems 
    (category_id, emertimi, pershkrimi, cmimi, foto, disponueshme, alergjene, kalori)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;

    connection.query(q, [
      data.category_id,
      data.emertimi,
      data.pershkrimi,
      data.cmimi,
      data.foto,
      data.disponueshme,
      data.alergjene,
      data.kalori
    ], (err, result) => {
      if (err) throw err;
      cb({ id: result.insertId, ...data });
    });
  }

  static update(id, data, cb) {
    const q = `UPDATE menuitems SET emertimi=?, pershkrimi=?, cmimi=? WHERE id=?`;

    connection.query(q, [data.emertimi, data.pershkrimi, data.cmimi, id], (err) => {
      if (err) throw err;
      cb({ id, ...data });
    });
  }

  static delete(id, cb) {
    connection.query("DELETE FROM menuitems WHERE id=?", [id], cb);
  }
}

module.exports = MenuItems;