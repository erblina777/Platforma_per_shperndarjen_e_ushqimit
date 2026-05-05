const db = require('../database/database'); 

class OrderItems {
  constructor(id, order_id, menu_item_id, sasia, cmimi, shenimet) {
    this.id = id;
    this.order_id = order_id;
    this.menu_item_id = menu_item_id;
    this.sasia = sasia;
    this.cmimi = cmimi;
    this.shenimet = shenimet;
  }

  static findAll(callback) {
    db.query('SELECT * FROM orderitems', (err, results) => {
      if (err) return callback(err, null);
      callback(null, results);
    });
  }

  static findById(id, callback) {
    db.query('SELECT * FROM orderitems WHERE id=?', [id], (err, results) => {
      if (err) return callback(err, null);
      callback(null, results[0]);
    });
  }

  static create(item, callback) {
    db.query(
      'INSERT INTO orderitems (order_id, menu_item_id, sasia, cmimi, shenimet) VALUES (?, ?, ?, ?, ?)',
      [item.order_id, item.menu_item_id, item.sasia, item.cmimi, item.shenimet],
      (err, results) => {
        if (err) return callback(err, null);
        callback(null, { id: results.insertId, ...item });
      }
    );
  }

  static update(item, callback) {
    db.query(
      'UPDATE orderitems SET order_id=?, menu_item_id=?, sasia=?, cmimi=?, shenimet=? WHERE id=?',
      [item.order_id, item.menu_item_id, item.sasia, item.cmimi, item.shenimet, item.id],
      (err) => {
        if (err) return callback(err, null);
        callback(null, item);
      }
    );
  }

  static deleteById(id, callback) {
    db.query('DELETE FROM orderitems WHERE id=?', [id], (err) => {
      if (err) return callback(err);
      callback(null);
    });
  }
}

module.exports = OrderItems;