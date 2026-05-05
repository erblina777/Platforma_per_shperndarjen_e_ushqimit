const MenuItems = require('../models/menuitems');

exports.getAll = (req, res) => {
  MenuItems.findAll(data => res.json(data));
};

exports.getById = (req, res) => {
  MenuItems.findById(req.params.id, data => res.json(data));
};

exports.create = (req, res) => {
  MenuItems.create(req.body, data => res.status(201).json(data));
};

exports.update = (req, res) => {
  MenuItems.update(req.params.id, req.body, data => res.json(data));
};

exports.delete = (req, res) => {
  MenuItems.delete(req.params.id, () => {
    res.json({ message: "Deleted" });
  });
};