const Orders = require('../models/orders');
const connection = require("../database/database");
exports.getAll = (req, res) => {
  Orders.findAll(data => res.json(data));
};
exports.getByRestaurantId = (req, res) => {
  const id = req.params.id;

  Orders.getByRestaurantIdDetailed(id, (err, rows) => {
    if (err) {
      console.log("🔥 SQL ERROR:", err.sqlMessage || err.message);
      return res.status(500).json({
        message: err.message,
        sql: err.sqlMessage,
      });
    }

    if (!rows) {
      return res.json([]);
    }

    res.json(rows);
  });
};
exports.getById = (req, res) => {
  Orders.findById(req.params.id, data => res.json(data));
};

exports.create = (req, res) => {
  Orders.create(req.body, data => res.status(201).json(data));
};

exports.update = (req, res) => {
  Orders.update(req.params.id, req.body, data => res.json(data));
};

exports.delete = (req, res) => {
  Orders.delete(req.params.id, () => {
    res.json({ message: "Deleted" });
  });
};