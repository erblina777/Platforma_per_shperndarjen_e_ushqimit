const connection = require('../database/database');

class Restaurants {

  // GET ALL (rating nga reviews)
  static findAll(callback) {
    const query = `
      SELECT 
        r.id,
        r.emertimi,
        r.qyteti,
        COALESCE(r.status,'inactive') AS status,
        COALESCE((
          SELECT AVG(vleresimi)
          FROM reviews
          WHERE restaurant_id = r.id
        ),0) AS vleresimi
      FROM restaurants r
    `;

    connection.query(query, (err, rows) => {
      if (err) throw err;
      callback(rows);
    });
  }

  static findById(id, callback) {
    const query = `
      SELECT 
        r.id,
        r.emertimi,
        r.qyteti,
        COALESCE(r.status,'inactive') AS status,
        COALESCE((
          SELECT AVG(vleresimi)
          FROM reviews
          WHERE restaurant_id = r.id
        ),0) AS vleresimi
      FROM restaurants r
      WHERE r.id=?
    `;

    connection.query(query, [id], (err, rows) => {
      if (err) throw err;
      callback(rows[0]);
    });
  }

  // CREATE (pa rating)
  static create(data, callback) {
    const query = `
      INSERT INTO restaurants (emertimi, qyteti, status)
      VALUES (?, ?, ?)
    `;

    connection.query(
      query,
      [
        data.emertimi || "",
        data.qyteti || "",
        data.status || "active"
      ],
      (err, result) => {
        if (err) throw err;

        callback({
          id: result.insertId,
          ...data,
          vleresimi: 0
        });
      }
    );
  }

  static update(id, data, callback) {
    const query = `
      UPDATE restaurants
      SET emertimi=?, qyteti=?, status=?
      WHERE id=?
    `;

    connection.query(
      query,
      [
        data.emertimi || "",
        data.qyteti || "",
        data.status || "active",
        id
      ],
      (err) => {
        if (err) throw err;
        callback();
      }
    );
  }

  static delete(id, callback) {
    connection.query(
      "DELETE FROM restaurants WHERE id=?",
      [id],
      (err) => {
        if (err) throw err;
        callback();
      }
    );
  }
}

module.exports = Restaurants;