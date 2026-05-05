const MenuCategories = require('../models/menucategories');

exports.getAll = (req, res) => {
  MenuCategories.findAll(data => res.json(data));
};

exports.getById = (req, res) => {
  MenuCategories.findById(req.params.id, data => res.json(data));
};

exports.create = (req, res) => {
  MenuCategories.create(req.body, data => res.status(201).json(data));
};

exports.update = (req, res) => {
  MenuCategories.update(req.params.id, req.body, data => res.json(data));
};

exports.delete = (req, res) => {
  MenuCategories.delete(req.params.id, () => res.json({ message: "Deleted" }));
};