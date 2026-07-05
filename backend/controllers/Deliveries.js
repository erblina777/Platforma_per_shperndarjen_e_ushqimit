const Deliveries = require('../models/deliveries');

const MerrDeliveries = (req, res) => {
  Deliveries.findAll((err, data) => {
    if (err) return res.status(500).json(err);
    res.json(data);
  });
};

const ShtoDelivery = (req, res) => {
  const data = req.body;

  Deliveries.create(data, (err, delivery) => {
    if (err) return res.status(500).json(err);

    Deliveries.findOrderStatusUpdate(
      data.order_id,
      data.statusi,
      (err2) => {
        if (err2) return res.status(500).json(err2);
        res.status(201).json(delivery);
      }
    );
  });
};

const MerrDeliveryById = (req, res) => {
  Deliveries.findById(req.params.id, (err, data) => {
    if (err) return res.status(500).json(err);
    if (!data) return res.status(404).json({ message: "Not found" });
    res.json(data);
  });
};

const NdryshoDelivery = (req, res) => {
  const id = req.params.id;
  const data = req.body;

  Deliveries.update(id, data, (err, updated) => {
    if (err) return res.status(500).json(err);

    Deliveries.findOrderStatusUpdate(
      data.order_id,
      data.statusi,
      (err2) => {
        if (err2) return res.status(500).json(err2);
        res.json(updated);
      }
    );
  });
};

const FshijDelivery = (req, res) => {
  const id = req.params.id;

  Deliveries.delete(id, (err) => {
    if (err) return res.status(500).json(err);

    res.json({ message: "Deleted" });
  });
};

module.exports = {
  MerrDeliveries,
  ShtoDelivery,
  NdryshoDelivery,
  FshijDelivery,
  MerrDeliveryById
};