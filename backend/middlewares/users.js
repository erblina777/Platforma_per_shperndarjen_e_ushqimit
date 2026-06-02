const Users = require('../models/users');

const validateUser = (req, res, next) => {
  const { emri, mbiemri, email, password } = req.body;

  if (!emri || !mbiemri || !email || !password) {
    return res.status(400).json({
      message: "Të gjitha fushat janë të detyrueshme"
    });
  }

  next();
};

const verifyUser = async (req, res, next) => {
  const { email } = req.body;

  try {
    const result = await Users.findByEmail(email);

    if (result.length > 0) {
      return res.status(409).json({
        message: "Email ekziston"
      });
    }

    next();
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { validateUser, verifyUser };