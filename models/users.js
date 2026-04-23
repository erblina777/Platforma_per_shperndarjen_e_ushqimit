const connection = require('../database/database');

class Users {
  constructor(id, emri, mbiemri, email, password_hash, status = "active") {
    this.id = id;
    this.emri = emri;
    this.mbiemri = mbiemri;
    this.email = email;
    this.password_hash = password_hash;
    this.status = status
  }

  static findAll(callback) {
    const query = "SELECT * FROM users";
    connection.query(query, (err, rows) => {
      if (err) throw err;
      const users = rows.map(row => new Users(row.id, row.emri, row.mbiemri, row.email, row.password_hash, row.status));
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
    const query = "INSERT INTO users (emri, mbiemri, email, password_hash, status) VALUES (?, ?, ?, ?, ?)";
    const values = [user.emri, user.mbiemri, user.email, user.password_hash, "active"];

    connection.query(query, values, (err, result) => {
      if (err) throw err;

      const newUser = new Users(result.insertId, user.emri, user.email, user.password);
      callback(newUser);
    });
  }

  static update(user, callback) {
    const query = "UPDATE users SET emri=?, mbiemri=?, email=?, password_hash=?, status=? WHERE id=?";
    const values = [user.emri, user.mbiemri , user.email, user.password_hash, user.status, user.id];

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
  static ndryshoStatusin(id, status, callback) {
  const query = "UPDATE Users SET status=? WHERE id=?";
  connection.query(query, [status, id], (err) => {
    if (err) throw err;
    callback();
  });
}
}

module.exports = Users;