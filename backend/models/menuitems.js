const connection = require('../database/database');

class MenuItems {
  static findAll(cb) {
    connection.query("SELECT * FROM menuitems", (err, rows) => {
      if (err) throw err;
      cb(rows);
    });
  }

  static findById(id, cb) {
    connection.query("SELECT * FROM menuitems WHERE id=?", [id], (err, rows) => {
      if (err) throw err;
      cb(rows[0]);
    });
  }

  static create(data, cb) {
    const q = `INSERT INTO menuitems 
    (category_id, emertimi, pershkrimi, cmimi, foto, disponueshme, alergjene, kalori)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;

    connection.query(q, [
      data.category_id,
      data.emertimi,
      data.pershkrimi,
      data.cmimi,
      data.foto,
      data.disponueshme,
      data.alergjene,
      data.kalori
    ], (err, result) => {
      if (err) throw err;
      cb({ id: result.insertId, ...data });
    });
  }

  static update(id, data, cb) {
    const q = `UPDATE menuitems SET emertimi=?, pershkrimi=?, cmimi=? WHERE id=?`;

    connection.query(q, [data.emertimi, data.pershkrimi, data.cmimi, id], (err) => {
      if (err) throw err;
      cb({ id, ...data });
    });
  }

  static delete(id, cb) {
    connection.query("DELETE FROM menuitems WHERE id=?", [id], cb);
  }
}

module.exports = MenuItems;