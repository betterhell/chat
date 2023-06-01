const jwt = require("jsonwebtoken")

const VITE_SECRET_JWT_ACCESS_CODE = "ADAKLFKALASDKJ21315lSAD;a"
const VITE_SECRET_JWT_REFRESH_CODE = "1249175KLJSAKJASKK;SA12"

const Token = require("../models/token")

class TokenService {
    async generateTokens(payload) {
        const accessToken = jwt.sign(payload, VITE_SECRET_JWT_ACCESS_CODE, {expiresIn: "30m"})
        const refreshToken = jwt.sign(payload, VITE_SECRET_JWT_REFRESH_CODE, {expiresIn: "30d"})
        return {
            accessToken,
            refreshToken
        }
    }

    validateAccessToken(token) {
        try {
            const userData = jwt.verify(token, VITE_SECRET_JWT_ACCESS_CODE)
            return userData
        } catch (error) {
            return null
        }
    }

    validateRefreshToken(token) {
        try {
            const userData = jwt.verify(token, VITE_SECRET_JWT_REFRESH_CODE)
            return userData
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
        const token = await Token.create({user: userId, refreshToken})
        return token
    }

    async removeToken(refreshToken) {
        const tokenData = await Token.deleteOne({refreshToken})
        return tokenData
    }

    async findToken(refreshToken) {
        const tokenData = await Token.findOne({refreshToken})
        return tokenData
    }
}

module.exports = new TokenService()