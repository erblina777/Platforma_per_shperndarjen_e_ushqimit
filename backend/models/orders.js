const connection = require('../database/database');

class Orders {
  static findAll(cb) {
    connection.query("SELECT * FROM orders", (err, rows) => {
      if (err) throw err;
      cb(rows);
    });
  }

  static findById(id, cb) {
    connection.query("SELECT * FROM orders WHERE id=?", [id], (err, rows) => {
      if (err) throw err;
      cb(rows[0]);
    });
  }

  static create(data, cb) {
    const q = `INSERT INTO orders 
    (user_id, restaurant_id, adresa_dorezimit, shuma_totale, statusi, metoda_pageses)
    VALUES (?, ?, ?, ?, ?, ?)`;

    connection.query(q, [
      data.user_id,
      data.restaurant_id,
      data.adresa_dorezimit,
      data.shuma_totale,
      data.statusi,
      data.metoda_pageses
    ], (err, result) => {
      if (err) throw err;
      cb({ id: result.insertId, ...data });
    });
  }

  static update(id, data, cb) {
    const q = `UPDATE orders SET statusi=? WHERE id=?`;

    connection.query(q, [data.statusi, id], (err) => {
      if (err) throw err;
      cb({ id, ...data });
    });
  }

  static delete(id, cb) {
    connection.query("DELETE FROM orders WHERE id=?", [id], cb);
  }
}

module.exports = Orders;