const Address = require('../models/addresses');

const MerrAddresses = (req, res) => {
  Address.findAll((data) => res.json(data));
};

const MerrAddressById = (req, res) => {
  Address.findById(req.params.id, (data) => {
    if (!data) return res.status(404).send("Adresa nuk u gjet");
    res.json(data);
  });
};

const ShtoAddress = (req, res) => {
  const address = new Address(
    null,
    req.body.user_id,
    req.body.emertimi,
    req.body.adresa,
    req.body.qyteti,
    req.body.koordinatat,
    req.body.eshte_kryesore
  );

  Address.create(address, (data) => res.status(201).json(data));
};

const NdryshoAddress = (req, res) => {
  const address = new Address(
    req.params.id,
    req.body.user_id,
    req.body.emertimi,
    req.body.adresa,
    req.body.qyteti,
    req.body.koordinatat,
    req.body.eshte_kryesore
  );

  Address.update(address, (data) => res.json(data));
};

const FshijAddress = (req, res) => {
  Address.deleteById(req.params.id, () => {
    res.json({ message: "Adresa u fshi me sukses" });
  });
};

module.exports = {
  MerrAddresses,
  MerrAddressById,
  ShtoAddress,
  NdryshoAddress,
  FshijAddress
};