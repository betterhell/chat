import { Router } from "express";
import { body } from "express-validator";

const path = require("path");

const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/data/uploads/");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    console.log(file);
    cb(
      null,
      file.fieldname + "-" + uniqueSuffix + path.extname(file.originalname)
    );
  },
});

const upload = multer({ storage: storage });

const authMiddleware = require("../middlewares/auth.middleware");

const router = Router();
const {
  registerUser,
  loginUser,
  deleteUser,
  findUser,
  getAllUsers,
  updateUser,
  logoutUser,
  activateUser,
  refreshUser,
  addToFriends,
} = require("../controllers/userController");

router.patch("/user/:username", authMiddleware, addToFriends);
router.post("/user/:username", authMiddleware, findUser);
router.get("/users", getAllUsers);
router.get("/activate/:link", authMiddleware, activateUser);
router.get("/refresh", refreshUser);

router.post(
  "/registration",
  body("username").isLength({
    min: 3,
    max: 20,
  }),
  body("email").isEmail(),
  body("password").isLength({ min: 3, max: 20 }),
  registerUser
);
router.post("/login", loginUser);
router.post("/logout", logoutUser);

router.delete("/user/:id", authMiddleware, deleteUser);

router.post("/user/update/:id", upload.single("avatar"), updateUser);

module.exports = router;
