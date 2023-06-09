import mongoose from "mongoose"

const Message = require("../models/message")
const ApiError = require("../exeptions/api.error")

class MessageService {
    async create(message, userId) {
        const newMessage = await Message.create({message, userId})
        if (!newMessage) {
            throw ApiError.BadRequest("Write something...")
        }
        return newMessage
    }

    async delete(messageId) {
        if (!mongoose.Types.ObjectId.isValid(messageId)) {
            throw ApiError.BadRequest("Not valid id.")
        }

        return await Message.findByIdAndDelete(messageId)
    }

    async update(messageId, messageInfo) {
        if (!mongoose.Types.ObjectId.isValid(messageId)) {
            throw ApiError.BadRequest("Not valid id.")
        }

        const updatedMessage = await Message.findByIdAndUpdate(messageId, messageInfo)
        await updatedMessage.save()

        return updatedMessage
    }

    async messages() {
        const messages = await Message.find()
        if (!messages) {
            throw ApiError.BadRequest("Users not found.")
        }

        return messages
    }
}

export default MessageService