const db = require('../database/database');

class Deliveries {
  constructor(id, order_id, driver_id, statusi, data_marrjes, data_dorezimit, koha_vleresuar) {
    this.id = id;
    this.order_id = order_id;
    this.driver_id = driver_id;
    this.statusi = statusi;
    this.data_marrjes = data_marrjes;
    this.data_dorezimit = data_dorezimit;
    this.koha_vleresuar = koha_vleresuar;
  }

  static findAll(callback) {
    db.query('SELECT * FROM deliveries', (err, results) => {
      if (err) throw err;
      callback(results);
    });
  }

  static findById(id, callback) {
    db.query('SELECT * FROM deliveries WHERE id=?', [id], (err, results) => {
      if (err) throw err;
      callback(results[0]);
    });
  }

  static create(delivery, callback) {
    db.query(
      'INSERT INTO deliveries (order_id, driver_id, statusi, data_marrjes, data_dorezimit, koha_vleresuar) VALUES (?, ?, ?, ?, ?, ?)',
      [
        delivery.order_id,
        delivery.driver_id,
        delivery.statusi,
        delivery.data_marrjes,
        delivery.data_dorezimit,
        delivery.koha_vleresuar
      ],
      (err, results) => {
        if (err) throw err;
        callback({ id: results.insertId, ...delivery });
      }
    );
  }

  static update(delivery, callback) {
    db.query(
      'UPDATE deliveries SET order_id=?, driver_id=?, statusi=?, data_marrjes=?, data_dorezimit=?, koha_vleresuar=? WHERE id=?',
      [
        delivery.order_id,
        delivery.driver_id,
        delivery.statusi,
        delivery.data_marrjes,
        delivery.data_dorezimit,
        delivery.koha_vleresuar,
        delivery.id
      ],
      (err) => {
        if (err) throw err;
        callback(delivery);
      }
    );
  }

  static deleteById(id, callback) {
    db.query('DELETE FROM deliveries WHERE id=?', [id], (err) => {
      if (err) throw err;
      callback();
    });
  }
}

module.exports = Deliveries;