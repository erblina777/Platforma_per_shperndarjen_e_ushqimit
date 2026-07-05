const Promotions = require("../models/promotions");
const MenuItems = require("../models/menuitems");
const MenuCategories = require("../models/menucategories");
const Restaurants = require('../models/restaurants');

exports.getAll = (req, res) => {
  Restaurants.findAll(data => res.json(data));
};

exports.getById = (req, res) => {
  Restaurants.findById(req.params.id, data => res.json(data));
};
exports.getByUserId = (req, res) => {
  Restaurants.findByUserId(req.params.id, (data) => {
    if (!data) {
      return res.status(404).json({ message: "No restaurant found" });
    }
    res.json(data);
  });
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
  const id = req.params.id;

  Promotions.deleteByRestaurantId(id, (err) => {
    if (err) return res.status(500).json(err);

    MenuItems.deleteByRestaurantId(id, (err2) => {
      if (err2) return res.status(500).json(err2);

      MenuCategories.deleteByRestaurantId(id, (err3) => {
        if (err3) return res.status(500).json(err3);

        Restaurants.delete(id, (err4) => {
          if (err4) return res.status(500).json(err4);

          res.json({ message: "Deleted successfully" });
        });
      });
    });
  });
};