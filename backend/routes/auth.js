const router = require("express").Router();
const auth = require("../middlewares/auth");
const authController = require("../controllers/auth");
const multer = require("multer");
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });
router.post("/register", authController.Register);

router.post("/login", authController.Login);

router.post(
  "/register-restaurant",
  auth,
  upload.single("logo"),
  authController.RegisterRestaurant
);

module.exports = router;