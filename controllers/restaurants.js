const Restaurants = require('../models/restaurants');

exports.getAll = (req, res) => {
  Restaurants.findAll(data => res.json(data));
};

exports.getById = (req, res) => {
  Restaurants.findById(req.params.id, data => res.json(data));
};

exports.create = (req, res) => {
  Restaurants.create(req.body, data => res.status(201).json(data));
};

exports.update = (req, res) => {
  Restaurants.update(req.params.id, req.body, () => {
    res.json({ message: "Updated" });
  });
};

exports.delete = (req, res) => {
  Restaurants.delete(req.params.id, () => {
    res.json({ message: "Deleted" });
  });
};