const connection = require('../database/database');
class Restaurants {
  constructor(id, emertimi, pershkrimi, adresa, qyteti, user_id) {
    this.id = id;
    this.emertimi = emertimi;
    this.pershkrimi = pershkrimi;
    this.adresa = adresa;
    this.qyteti = qyteti;
    this.user_id = user_id;
  }

  static findAll(callback) {
    const query = `
      SELECT
        r.*,
        CONCAT(u.emri, ' ', u.mbiemri) AS owner,
        u.email AS owner_email
      FROM restaurants r
      LEFT JOIN users u
        ON r.user_id = u.id
    `;

    connection.query(query, (err, rows) => {
      if (err) throw err;
      callback(rows);
    });
  }

  static findById(id, callback) {
    const query = `
      SELECT
        r.*,
        CONCAT(u.emri, ' ', u.mbiemri) AS owner,
        u.email AS owner_email
      FROM restaurants r
      LEFT JOIN users u
        ON r.user_id = u.id
      WHERE r.id = ?
    `;

    connection.query(query, [id], (err, rows) => {
      if (err) throw err;
      callback(rows[0]);
    });
  }
  static findByUserId(user_id, callback) {
    connection.query(
      "SELECT * FROM restaurants WHERE user_id = ?",
      [user_id],
      (err, rows) => {
        if (err) throw err;
        callback(rows);
      }
    );
  }
  static create(data, callback) {
    const query = `
    INSERT INTO restaurants
    (
    emertimi,
    pershkrimi,
    adresa,
    qyteti,
    telefoni,
    email,
    logo,
    orari_hapjes,
    orari_mbylljes,
    vleresimi,
    status,
    user_id
    )
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    connection.query(
      query,
      [
        data.emertimi,
        data.pershkrimi,
        data.adresa,
        data.qyteti,
        data.telefoni,
        data.email,
        data.logo,
        data.orari_hapjes,
        data.orari_mbylljes,
        data.vleresimi,
        data.status,
        data.user_id,
      ],
      (err, result) => {
        if (err) throw err;
        callback(result);
      }
    );
  }

  static update(id, data, callback) {
    const query = `
      UPDATE restaurants 
      SET 
        emertimi = ?,
        pershkrimi = ?,
        adresa = ?,
        qyteti = ?,
        telefoni = ?,
        email = ?,
        logo = ?,
        orari_hapjes = ?,
        orari_mbylljes = ?,
        vleresimi = ?,
        status = ?,
        user_id = ?
      WHERE id = ?
    `;

    connection.query(
      query,
      [
        data.emertimi,
        data.pershkrimi,
        data.adresa,
        data.qyteti,
        data.telefoni,
        data.email,
        data.logo,
        data.orari_hapjes,
        data.orari_mbylljes,
        data.vleresimi,
        data.status,
        data.user_id,
        id
      ],
      (err, result) => {
        if (err) throw err;
        callback(result);
      }
    );
  }

  static delete(id, callback) {
    connection.query("DELETE FROM restaurants WHERE id=?", [id], callback);
  }
}

module.exports = Restaurants;