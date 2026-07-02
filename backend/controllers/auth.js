const Users = require("../models/users");
const UserClaims = require("../models/userClaims");
const UserTokens = require("../models/userTokens");
const RefreshTokens = require("../models/refreshTokens");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const Register = async (req, res) => {
  try {
    const { emri, mbiemri, email, password, phone_number } = req.body;

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
      phone_number,
      status: "active",
    };

    Users.create(user, async (newUser) => {
      try {
        await UserClaims.create(
          newUser.id,
          "role",
          "customer"
        );

        await UserTokens.create(
          newUser.id,
          "local",
          "registration",
          "registered"
        );

        res.status(201).json({
          message: "User u regjistrua",
          user: newUser,
        });

      } catch (err) {
        console.log(err);

        res.status(500).json({
          message: "Gabim gjatë ruajtjes së tokenit ose claim-it"
        });
      }
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
    const refreshToken = jwt.sign(
  {
    id: user.id,
  },
  "REFRESHSECRET",
  {
    expiresIn: "30d",
  }
);
console.log("Refresh:", refreshToken);

/*await RefreshTokens.create(
  user.id,
  refreshToken,
  new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
);*/
try {
  await RefreshTokens.create(
    user.id,
    refreshToken,
    new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
  );

  console.log("Refresh token u ruajt");
} catch (err) {
  console.log("Gabim refresh:", err);
}

    res.json({
      message: "Login successful",
      token,
      refreshToken,
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