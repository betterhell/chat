const {Schema, model} = require("mongoose")

const messageScheme = new Schema({
    userId: {type: Schema.Types.ObjectId},
    text: {type: String},
}, {versionKey: false})

module.exports = model("Message", messageScheme)

export {}