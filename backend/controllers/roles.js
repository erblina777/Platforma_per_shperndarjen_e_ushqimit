const Roles = require('../models/roles');

const MerrRolet = (req, res) => {
  Roles.findAll((data) => res.json(data));
};

const MerrRoleById = (req, res) => {
  Roles.findById(req.params.id, (data) => {
    if (!data) return res.status(404).send("Role nuk u gjet");
    res.json(data);
  });
};

const ShtoRole = (req, res) => {
  const role = new Roles(null, req.body.emertimi, req.body.pershkrimi);

  Roles.create(role, (data) => res.status(201).json(data));
};

const NdryshoRole = (req, res) => {
  const role = new Roles(req.params.id, req.body.emertimi, req.body.pershkrimi);

  Roles.update(role, (data) => res.json(data));
};

const FshijRole = (req, res) => {
  Roles.deleteById(req.params.id, () => {
    res.json({ message: "Role u fshi me sukses" });
  });
};

module.exports = {
  MerrRolet,
  MerrRoleById,
  ShtoRole,
  NdryshoRole,
  FshijRole
};