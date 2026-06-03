const Users = require("../models/users");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// REGISTER
const Register = async (req, res) => {
  try {
    const { emri, mbiemri, email, password } = req.body;

    if (!emri || !mbiemri || !email || !password) {
      return res.status(400).json({
        message: "Të gjitha fushat janë të detyrueshme",
      });
    }

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
      return res.status(201).json({
        message: "User u regjistrua",
        user: {
          id: newUser.id,
          emri: newUser.emri,
          mbiemri: newUser.mbiemri,
          email: newUser.email,
          status: newUser.status,
        },
      });
    });

  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server Error" });
  }
};

// LOGIN
const Login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: "Email dhe password janë të detyrueshme",
      });
    }

    const result = await Users.findByEmail(email);

    if (result.length === 0) {
      return res.status(404).json({
        message: "User nuk ekziston",
      });
    }

    const user = result[0];

    const isMatch = await bcrypt.compare(password, user.password_hash);

    if (!isMatch) {
      return res.status(401).json({
        message: "Password gabim",
      });
    }

    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
        role: user.role || "user",
      },
      "SECRETKEY",
      { expiresIn: "7d" }
    );

    return res.json({
      message: "Login successful",
      token,
      user: {
        id: user.id,
        emri: user.emri,
        mbiemri: user.mbiemri,   // 🔥 KY ISHTE PROBLEMI YT
        email: user.email,
        role: user.role ? user.role.trim().toLowerCase() : "user",
      },
    });

  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server Error" });
  }
};

module.exports = {
  Register,
  Login,
};