const jwt = require("jsonwebtoken")

const Token = require("../models/token")

class TokenService {
    async generateTokens(payload) {
        const accessToken = jwt.sign(payload, process.env.VITE_SECRET_JWT_ACCESS_CODE, {expiresIn: "30m"})
        const refreshToken = jwt.sign(payload, process.env.VITE_SECRET_JWT_REFRESH_CODE, {expiresIn: "30d"})
        return {
            accessToken,
            refreshToken
        }
    }

    validateAccessToken(token) {
        try {
            return jwt.verify(token, process.env.VITE_SECRET_JWT_ACCESS_CODE)
        } catch (error) {
            return null
        }
    }

    validateRefreshToken(token) {
        try {
            return jwt.verify(token, process.env.VITE_SECRET_JWT_REFRESH_CODE)
        } catch (error) {
            return null
        }
    }

    async saveToken(userId, refreshToken) {
        const tokenData = await Token.findOne({user: userId})

        if (tokenData) {
            tokenData.refreshToken = refreshToken
            return tokenData.save()
        }
        return await Token.create({user: userId, refreshToken})
    }

    async removeToken(refreshToken) {
        return await Token.deleteOne({refreshToken})
    }

    async findToken(refreshToken) {
        return await Token.findOne({refreshToken})
    }
}

module.exports = new TokenService()