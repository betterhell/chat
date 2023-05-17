import mongoose from "mongoose"

const {Schema, model} = mongoose

const messageSchema = new Schema({
    messageId: {
        type: String,
        required: true,
        unique: true,
    },
    messageType: {
        type: String,
        required: true,
    },
    textOrPathToFile: {
        type: String,
        required: true,
    },
    roomId: {
        type: String,
        required: true,
    },
    userId: {}
})