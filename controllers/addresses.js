const Addresses = require('../models/addresses');

// GET all addresses
const MerrAddresses = (req, res) => {
  res.json([]);
};

// GET address by ID
const MerrAddressById = (req, res) => {
  res.json({});
};

// CREATE address
const ShtoAddress = (req, res) => {
  const adresa = new Addresses(
    null,
    req.body.user_id,
    req.body.emertimi,
    req.body.adresa,
    req.body.qyteti,
    req.body.koordinatat
  );

  res.status(201).json(adresa);
};

// UPDATE address
const NdryshoAddress = (req, res) => {
  const adresa = new Addresses(
    req.params.id,
    req.body.user_id,
    req.body.emertimi,
    req.body.adresa,
    req.body.qyteti,
    req.body.koordinatat
  );

  res.json(adresa);
};

// DELETE address
const FshijAddress = (req, res) => {
  res.json({ message: "Adresa u fshi me sukses" });
};

module.exports = {
  MerrAddresses,
  MerrAddressById,
  ShtoAddress,
  NdryshoAddress,
  FshijAddress
};