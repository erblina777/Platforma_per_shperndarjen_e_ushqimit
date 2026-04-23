const db = require('../database/database');

class DeliveryDrivers {
  constructor(id, user_id, automjeti, targa, zona, statusi, vleresimi) {
    this.id = id;
    this.user_id = user_id;
    this.automjeti = automjeti;
    this.targa = targa;
    this.zona = zona;
    this.statusi = statusi;
    this.vleresimi = vleresimi;
  }

  static findAll(callback) {
    db.query('SELECT * FROM deliverydrivers', (err, results) => {
      if (err) throw err;
      callback(results);
    });
  }

  static findById(id, callback) {
    db.query('SELECT * FROM deliverydrivers WHERE id=?', [id], (err, results) => {
      if (err) throw err;
      callback(results[0]);
    });
  }

  static create(driver, callback) {
    db.query(
      'INSERT INTO deliverydrivers (user_id, automjeti, targa, zona, statusi, vleresimi) VALUES (?, ?, ?, ?, ?, ?)',
      [driver.user_id, driver.automjeti, driver.targa, driver.zona, driver.statusi, driver.vleresimi],
      (err, results) => {
        if (err) throw err;
        callback({ id: results.insertId, ...driver });
      }
    );
  }

  static update(driver, callback) {
    db.query(
      'UPDATE deliverydrivers SET user_id=?, automjeti=?, targa=?, zona=?, statusi=?, vleresimi=? WHERE id=?',
      [driver.user_id, driver.automjeti, driver.targa, driver.zona, driver.statusi, driver.vleresimi, driver.id],
      (err) => {
        if (err) throw err;
        callback(driver);
      }
    );
  }

  static deleteById(id, callback) {
    db.query('DELETE FROM deliverydrivers WHERE id=?', [id], (err) => {
      if (err) throw err;
      callback();
    });
  }
}

module.exports = DeliveryDrivers;