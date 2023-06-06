const {Schema, model} = require("mongoose")

const userSchema = new Schema({
    username: {
        type: String,
        trim: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
    },
    password: {
        type: String,
        required: true,
        minLength: 6,
    },
    birthDate: {
        day: {type: String},
        month: {type: String},
        year: {type: String}
    },
    registeredAt: {
        type: Date,
        default: Date.now()
    },
    friends: [],
    isActivatedMail: {type: Boolean, default: false},
    activationLink: {type: String}
}, {
    versionKey: false
})

module.exports = model("User", userSchema)

export {}