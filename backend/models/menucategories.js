const connection = require('../database/database');

class MenuCategories {
  constructor(id, restaurant_id, emertimi, pershkrimi, renditja) {
    this.id = id;
    this.restaurant_id = restaurant_id;
    this.emertimi = emertimi;
    this.pershkrimi = pershkrimi;
    this.renditja = renditja;
  }

  static findAll(callback) {
    connection.query("SELECT * FROM menucategories", (err, rows) => {
      if (err) throw err;
      callback(rows);
    });
  }

  static findById(id, callback) {
    connection.query("SELECT * FROM menucategories WHERE id=?", [id], (err, rows) => {
      if (err) throw err;
      callback(rows[0]);
    });
  }

  static create(data, callback) {
    const q = `INSERT INTO menucategories (restaurant_id, emertimi, pershkrimi, renditja)
               VALUES (?, ?, ?, ?)`;

    connection.query(q,
      [data.restaurant_id, data.emertimi, data.pershkrimi, data.renditja],
      (err, result) => {
        if (err) throw err;
        callback({ id: result.insertId, ...data });
      });
  }

  static update(id, data, callback) {
    const q = `UPDATE menucategories SET restaurant_id=?, emertimi=?, pershkrimi=?, renditja=? WHERE id=?`;

    connection.query(q,
      [data.restaurant_id, data.emertimi, data.pershkrimi, data.renditja, id],
      (err) => {
        if (err) throw err;
        callback({ id, ...data });
      });
  }

  static delete(id, callback) {
    connection.query("DELETE FROM menucategories WHERE id=?", [id], callback);
  }
}

module.exports = MenuCategories;