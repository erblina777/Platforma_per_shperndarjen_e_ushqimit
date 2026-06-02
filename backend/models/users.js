const connection = require('../database/database');

class Users {
  constructor(id, emri, mbiemri, email, password_hash, status = "active") {
    this.id = id;
    this.emri = emri;
    this.mbiemri = mbiemri;
    this.email = email;
    this.password_hash = password_hash;
    this.status = status;
  }

  static findAll(callback) {
    connection.query("SELECT * FROM users", (err, rows) => {
      if (err) throw err;

      const users = rows.map(row =>
        new Users(
          row.id,
          row.emri,
          row.mbiemri,
          row.email,
          row.password_hash,
          row.status
        )
      );

      callback(users);
    });
  }

  static findById(id, callback) {
    connection.query("SELECT * FROM users WHERE id=?", [id], (err, rows) => {
      if (err) throw err;
      if (!rows.length) return callback(null);

      const row = rows[0];

      const user = new Users(
        row.id,
        row.emri,
        row.mbiemri,
        row.email,
        row.password_hash,
        row.status
      );

      callback(user);
    });
  }

  static findByEmail(email) {
    return new Promise((resolve, reject) => {
      connection.query(
        "SELECT * FROM users WHERE email=?",
        [email],
        (err, rows) => {
          if (err) return reject(err);
          resolve(rows);
        }
      );
    });
  }

  static create(user, callback) {
    const query =
      "INSERT INTO users (emri, mbiemri, email, password_hash, status) VALUES (?, ?, ?, ?, ?)";

    connection.query(
      query,
      [
        user.emri,
        user.mbiemri,
        user.email,
        user.password_hash,
        user.status
      ],
      (err, result) => {
        if (err) throw err;

        callback({
          id: result.insertId,
          ...user
        });
      }
    );
  }

  static update(user, callback) {
    connection.query(
      "UPDATE users SET emri=?, mbiemri=?, email=?, password_hash=?, status=? WHERE id=?",
      [
        user.emri,
        user.mbiemri,
        user.email,
        user.password_hash,
        user.status,
        user.id
      ],
      (err) => {
        if (err) throw err;
        callback(user);
      }
    );
  }

  static deleteById(id, callback) {
    connection.query("DELETE FROM users WHERE id=?", [id], (err) => {
      if (err) throw err;
      callback();
    });
  }
}

module.exports = Users;