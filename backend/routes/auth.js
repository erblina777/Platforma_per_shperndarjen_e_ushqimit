const router = require("express").Router();

const authController = require("../controllers/auth");

router.post("/register", authController.Register);

router.post("/login", authController.Login);

module.exports = router;