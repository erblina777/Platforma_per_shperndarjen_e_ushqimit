const Users = require('../models/users');

const validateUser = (req, res, next) => {
  const { emri, email, password } = req.body;

  if (!emri || !email || !password) {
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

    if (result.length === 0) {
      req.user = null;
    } else {
      req.user = result[0];
    }

    next();
  } catch (err) {
    res.status(500).json({ message: "Gabim në server" });
  }
};

module.exports = {
  validateUser,
  verifyUser
};