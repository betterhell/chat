const { Schema, model } = require("mongoose");

const messageScheme = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User" },
    text: { type: String },
  },
  { versionKey: false }
);

module.exports = model("Message", messageScheme);

export {};
