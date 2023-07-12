const { Schema, model } = require("mongoose");

const avatarSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User" },
    initialName: { type: String, require: true },
    name: { type: String, require: true, unique: true },
    uploadDate: { type: Date, default: Date.now() },
  },
  { versionKey: false }
);

module.exports = model("Avatar", avatarSchema);

export {};
