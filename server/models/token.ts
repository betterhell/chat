const {Schema, model} = require("mongoose")

const tokenSchema = new Schema({
    user: {type: Schema.Types.ObjectId, ref: "User"},
    refreshToken: {type: String}
}, {versionKey: false})

module.exports = model("Token", tokenSchema)
