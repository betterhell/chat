import UserService from "../service/user.service";

const userService = new UserService()
const {validationResult} = require("express-validator")
const ApiError = require("../exeptions/api.error")

class UserController {
    async registerUser(req, res, next) {
        try {
            const errors = validationResult(req)

            if (!errors.isEmpty()) {
                return next(ApiError.BadRequest("Validation error", errors.array()))
            }

            const {username, email, password} = req.body
            const userData = await userService.registration(username, email, password)

            res.cookie("refreshToken", userData.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true})

            return res.json(userData)
        } catch (error) {
            next(error)
        }
        return
    }

    async loginUser(req, res, next) {
        try {
            const {email, password} = req.body
            const userData = await userService.login(email, password)

            res.cookie("refreshToken", userData.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true})

            return res.json(userData)
        } catch (error) {
            next(error)
        }
    }

    async findUser(req, res, next) {
        try {
            const username = req.params.username
            const userData = await userService.getOneUser(username)
            return res.json(userData)
        } catch (error) {
            next(error)
        }
    }

    async logoutUser(req, res, next) {
        try {
            const {refreshToken} = req.cookies
            const token = await userService.logout(refreshToken)
            res.clearCookie("refreshToken")

            return res.json(token)
        } catch (error) {
            next(error)
        }
    }

    async activateUser(req, res, next) {
        try {
            const activationLink = req.params.link
            await userService.activate(activationLink)

            return res.redirect(process.env.VITE_CLIENT_URL)
        } catch (error) {
            next(error)
        }
    }

    async refreshUser(req, res, next) {
        try {
            const {refreshToken} = req.cookies
            const userData = await userService.refresh(refreshToken)
            res.cookie("refreshToken", userData.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true})
            return res.json(userData)
        } catch (error) {
            next(error)
        }
    }

    async deleteUser(req, res, next) {
        try {
            const userId = req.params.id

            const userData = await userService.delete(userId)
            if (!userData) {
                return next(ApiError.BadRequest("User does not exist."))
            }

            return res.json(`User with id was ${userData.id} removed!`)
        } catch (error) {
            next(error)
        }
    }

    async updateUser(req, res, next) {
        try {
            const userId = req.params.id
            const userInfo = req.body

            const userData = await userService.update(userId, userInfo)
            if (!userData) {
                return next(ApiError.BadRequest("User does not exist."))
            }

            return res.json(userData)
        } catch (error) {
            next(error)
        }
    }

    async getAllUsers(req, res, next) {
        try {
            const userData = await userService.users()

            return res.json(userData)
        } catch (error) {
            next(error)
        }
    }

    async addToFriends(req, res, next) {
        try {
            const updateFriends = req.body
            const username = req.params.username
            const userData = await userService.toFriend(username, updateFriends)

            return res.json(userData)
        } catch (error) {
            next(error)
        }
    }
}

module.exports = new UserController();

export {};