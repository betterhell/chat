import mongoose from "mongoose"

const bcrypt = require("bcrypt")
const uuid = require("uuid")

const Token = require("../models/token")
const User = require("../models/user")

const UserDto = require("../dtos/user.dto")
const ApiError = require("../exeptions/api.error")

const mailService = require("./mail.service")
const tokenService = require("./token.service")


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
            await mailService.sendActivationMail(email, `${process.env.VITE_API_URL}/activate/${activationLink}`)

            const userDto = new UserDto(user)
            const tokens = await tokenService.generateTokens({...userDto})
            await tokenService.saveToken(userDto.id, tokens.refreshToken)
            return {...tokens, user: userDto}
        }
    }


    async getOneUser(username) {
        const user = await User.findOne({username})
        if (!user) {
            throw ApiError.BadRequest("User not found.")
        }
        return user
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
        return await tokenService.removeToken(refreshToken)
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
            throw ApiError.BadRequest("Not valid id.")
        }

        const deletedUser = await User.findByIdAndDelete(userId)
        await Token.findOneAndDelete({user: userId})
        return deletedUser
    }

    async update(userId, userInfo) {
        if (!mongoose.Types.ObjectId.isValid(userId)) {
            throw ApiError.BadRequest("Not valid id.")
        }

        const updatedUser = await User.findByIdAndUpdate(userId, userInfo)
        await updatedUser.save()
        return updatedUser
    }

    async getAllUsers() {
        return await User.find()
    }
}

module.exports = new UserService()

export {}