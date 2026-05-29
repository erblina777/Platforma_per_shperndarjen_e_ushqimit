const MenuItems = require('../models/menuitems');

exports.getAll = (req, res) => {

  const filters = {
    search: req.query.search,
    minPrice: req.query.minPrice,
    maxPrice: req.query.maxPrice,
  };

  MenuItems.findAll(filters, (data) => {
    res.json(data);
  });
};
exports.getByRestaurantId = (req, res) => {
  MenuItems.findByRestaurantId(
    req.params.restaurantId,
    (data) => res.json(data)
  );
};
exports.getById = (req, res) => {
  MenuItems.findById(req.params.id, data => res.json(data));
};

exports.create = (req, res) => {
  const body = req.body;

  const foto = req.file
    ? req.file.filename
    : null;

  const data = {
    ...body,
    foto,
  };

  MenuItems.create(data, (result) => {
    res.status(201).json(result);
  });
};

exports.update = (req, res) => {
  const body = req.body;

  if (req.file) {
    body.foto = req.file.filename;
  }

  MenuItems.update(
    req.params.id,
    body,
    (result) => {
      res.json(result);
    }
  );
};

exports.delete = (req, res) => {
  MenuItems.delete(req.params.id, () => {
    res.json({ message: "Deleted" });
  });
};