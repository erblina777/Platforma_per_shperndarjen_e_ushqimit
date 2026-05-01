const connection = require('../database/database');

class Address {
  constructor(id, user_id, emertimi, adresa, qyteti, koordinatat, eshte_kryesore) {
    this.id = id;
    this.user_id = user_id;
    this.emertimi = emertimi;
    this.adresa = adresa;
    this.qyteti = qyteti;
    this.koordinatat = koordinatat;
    this.eshte_kryesore = eshte_kryesore;
  }

  static findAll(callback) {
    connection.query("SELECT * FROM addresses", (err, rows) => {
      if (err) throw err;
      callback(rows);
    });
  }

  static findById(id, callback) {
    connection.query("SELECT * FROM addresses WHERE id=?", [id], (err, rows) => {
      if (err) throw err;
      callback(rows[0]);
    });
  }

  static create(address, callback) {
    connection.query(
      `INSERT INTO addresses 
      (user_id, emertimi, adresa, qyteti, koordinatat, eshte_kryesore) 
      VALUES (?, ?, ?, ?, ?, ?)`,
      [
        address.user_id,
        address.emertimi,
        address.adresa,
        address.qyteti,
        address.koordinatat,
        address.eshte_kryesore
      ],
      (err, result) => {
        if (err) throw err;
        callback({ id: result.insertId, ...address });
      }
    );
  }

  static update(address, callback) {
    connection.query(
      `UPDATE addresses 
       SET user_id=?, emertimi=?, adresa=?, qyteti=?, koordinatat=?, eshte_kryesore=? 
       WHERE id=?`,
      [
        address.user_id,
        address.emertimi,
        address.adresa,
        address.qyteti,
        address.koordinatat,
        address.eshte_kryesore,
        address.id
      ],
      (err) => {
        if (err) throw err;
        callback(address);
      }
    );
  }

  static deleteById(id, callback) {
    connection.query(
      "DELETE FROM addresses WHERE id=?",
      [id],
      (err) => {
        if (err) throw err;
        callback();
      }
    );
  }
}

module.exports = Address;