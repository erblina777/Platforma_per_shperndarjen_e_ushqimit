const Drivers = require('../models/deliverydrivers');

const MerrDrivers = (req, res) => {
  Drivers.findAll((data) => res.json(data));
};

const MerrDriverById = (req, res) => {
  Drivers.findById(req.params.id, (data) => {
    if (!data) return res.status(404).send("Driver nuk u gjet");
    res.json(data);
  });
};

const ShtoDriver = (req, res) => {
  const driver = new Drivers(
    null,
    req.body.user_id,
    req.body.automjeti,
    req.body.targa,
    req.body.zona,
    req.body.statusi,
    req.body.vleresimi
  );

  Drivers.create(driver, (data) => res.status(201).json(data));
};

const NdryshoDriver = (req, res) => {
  const driver = new Drivers(
    req.params.id,
    req.body.user_id,
    req.body.automjeti,
    req.body.targa,
    req.body.zona,
    req.body.statusi,
    req.body.vleresimi
  );

  Drivers.update(driver, (data) => res.json(data));
};

const FshijDriver = (req, res) => {
  Drivers.deleteById(req.params.id, () => {
    res.json({ message: "Driver u fshi" });
  });
};

module.exports = {
  MerrDrivers,
  MerrDriverById,
  ShtoDriver,
  NdryshoDriver,
  FshijDriver
};