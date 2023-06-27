import {Router} from "express";
import {body} from "express-validator";

const authMiddleware = require("../middlewares/auth.middleware")

const router = Router()
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
} = require("../controllers/userController")

router.patch('/user/:username', addToFriends)
router.post('/user/:username', authMiddleware, findUser)
router.get('/users', getAllUsers)
router.get('/activate/:link', authMiddleware, activateUser)
router.get('/refresh', refreshUser)

router.post('/registration', body("username").isLength({
        min: 3,
        max: 20
    }),
    body("email").isEmail(),
    body("password").isLength({min: 3, max: 20}), registerUser)
router.post('/login', loginUser)
router.post('/logout', logoutUser)

router.delete('/user/:id', authMiddleware, deleteUser)

router.patch('/user/:id', authMiddleware, updateUser)

module.exports = router