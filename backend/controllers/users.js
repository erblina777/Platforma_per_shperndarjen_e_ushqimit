const Users = require('../models/users');

const MerrUserat = async (req, res) => {
  try {
    Users.findAll((users) => res.json(users));
  } catch (err) {
    res.status(500).send("Server Error");
  }
};

const MerrUserById = async (req, res) => {
  try {
    const id = req.params.id;
    Users.findById(id, (user) => {
      if (!user) return res.status(404).send("User nuk u gjet");
      res.json(user);
    });
  } catch (err) {
    res.status(500).send("Server Error");
  }
};

const ShtoUser = async (req, res) => {
  const { emri, mbiemri, email, password } = req.body;

  if (req.user) {
    return res.status(409).json({ message: "User ekziston me këtë email" });
  }

  try {
    const user = new Users(null, emri, mbiemri, email, password, "active");
    Users.create(user, (newUser) => res.status(201).json(newUser));
  } catch (err) {
    res.status(500).send("Server Error");
  }
};

const NdryshoUser = async (req, res) => {
  try {
    const id = req.params.id;
    const { emri, mbiemri, email, password, status } = req.body;

    const user = new Users(id, emri, mbiemri, email, password, status);

    Users.update(user, (updated) => res.json(updated));
  } catch (err) {
    res.status(500).send("Server Error");
  }
};

const FshijUser = async (req, res) => {
  try {
    const id = req.params.id;

    Users.deleteById(id, () => {
      res.json({ message: "User u fshi me sukses" });
    });
  } catch (err) {
    res.status(500).send("Server Error");
  }
};
const AktivizoUser = (req, res) => {
  Users.ndryshoStatusin(req.params.id, "active", () => {
    res.json({ message: "User u aktivizua" });
  });
};

const DeaktivizoUser = (req, res) => {
  Users.ndryshoStatusin(req.params.id, "inactive", () => {
    res.json({ message: "User u deaktivizua" });
  });
};

module.exports = {
  MerrUserat,
  MerrUserById,
  ShtoUser,
  NdryshoUser,
  FshijUser,
  AktivizoUser,
  DeaktivizoUser
};