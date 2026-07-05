const Drivers = require('../models/deliverydrivers');

const MerrDrivers = (req, res) => {
  Drivers.findAll((err, data) => {
    if (err) return res.status(500).json(err);
    res.json(data);
  });
};

const MerrDriverById = (req, res) => {
  Drivers.findById(req.params.id, (err, data) => {
    if (err) return res.status(500).json(err);
    if (!data) return res.status(404).send("Driver nuk u gjet");
    res.json(data);
  });
};

const ShtoDriver = (req, res) => {
  const driver = {
    user_id: req.body.user_id,
    automjeti: req.body.automjeti,
    targa: req.body.targa,
    zona: req.body.zona,
    statusi: req.body.statusi || "offline",
    vleresimi: req.body.vleresimi || 0
  };

  Drivers.create(driver, (err, data) => {
    if (err) return res.status(500).json(err);
    res.status(201).json(data);
  });
};

const NdryshoDriver = (req, res) => {
  const driver = {
    id: req.params.id,
    user_id: req.body.user_id,
    automjeti: req.body.automjeti,
    targa: req.body.targa,
    zona: req.body.zona,
    statusi: req.body.statusi,
    vleresimi: req.body.vleresimi
  };

  Drivers.update(driver, (err, data) => {
    if (err) return res.status(500).json(err);
    res.json(data);
  });
};

const FshijDriver = (req, res) => {
  Drivers.deleteById(req.params.id, (err, data) => {
    if (err) return res.status(500).json(err);
    res.json(data);
  });
};

module.exports = {
  MerrDrivers,
  MerrDriverById,
  ShtoDriver,
  NdryshoDriver,
  FshijDriver
};