import MessageService from "../service/message.service"

const messageService = new MessageService()
const ApiError = require("../exeptions/api.error")

class MessageController {
    async createMessage(req, res, next) {
        try {
            const {message} = req.body
            const user = req.user
            const messageData = await messageService.create(message, user.id)
            return res.json(messageData)
        } catch (error) {
            next(error)
        }
        return
    }

    async deleteMessage(req, res, next) {
        try {
            const messageId = req.params.id

            const messageData = await messageService.delete(messageId)
            if (!messageData) {
                return next(ApiError.BadRequest("Message does not exist."))
            }

            return res.json(`Message with id was ${messageData.id} removed!`)
        } catch (error) {
            next(error)
        }
    }

    async updateMessage(req, res, next) {
        try {
            const messageId = req.params.id
            const messageInfo = req.body

            const messageData = await messageService.update(messageId, messageInfo)
            if (!messageData) {
                return next(ApiError.BadRequest("Message does not exist."))
            }
            return res.json(messageData)
        } catch (error) {
            next(error)
        }
    }

    async getAllMessage(req, res, next) {
        try {
            const messageData = await messageService.messages()

            return res.json(messageData)
        } catch (error) {
            next(error)
        }
    }
}

module.exports = new MessageController();

export {};