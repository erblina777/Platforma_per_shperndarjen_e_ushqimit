const connection = require('../database/database');
const OrderItems = require("./orderitems");

class Orders {

  static findAll(cb) {
    const q = `
      SELECT 
        o.*,
        CONCAT(u.emri, ' ', u.mbiemri) AS user_name,
        r.emertimi AS restaurant_name,

        oi.id AS order_item_id,
        oi.menu_item_id,
        oi.sasia,
        oi.cmimi AS item_price,
        mi.emertimi AS item_name

      FROM orders o
      LEFT JOIN users u ON o.user_id = u.id
      LEFT JOIN restaurants r ON o.restaurant_id = r.id
      LEFT JOIN orderitems oi ON o.id = oi.order_id
      LEFT JOIN menuitems mi ON mi.id = oi.menu_item_id
    `;

    connection.query(q, (err, rows) => {
      if (err) throw err;

      const ordersMap = {};

      rows.forEach(row => {
        if (!ordersMap[row.id]) {
          ordersMap[row.id] = {
            id: row.id,
            user_name: row.user_name,
            restaurant_name: row.restaurant_name,
            shuma_totale: row.shuma_totale,
            statusi: row.statusi,
            metoda_pageses: row.metoda_pageses,
            adresa_dorezimit: row.adresa_dorezimit,
            items: []
          };
        }

        if (row.order_item_id) {
          ordersMap[row.id].items.push({
            id: row.order_item_id,
            menu_item_id: row.menu_item_id,
            name: row.item_name,
            quantity: row.sasia,
            price: row.item_price
          });
        }
      });

      cb(Object.values(ordersMap));
    });
  }

  static getByRestaurantIdDetailed(id, cb) {
    const q = `
      SELECT 
        o.id,
        o.statusi,
        o.shuma_totale,
        o.user_id,
        o.restaurant_id,
        o.data_porosise,

        oi.menu_item_id,
        oi.sasia,
        oi.cmimi,

        mi.emertimi AS item_name,
        mi.cmimi AS item_price

      FROM orders o
      LEFT JOIN orderitems oi ON o.id = oi.order_id
      LEFT JOIN menuitems mi ON mi.id = oi.menu_item_id
      WHERE o.restaurant_id = ?
    `;

    connection.query(q, [id], (err, rows) => {
      if (err) return cb(err);
      cb(null, rows);
    });
  }

  static findById(id, cb) {
    connection.query(
      "SELECT * FROM orders WHERE id=?",
      [id],
      (err, rows) => {
        if (err) throw err;
        cb(rows[0]);
      }
    );
  }

  static create(data, cb) {
    const q = `
      INSERT INTO orders
      (
        user_id,
        restaurant_id,
        adresa_dorezimit,
        shuma_totale,
        tarifa_dorezimit,
        zbritja,
        statusi,
        metoda_pageses,
        shenimet
      )
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    connection.query(
      q,
      [
        data.user_id,
        data.restaurant_id,
        data.adresa_dorezimit,
        data.shuma_totale,
        data.tarifa_dorezimit,
        data.zbritja,
        data.statusi,
        data.metoda_pageses,
        data.shenimet
      ],
      /*(err, result) => {
        if (err) throw err;

        cb({
          id: result.insertId,
          ...data
        });
      }*/
     (err, result) => {
  if (err) throw err;

  const orderId = result.insertId;

  if (data.items && data.items.length > 0) {

    let completed = 0;

    data.items.forEach(item => {

      const orderItem = {
        order_id: orderId,
        menu_item_id: item.id,
        sasia: item.quantity,
        cmimi: item.cmimi,
        shenimet: data.shenimet || ""
      };

      OrderItems.create(orderItem, () => {

        completed++;

        if (completed === data.items.length) {
          cb({
            id: orderId,
            ...data
          });
        }
      });

    });

  } else {
    cb({
      id: orderId,
      ...data
    });
  }
}
    );
  }

  static update(id, data, cb) {
    const q = `
      UPDATE orders
      SET
        statusi = ?
      WHERE id = ?
    `;

    connection.query(
      q,
      [
        data.statusi,
        id
      ],
      (err) => {
        if (err) throw err;

        cb({
          id,
          statusi: data.statusi
        });
      }
    );
  }

  static delete(id, cb) {
    connection.query(
      "DELETE FROM orders WHERE id=?",
      [id],
      (err, result) => {
        if (err) throw err;
        cb(result);
      }
    );
  }

}

module.exports = Orders;