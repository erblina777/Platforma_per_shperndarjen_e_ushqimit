const connection = require('../database/database');

class Promotions {
  constructor(
    id,
    restaurant_id,
    kodi,
    zbritja_perqind,
    zbritja_max,
    data_fillimit,
    data_perfundimit,
    statusi
  ) {
    this.id = id;
    this.restaurant_id = restaurant_id;
    this.kodi = kodi;
    this.zbritja_perqind = zbritja_perqind;
    this.zbritja_max = zbritja_max;
    this.data_fillimit = data_fillimit;
    this.data_perfundimit = data_perfundimit;
    this.statusi = statusi;
  }

  static findAll(callback) {
    connection.query("SELECT * FROM promotions", (err, rows) => {
      if (err) throw err;
      callback(rows);
    });
  }
  static findByRestaurantId(restaurantId, callback) {
    connection.query(
      "SELECT * FROM promotions WHERE restaurant_id = ?",
      [restaurantId],
      (err, rows) => {
        if (err) throw err;
        callback(rows);
      }
    );
  }
  static findById(id, callback) {
    connection.query("SELECT * FROM promotions WHERE id=?", [id], (err, rows) => {
      if (err) throw err;
      callback(rows[0]);
    });
  }

  static create(promotion, callback) {
    connection.query(
      `INSERT INTO promotions 
      (restaurant_id, kodi, zbritja_perqind, zbritja_max, data_fillimit, data_perfundimit, statusi) 
      VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [
        promotion.restaurant_id,
        promotion.kodi,
        promotion.zbritja_perqind,
        promotion.zbritja_max,
        promotion.data_fillimit,
        promotion.data_perfundimit,
        promotion.statusi
      ],
      (err, result) => {
        if (err) throw err;
        callback({ id: result.insertId, ...promotion });
      }
    );
  }

  static update(promotion, callback) {
    connection.query(
      `UPDATE promotions 
       SET restaurant_id=?, kodi=?, zbritja_perqind=?, zbritja_max=?, data_fillimit=?, data_perfundimit=?, statusi=? 
       WHERE id=?`,
      [
        promotion.restaurant_id,
        promotion.kodi,
        promotion.zbritja_perqind,
        promotion.zbritja_max,
        promotion.data_fillimit,
        promotion.data_perfundimit,
        promotion.statusi,
        promotion.id
      ],
      (err) => {
        if (err) throw err;
        callback(promotion);
      }
    );
  }

  static deleteById(id, callback) {
    connection.query(
      "DELETE FROM promotions WHERE id=?",
      [id],
      (err) => {
        if (err) throw err;
        callback();
      }
    );
  }
}

module.exports = Promotions;