const connection = require('../database/database');
class Restaurants {
  constructor(id, emertimi, pershkrimi, adresa, qyteti, user_id) {
    this.id = id;
    this.emertimi = emertimi;
    this.pershkrimi = pershkrimi;
    this.adresa = adresa;
    this.qyteti = qyteti;
    this.user_id = user_id;
  }

  static findAll(callback) {
    connection.query("SELECT * FROM restaurants", (err, rows) => {
      if (err) throw err;
      callback(rows);
    });
  }

  static findById(id, callback) {
    connection.query("SELECT * FROM restaurants WHERE id=?", [id], (err, rows) => {
      if (err) throw err;
      callback(rows[0]);
    });
  }

  static create(data, callback) {
    const query = `INSERT INTO restaurants 
    (emertimi, pershkrimi, adresa, qyteti, user_id) 
    VALUES (?, ?, ?, ?, ?)`;

    connection.query(query, 
      [data.emertimi, data.pershkrimi, data.adresa, data.qyteti, data.user_id],
      (err, result) => {
        if (err) throw err;
        callback(result);
      });
  }

  static update(id, data, callback) {
    const query = `UPDATE restaurants SET emertimi=?, pershkrimi=?, adresa=?, qyteti=? WHERE id=?`;

    connection.query(query,
      [data.emertimi, data.pershkrimi, data.adresa, data.qyteti, id],
      (err) => {
        if (err) throw err;
        callback();
      });
  }

  static delete(id, callback) {
    connection.query("DELETE FROM restaurants WHERE id=?", [id], callback);
  }
}

module.exports = Restaurants;