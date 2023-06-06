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
    refreshUser
} = require("../controllers/userController")

router.get('/user', findUser)
router.get('/users', authMiddleware, getAllUsers)
router.get('/activate/:link', activateUser)
router.get('/refresh', refreshUser)

router.post('/registration', body("username").isLength({
        min: 3,
        max: 20
    }),
    body("email").isEmail(),
    body("password").isLength({min: 3, max: 20}), registerUser)
router.post('/login', loginUser)
router.post('/logout', logoutUser)

router.delete('/user/:id', deleteUser)

router.patch('/user/:id', updateUser)

module.exports = router