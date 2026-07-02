const Users = require("../models/users");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const Register = async (req, res) => {
  try {
    const { emri, mbiemri, email, password } = req.body;

    const existingUser = await Users.findByEmail(email);

    if (existingUser.length > 0) {
      return res.status(400).json({
        message: "User ekziston",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = {
      emri,
      mbiemri,
      email,
      password_hash: hashedPassword,
      status: "active",
    };

    Users.create(user, (newUser) => {
      res.status(201).json({
        message: "User u regjistrua",
        user: newUser,
      });
    });
  } catch (err) {
    console.log(err);

    res.status(500).json({
      message: "Server Error",
    });
  }
};

const Login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const result = await Users.findByEmail(email);

    if (result.length === 0) {
      return res.status(404).json({
        message: "User nuk ekziston",
      });
    }

    const user = result[0];
    console.log(user);
    const isMatch = await bcrypt.compare(
      password,
      user.password_hash
    );

    if (!isMatch) {
      return res.status(401).json({
        message: "Password gabim",
      });
    }

    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
        role: user.role,
      },
      "SECRETKEY",
      {
        expiresIn: "7d",
      }
    );

    res.json({
      message: "Login successful",
      token,
      user: {
        id: user.id,
        emri: user.emri,
        mbiemri: user.mbiemri,
        email: user.email,
        role: user.role?.trim().toLowerCase()
      },
    });
  } catch (err) {
    console.log(err);

    res.status(500).json({
      message: "Server Error",
    });
  }
};

module.exports = {
  Register,
  Login,
};