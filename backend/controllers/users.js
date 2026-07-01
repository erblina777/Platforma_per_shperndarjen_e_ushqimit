const Users = require('../models/users');

const MerrUserat = (req, res) => {
  Users.findAll((users) => res.json(users));
};

const MerrUserById = (req, res) => {
  Users.findById(req.params.id, (user) => {
    if (!user) return res.status(404).send("User nuk u gjet");
    res.json(user);
  });
};

const ShtoUser = (req, res) => {
  const { emri, mbiemri, email, password, phone_number } = req.body;

  const user = new Users(
    null,
    emri,
    mbiemri,
    email,
    password,
    phone_number,
    "active"
  );

  Users.create(user, (newUser) => {
    res.status(201).json(newUser);
  });
};

const NdryshoUser = (req, res) => {
  const { emri, mbiemri, email, password, status } = req.body;

  const user = new Users(
    req.params.id,
    emri,
    mbiemri,
    email,
    password,
    status
  );

  Users.update(user, (updated) => res.json(updated));
};

const FshijUser = (req, res) => {
  Users.deleteById(req.params.id, () => {
    res.json({ message: "User u fshi" });
  });
};

module.exports = {
  MerrUserat,
  MerrUserById,
  ShtoUser,
  NdryshoUser,
  FshijUser
};