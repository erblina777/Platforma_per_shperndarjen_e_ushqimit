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
    callback([]);
  }

  static findById(id, callback) {
    callback(null);
  }

  static create(review, callback) {
    callback(review);
  }

  static update(review, callback) {
    callback(review);
  }

  static deleteById(id, callback) {
    callback();
  }
}

module.exports = Reviews;