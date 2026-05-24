const connection = require('../database/database');

class Reviews {
  constructor(id, order_id, user_id, restaurant_id, vleresimi, komenti) {
    this.id = id;
    this.order_id = order_id;
    this.user_id = user_id;
    this.restaurant_id = restaurant_id;
    this.vleresimi = vleresimi;
    this.komenti = komenti;
  }

  static findAll(callback) {
    connection.query("SELECT * FROM reviews", (err, rows) => {
      if (err) throw err;
      callback(rows);
    });
  }
  static getByRestaurantId(id) {
    return new Promise((resolve, reject) => {
      connection.query(
        "SELECT * FROM reviews WHERE restaurant_id = ?",
        [id],
        (err, rows) => {
          if (err) reject(err);
          else resolve(rows);
        }
      );
    });
  }

  static findById(id, callback) {
    connection.query("SELECT * FROM reviews WHERE id=?", [id], (err, rows) => {
      if (err) throw err;
      callback(rows[0]);
    });
  }

  static create(review, callback) {
    connection.query(
      `INSERT INTO reviews 
      (order_id, user_id, restaurant_id, vleresimi, komenti) 
      VALUES (?, ?, ?, ?, ?)`,
      [
        review.order_id,
        review.user_id,
        review.restaurant_id,
        review.vleresimi,
        review.komenti
      ],
      (err, result) => {
        if (err) throw err;
        callback({ id: result.insertId, ...review });
      }
    );
  }

  static update(review, callback) {
    connection.query(
      `UPDATE reviews 
       SET order_id=?, user_id=?, restaurant_id=?, vleresimi=?, komenti=? 
       WHERE id=?`,
      [
        review.order_id,
        review.user_id,
        review.restaurant_id,
        review.vleresimi,
        review.komenti,
        review.id
      ],
      (err) => {
        if (err) throw err;
        callback(review);
      }
    );
  }

  static deleteById(id, callback) {
    connection.query(
      "DELETE FROM reviews WHERE id=?",
      [id],
      (err) => {
        if (err) throw err;
        callback();
      }
    );
  }
}

module.exports = Reviews;