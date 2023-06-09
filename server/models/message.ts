const {Schema, model} = require("mongoose")

const messageScheme = new Schema({
    userId: {type: Schema.Types.ObjectId},
    message: {type: String}
}, {versionKey: false})

module.exports = model("Message", messageScheme)

export {}