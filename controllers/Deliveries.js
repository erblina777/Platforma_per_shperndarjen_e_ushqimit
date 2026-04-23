const Deliveries = require('../models/deliveries');

const MerrDeliveries = (req, res) => {
  Deliveries.findAll((data) => res.json(data));
};

const MerrDeliveryById = (req, res) => {
  Deliveries.findById(req.params.id, (data) => {
    if (!data) return res.status(404).send("Delivery nuk u gjet");
    res.json(data);
  });
};

const ShtoDelivery = (req, res) => {
  const delivery = new Deliveries(
    null,
    req.body.order_id,
    req.body.driver_id,
    req.body.statusi,
    req.body.data_marrjes,
    req.body.data_dorezimit,
    req.body.koha_vleresuar
  );

  Deliveries.create(delivery, (data) => res.status(201).json(data));
};

const NdryshoDelivery = (req, res) => {
  const delivery = new Deliveries(
    req.params.id,
    req.body.order_id,
    req.body.driver_id,
    req.body.statusi,
    req.body.data_marrjes,
    req.body.data_dorezimit,
    req.body.koha_vleresuar
  );

  Deliveries.update(delivery, (data) => res.json(data));
};

const FshijDelivery = (req, res) => {
  Deliveries.deleteById(req.params.id, () => {
    res.json({ message: "Delivery u fshi" });
  });
};

module.exports = {
  MerrDeliveries,
  MerrDeliveryById,
  ShtoDelivery,
  NdryshoDelivery,
  FshijDelivery
};