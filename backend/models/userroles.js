const connection = require('../database/database');

class UserRoles {

  static assign(user_id, role_id, callback) {
    connection.query(
      "INSERT INTO UserRoles (user_id, role_id) VALUES (?, ?)",
      [user_id, role_id],
      (err, result) => {
        if (err) throw err;
        callback({ id: result.insertId, user_id, role_id });
      }
    );
  }

  static getAll(callback) {
    connection.query(
      "SELECT * FROM UserRoles",
      (err, rows) => {
        if (err) throw err;
        callback(rows);
      }
    );
  }

  static findByUser(user_id, callback) {
    connection.query(
      "SELECT * FROM UserRoles WHERE user_id=?",
      [user_id],
      (err, rows) => {
        if (err) throw err;
        callback(rows);
      }
    );
  }

  static delete(id, callback) {
    connection.query(
      "DELETE FROM UserRoles WHERE id=?",
      [id],
      (err) => {
        if (err) throw err;
        callback();
      }
    );
  }
}

module.exports = UserRoles;