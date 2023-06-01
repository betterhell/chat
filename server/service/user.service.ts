import {ObjectId} from "mongodb"
import mongoose from "mongoose"

const User = require("../models/user")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
const uuid = require("uuid")
const UserDto = require("../dtos/user.dto")
const ApiError = require("../exeptions/api.error")

const mailService = require("./mail.service")
const tokenService = require("./token.service")
const Token = require("../models/token")

const API_URL = "http://localhost:5000"


class UserService {
    async registration(username, email, password) {
        const candidate = await User.findOne({email})

        if (candidate) {
            throw ApiError.BadRequest("User is already registered!")
        } else {
            const hashPassword = await bcrypt.hash(password, 3)
            const activationLink = uuid.v4()

            const user = await User.create({
                username,
                email,
                password: hashPassword,
                activationLink
            })
            await mailService.sendActivationMail(email, `${API_URL}/activate/${activationLink}`)

            const userDto = new UserDto(user)
            const tokens = await tokenService.generateTokens({...userDto})
            await tokenService.saveToken(userDto.id, tokens.refreshToken)
            return {...tokens, user: userDto}
        }
    }

    async activate(activationLink) {
        const user = await User.findOne({activationLink})

        if (!user) {
            throw ApiError.BadRequest("Not correct activate link!")
        }
        user.isActivatedMail = true
        await user.save()
    }

    async login(email, password) {
        const user = await User.findOne({email})
        if (!user) {
            throw ApiError.BadRequest("User does not exist or incorrect email.")
        }

        const isPassEquals = await bcrypt.compareSync(password, user.password)
        if (!isPassEquals) {
            throw ApiError.BadRequest("User does not exist or incorrect password.")
        }

        const userDto = new UserDto(user)
        const tokens = await tokenService.generateTokens({...userDto})
        await tokenService.saveToken(userDto.id, tokens.refreshToken)

        return {...tokens, user: userDto}
    }

    async logout(refreshToken) {
        const token = await tokenService.removeToken(refreshToken)
        return token
    }

    async refresh(refreshToken) {
        if (!refreshToken) {
            throw ApiError.Unauthorized()
        }

        const userData = tokenService.validateRefreshToken({refreshToken})
        const tokenFromDB = await tokenService.findToken(refreshToken)
        if (!userData || !tokenFromDB) {
            throw ApiError.Unauthorized()
        }

        const user = User.findById(userData.id)
        const userDto = new UserDto(user)
        const tokens = await tokenService.generateTokens({...userDto})
        await tokenService.saveToken(userDto.id, tokens.refreshToken)

        return {...tokens, user: userDto}
    }

    async delete(userId) {
        if (!mongoose.Types.ObjectId.isValid(userId)) {
            throw ApiError.BadRequest("User does not exist or incorrect id")
        }

        const deletedUser = await User.findByIdAndDelete(userId)
        const token = await Token.findOneAndDelete({user: userId})
        return deletedUser
    }

    async getAllUsers() {
        const users = await User.find()
        return users
    }
}

module.exports = new UserService()

export {}