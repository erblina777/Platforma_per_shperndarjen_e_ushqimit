const connection = require('../database/database');

class Users {
  constructor(id, emri, email, password) {
    this.id = id;
    this.emri = emri;
    this.email = email;
    this.password = password;
  }

  static findAll(callback) {
    const query = "SELECT * FROM users";
    connection.query(query, (err, rows) => {
      if (err) throw err;
      const users = rows.map(row => new Users(row.id, row.emri, row.email, row.password));
      callback(users);
    });
  }

  static findById(id, callback) {
    const query = "SELECT * FROM users WHERE id=?";
    connection.query(query, [id], (err, rows) => {
      if (err) throw err;

      if (rows.length === 0) return callback(null);

      const user = new Users(rows[0].id, rows[0].emri, rows[0].email, rows[0].password);
      callback(user);
    });
  }

  static findByEmail(email) {
    return new Promise((resolve, reject) => {
      const query = "SELECT * FROM users WHERE email=?";
      connection.query(query, [email], (err, rows) => {
        if (err) reject(err);
        resolve(rows);
      });
    });
  }

  static create(user, callback) {
    const query = "INSERT INTO users (emri, email, password) VALUES (?, ?, ?)";
    const values = [user.emri, user.email, user.password];

    connection.query(query, values, (err, result) => {
      if (err) throw err;

      const newUser = new Users(result.insertId, user.emri, user.email, user.password);
      callback(newUser);
    });
  }

  static update(user, callback) {
    const query = "UPDATE users SET emri=?, email=?, password=? WHERE id=?";
    const values = [user.emri, user.email, user.password, user.id];

    connection.query(query, values, (err) => {
      if (err) throw err;
      callback(user);
    });
  }

  static deleteById(id, callback) {
    const query = "DELETE FROM users WHERE id=?";
    connection.query(query, [id], (err) => {
      if (err) throw err;
      callback();
    });
  }
}

module.exports = Users;