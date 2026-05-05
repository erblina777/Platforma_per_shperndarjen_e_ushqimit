const Orders = require('../models/orders');

exports.getAll = (req, res) => {
  Orders.findAll(data => res.json(data));
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