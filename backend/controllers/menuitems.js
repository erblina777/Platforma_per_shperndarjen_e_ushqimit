const MenuItems = require('../models/menuitems');

exports.getAll = (req, res) => {
  console.log("GET ALL QUERY:", req.query);

  const filters = {
    search: req.query.search,
    minPrice: req.query.minPrice,
    maxPrice: req.query.maxPrice,
    restaurantId: req.query.restaurantId   // 👈 ADD THIS
  };

  MenuItems.findAll(filters, (data) => {
    console.log("RESULT:", data.length);
    res.json(data);
  });
};
exports.getByRestaurantId = (req, res) => {
  const filters = {
    restaurantId: req.params.restaurantId,
    search: req.query.search,
    minPrice: req.query.minPrice,
    maxPrice: req.query.maxPrice
  };

  MenuItems.findByRestaurantId(filters, (data) => {
    res.json(data);
  });
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