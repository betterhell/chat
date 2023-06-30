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
    registeredAt: {
        type: Date,
        default: Date.now()
    },
    isOnline: {type: Boolean, default: false},
    friends: {
        type: [{
            type: Schema.ObjectId,
            ref: 'User'
        }]
    },
    isActivatedMail: {type: Boolean, default: false},
    activationLink: {type: String}
}, {
    versionKey: false
})

module.exports = model("User", userSchema)

export {}