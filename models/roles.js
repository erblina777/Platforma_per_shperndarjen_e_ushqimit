const connection = require('../database/database');

class Roles {
  constructor(id, emertimi, pershkrimi) {
    this.id = id;
    this.emertimi = emertimi;
    this.pershkrimi = pershkrimi;
  }

  static findAll(callback) {
    connection.query("SELECT * FROM Roles", (err, rows) => {
      if (err) throw err;
      callback(rows);
    });
  }

  static findById(id, callback) {
    connection.query("SELECT * FROM Roles WHERE id=?", [id], (err, rows) => {
      if (err) throw err;
      callback(rows[0]);
    });
  }

  static create(role, callback) {
    connection.query(
      "INSERT INTO Roles (emertimi, pershkrimi) VALUES (?, ?)",
      [role.emertimi, role.pershkrimi],
      (err, result) => {
        if (err) throw err;
        callback({ id: result.insertId, ...role });
      }
    );
  }

  static update(role, callback) {
    connection.query(
      "UPDATE Roles SET emertimi=?, pershkrimi=? WHERE id=?",
      [role.emertimi, role.pershkrimi, role.id],
      (err) => {
        if (err) throw err;
        callback(role);
      }
    );
  }

  static deleteById(id, callback) {
    connection.query(
      "DELETE FROM Roles WHERE id=?",
      [id],
      (err) => {
        if (err) throw err;
        callback();
      }
    );
  }
}

module.exports = Roles;