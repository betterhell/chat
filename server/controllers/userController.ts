const userService = require("../service/user.service")
const {validationResult} = require("express-validator")
const ApiError = require("../exeptions/api.error")

const CLIENT_URL = "http://localhost:5173"

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
            return res.redirect(CLIENT_URL)

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

        }
    }

    async deleteUser(req, res, next) {
        try {
            const userId = req.params.id
            const userData = await userService.delete(userId)
            return res.json(`User with id ${userData.id} was removed!`)
        } catch (error) {
            next(error)
        }
    }

    async updateUser(req, res, next) {
        try {

        } catch (error) {

        }
    }
}

module.exports = new UserController();

export {};

// const registerUser = async (req: Request, res: Response) => {
//     const {username, email, password} = req.body
//
//     const expireAge = 3 * 24 * 60 * 60
//
//     if (!username || !email || !password) {
//         return handleError(res, 400, "Not enough data")
//     }
//
//     const newUser = new User({
//         username,
//         email,
//         password: bcrypt.hashSync(password, 10)
//     })
//
//     await newUser
//         .save()
//         .then((user) => {
//             const token = jwt.sign({
//                 password: user.password,
//                 email: user.email
//             }, SECRET_JWT_CODE, {expiresIn: expireAge})
//
//             handleResponse(res, 200, {
//                 accessToken: localStorage.setItem("accessToken", token),
//                 refreshToken: res.cookie("refreshToken", token, {httpOnly: true, maxAge: expireAge})
//             })
//         })
//         .catch(() => handleError(res, 500, "User is already registered!"))
// }
//
// const loginUser = async (req: Request, res: Response) => {
//     const {email, password} = req.body
//
//     if (!email || !password) {
//         return handleError(res, 400, "Not enough data!")
//     }
//
//     await User
//         .findOne({email})
//         .then((user) => {
//             if (!user) {
//                 handleError(res, 404, "User does not exist!")
//             } else {
//                 bcrypt.compare(password, user.password, (error, data) => {
//                     if (data) {
//                         const token = jwt.sign({password: user.password, email: user.email}, SECRET_JWT_CODE)
//                         req.cookies["token"] = token
//                         handleResponse(res, 201, token)
//                     } else {
//                         handleError(res, 406, "Wrong email or password!")
//                     }
//                 })
//             }
//         })
// }
//
// const deleteUser = (req: Request, res: Response) => {
//     const userId = req.params.id
//
//     User
//         .findByIdAndDelete(userId)
//         .then((result) => handleResponse(res, 200, `User with id = ${result._id} successful delete!`))
//         .catch(() => handleError(res, 500, "Something went wrong... Try later."))
// }
//
// const updateUser = (req: Request, res: Response) => {
//     const userId = req.params.id
//     const updatedUser = req.body
//
//     User
//         .findByIdAndUpdate(userId, updatedUser)
//         .then((result) => handleResponse(res, 200, `User with id = ${result._id} successful updated!`))
//         .catch(() => handleError(res, 500, "Something went wrong... Try later."))
// }
//
// module.exports = {
//     registerUser,
//     loginUser,
//     deleteUser,
//     updateUser,