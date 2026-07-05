const Users = require("../models/users");
const bcrypt = require("bcryptjs");
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
  Users.deleteById(req.params.id, (err) => {
    if (err) {
      return res.status(500).json({
        message: "Delete failed",
        error: err.sqlMessage
      });
    }

    res.json({ message: "User deleted successfully" });
  });
};

const changePassword = async (req, res) => {
  try {
    const { id } = req.params;
    const { password } = req.body;

    if (!password) {
      return res.status(400).json({
        message: "Password is required",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await Users.changePassword(id, hashedPassword);

    res.json({
      message: "Password updated successfully",
    });
  } catch (err) {
    console.log(err);

    res.status(500).json({
      message: "Server error",
    });
  }
};

module.exports = {
  MerrUserat,
  MerrUserById,
  ShtoUser,
  NdryshoUser,
  FshijUser,
  changePassword,
};