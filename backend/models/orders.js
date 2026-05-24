const connection = require('../database/database');

class Orders {
  static findAll(cb) {
    connection.query("SELECT * FROM orders", (err, rows) => {
      if (err) throw err;
      cb(rows);
    });
  }
  static getByRestaurantIdDetailed(id, cb) {
    const q = `
      SELECT 
        o.id,
        o.statusi,
        o.shuma_totale,
        o.user_id,
        o.restaurant_id,
        o.data_porosise,

        oi.menu_item_id,
        oi.sasia,
        oi.cmimi,

        mi.emertimi AS item_name,
        mi.cmimi AS item_price

      FROM orders o
      LEFT JOIN orderitems oi ON o.id = oi.order_id
      LEFT JOIN menuitems mi ON mi.id = oi.menu_item_id
      WHERE o.restaurant_id = ?
    `;

    connection.query(q, [id], (err, rows) => {
      if (err) return cb(err);
      cb(null, rows);
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