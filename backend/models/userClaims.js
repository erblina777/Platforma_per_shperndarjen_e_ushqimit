const connection = require("../database/database");

class UserClaims {
  static create(user_id, claim_type, claim_value) {
    return new Promise((resolve, reject) => {
      connection.query(
        "INSERT INTO UserClaims (user_id, claim_type, claim_value) VALUES (?, ?, ?)",
        [user_id, claim_type, claim_value],
        (err, result) => {
          if (err) return reject(err);
          resolve(result);
        }
      );
    });
  }
}

module.exports = UserClaims;