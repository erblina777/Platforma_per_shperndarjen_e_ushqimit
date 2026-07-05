const db = require('../database/database');

class Deliveries {

  static findAll(cb) {
    db.query("SELECT * FROM deliveries", (err, res) => {
      if (err) return cb(err);
      cb(null, res);
    });
  }

  static findOrderStatusUpdate(order_id, statusi, cb) {
    db.query(
      "UPDATE orders SET statusi=? WHERE id=?",
      [statusi, order_id],
      cb
    );
  }

  static create(data, cb) {
    const q = `
      INSERT INTO deliveries
      (order_id, driver_id, statusi, data_marrjes, data_dorezimit, koha_vleresuar)
      VALUES (?, ?, ?, ?, ?, ?)
    `;

    db.query(q, [
      data.order_id,
      data.driver_id,
      data.statusi,
      data.data_marrjes,
      data.data_dorezimit,
      data.koha_vleresuar
    ], (err, result) => {
      if (err) return cb(err);

      cb(null, {
        id: result.insertId,
        ...data
      });
    });
  }
  static findById(id, cb) {
    db.query(
      "SELECT * FROM deliveries WHERE id=?",
      [id],
      (err, res) => {
        if (err) return cb(err);
        cb(null, res[0]);
      }
    );
  }
  static update(id, data, cb) {
    const q = `
      UPDATE deliveries
      SET order_id=?, driver_id=?, statusi=?, data_marrjes=?, data_dorezimit=?, koha_vleresuar=?
      WHERE id=?
    `;

    db.query(q, [
      data.order_id,
      data.driver_id,
      data.statusi,
      data.data_marrjes,
      data.data_dorezimit,
      data.koha_vleresuar,
      id
    ], (err) => {
      if (err) return cb(err);

      cb(null, { id, ...data });
    });
  }

  static delete(id, cb) {
    db.query("DELETE FROM deliveries WHERE id=?", [id], cb);
  }
}

module.exports = Deliveries;