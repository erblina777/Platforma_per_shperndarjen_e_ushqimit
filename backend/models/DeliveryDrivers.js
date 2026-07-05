const db = require('../database/database');

class DeliveryDrivers {
  constructor(id, user_id, automjeti, targa, zona, statusi, vleresimi) {
    this.id = id;
    this.user_id = user_id;
    this.automjeti = automjeti;
    this.targa = targa;
    this.zona = zona;
    this.statusi = statusi;
    this.vleresimi = vleresimi;
  }

  static findAll(cb) {
    const q = `
      SELECT d.*, u.emri, u.mbiemri
      FROM deliverydrivers d
      JOIN users u ON u.id = d.user_id
    `;

    db.query(q, (err, rows) => {
      if (err) return cb(err);
      cb(null, rows);
    });
  }

  static findById(id, cb) {
    db.query(
      'SELECT * FROM deliverydrivers WHERE id=?',
      [id],
      (err, rows) => {
        if (err) return cb(err);
        cb(null, rows[0]);
      }
    );
  }

  static assignDriverRole(user_id, cb) {
    const getRole = `
      SELECT id FROM roles WHERE normalized_name = 'DRIVER' LIMIT 1
    `;

    db.query(getRole, (err, roleRows) => {
      if (err) return cb(err);

      const roleId = roleRows[0].id;

      const deleteOld = `
        DELETE FROM userroles WHERE user_id = ?
      `;

      db.query(deleteOld, [user_id], (err2) => {
        if (err2) return cb(err2);

        const insertNew = `
          INSERT INTO userroles (user_id, role_id)
          VALUES (?, ?)
        `;

        db.query(insertNew, [user_id, roleId], (err3) => {
          if (err3) return cb(err3);

          cb(null, { user_id, roleId });
        });
      });
    });
  }

  static create(data, cb) {
    const q = `
      INSERT INTO deliverydrivers
      (user_id, automjeti, targa, zona, statusi, vleresimi)
      VALUES (?, ?, ?, ?, ?, ?)
    `;

    db.query(q, [
      data.user_id,
      data.automjeti,
      data.targa,
      data.zona,
      data.statusi,
      data.vleresimi
    ], (err, result) => {
      if (err) return cb(err);
        DeliveryDrivers.assignDriverRole(data.user_id, (err2) => {
        if (err2) return cb(err2);

        cb(null, {
          id: result.insertId,
          ...data
        });
      });
    });
  }

  static update(driver, cb) {
    const q = `
      UPDATE deliverydrivers
      SET user_id=?, automjeti=?, targa=?, zona=?, statusi=?, vleresimi=?
      WHERE id=?
    `;

    db.query(q, [
      driver.user_id,
      driver.automjeti,
      driver.targa,
      driver.zona,
      driver.statusi,
      driver.vleresimi,
      driver.id
    ], (err) => {
      if (err) return cb(err);
      cb(null, driver);
    });
  }

  static deleteById(id, cb) {

    db.query(
      'SELECT user_id FROM deliverydrivers WHERE id=?',
      [id],
      (err, rows) => {
        if (err) return cb(err);

        if (!rows.length) return cb(new Error("Driver not found"));

        const user_id = rows[0].user_id;

        db.query(
          'DELETE FROM deliverydrivers WHERE id=?',
          [id],
          (err2) => {
            if (err2) return cb(err2);

            const qRole = `
              SELECT id FROM roles 
              WHERE normalized_name = 'CUSTOMER'
              LIMIT 1
            `;

            db.query(qRole, (err3, roleRows) => {
              if (err3) return cb(err3);

              const roleId = roleRows[0].id;

              const qUpdate = `
                UPDATE userroles
                SET role_id = ?
                WHERE user_id = ?
              `;

              db.query(qUpdate, [roleId, user_id], (err4) => {
                if (err4) return cb(err4);

                cb(null, { message: "Driver deleted and role reset to customer" });
              });
            });
          }
        );
      }
    );
  }
}

module.exports = DeliveryDrivers;