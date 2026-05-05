class Addresses {
  constructor(id, user_id, emertimi, adresa, qyteti, koordinatat) {
    this.id = id;
    this.user_id = user_id;
    this.emertimi = emertimi;
    this.adresa = adresa;
    this.qyteti = qyteti;
    this.koordinatat = koordinatat;
  }

  // OPTIONAL: placeholder methods (nëse s’ke DB ende)
  static findAll(callback) {
    callback([]);
  }

  static findById(id, callback) {
    callback(null);
  }

  static create(address, callback) {
    callback(address);
  }

  static update(address, callback) {
    callback(address);
  }

  static deleteById(id, callback) {
    callback();
  }
}

module.exports = Addresses;