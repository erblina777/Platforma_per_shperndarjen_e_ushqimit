const connection = require("../database/database");

class UserTokens {
  static create(user_id, provider, token_name, token_value) {
    return new Promise((resolve, reject) => {
      connection.query(
        "INSERT INTO UserTokens (user_id, login_provider, token_name, token_value) VALUES (?, ?, ?, ?)",
        [user_id, provider, token_name, token_value],
        (err, result) => {
          if (err) return reject(err);
          resolve(result);
        }
      );
    });
  }
}

module.exports = UserTokens;