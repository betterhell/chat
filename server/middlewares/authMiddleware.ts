const jwt = require("jsonwebtoken")
const User = require("../models/user")
import {SECRET_JWT_CODE} from "../controllers/userController";

export const authMiddleware = (req, res, next) => {
    const token = req.cookies.token

    if (token) {
        jwt.verify(token, SECRET_JWT_CODE, (error, decodedToken) => {
            if (error) {
                res.redirect("/sign-in")
            } else {
                res.redirect("/chat")
                next()
            }
        })
    } else {
        res.redirect("/sign-in")
    }
}

export const checkUser = (req, res, next) => {
    const token = req.cookies.token

    if (token) {
        jwt.verify(token, SECRET_JWT_CODE, async (error, decodedToken) => {
            if (error) {
                res.render("/sign-in")
                next()
            } else {
                let user = await User.findById(decodedToken.id)
                res.render("/chat")
                next()
            }
        })
    } else {
        next()
    }
}