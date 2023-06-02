import {Router} from "express";
import {body} from "express-validator";

const router = Router()
const {
    registerUser,
    loginUser,
    deleteUser,
    findUser,
    updateUser,
    logoutUser,
    activateUser,
    refreshUser
} = require("../controllers/userController")

router.delete('/user/:id', deleteUser)
router.get('/user', findUser)
router.patch('/user/:id', updateUser)
router.post('/registration', body("username").isLength({
        min: 3,
        max: 20
    }),
    body("email").isEmail(),
    body("password").isLength({min: 3, max: 20}), registerUser)

router.post('/login', loginUser)
router.post('/logout', logoutUser)
router.get('/activate/:link', activateUser)
router.post('/refresh', refreshUser)

module.exports = router