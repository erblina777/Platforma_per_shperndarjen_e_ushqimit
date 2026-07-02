const connection = require("../database/database");

class RefreshTokens {
  static create(user_id, token, expires) {
    return new Promise((resolve, reject) => {
      connection.query(
        "INSERT INTO RefreshTokens (user_id, token, expires) VALUES (?, ?, ?)",
        [user_id, token, expires],
        (err, result) => {
          if (err) return reject(err);
          resolve(result);
        }
      );
    });
  }
}

module.exports = RefreshTokens;