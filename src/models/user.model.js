const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      lowercase: true,
      unique: true,
      match: [/^[a-zA-Z0-9]+$/, "is invalid"],
      index: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);
