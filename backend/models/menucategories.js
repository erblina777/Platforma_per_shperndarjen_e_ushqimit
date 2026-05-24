const connection = require('../database/database');

class MenuCategories {

  static findAll(callback) {
    connection.query("SELECT * FROM menucategories", (err, rows) => {
      if (err) return callback(err);
      callback(null, rows);
    });
  }

  static getByRestaurantId(id, callback) {
    connection.query(
      "SELECT * FROM menucategories WHERE restaurant_id = ?",
      [id],
      (err, rows) => {
        if (err) return callback(err);
        callback(null, rows);
      }
    );
  }

  static findById(id, callback) {
    connection.query(
      "SELECT * FROM menucategories WHERE id=?",
      [id],
      (err, rows) => {
        if (err) return callback(err);
        callback(null, rows[0]);
      }
    );
  }

  static create(data, callback) {
    const q = `
      INSERT INTO menucategories (restaurant_id, emertimi, pershkrimi, renditja)
      VALUES (?, ?, ?, ?)
    `;

    connection.query(
      q,
      [data.restaurant_id, data.emertimi, data.pershkrimi, data.renditja],
      (err, result) => {
        if (err) return callback(err);
        callback(null, { id: result.insertId, ...data });
      }
    );
  }

  static update(id, data, callback) {
    const q = `
      UPDATE menucategories
      SET emertimi=?, pershkrimi=?, restaurant_id=?, renditja=?
      WHERE id=?
    `;

    connection.query(
      q,
      [
        data.emertimi,
        data.pershkrimi,
        data.restaurant_id,
        data.renditja,
        id
      ],
      (err, result) => {
        if (err) return callback(err);
        callback(null, result);
      }
    );
  }

  static delete(id, callback) {
    connection.query(
      "DELETE FROM menucategories WHERE id=?",
      [id],
      (err, result) => {
        if (err) return callback(err);
        callback(null, result);
      }
    );
  }
}

module.exports = MenuCategories;