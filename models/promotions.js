class Promotions {
  constructor(id, title, description, discount, start_date, end_date) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.discount = discount;
    this.start_date = start_date;
    this.end_date = end_date;
  }

  static findAll(callback) {
    callback([]);
  }

  static findById(id, callback) {
    callback(null);
  }

  static create(promotion, callback) {
    callback(promotion);
  }

  static update(promotion, callback) {
    callback(promotion);
  }

  static deleteById(id, callback) {
    callback();
  }
}

module.exports = Promotions;