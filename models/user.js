import mongoose, { Schema } from "mongoose";
const AutoIncrement = require("mongoose-sequence")(mongoose);

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    firstname: {
      type: String,
      required: true,
    },
    lastname: {
      type: String,
      required: true,
    },
    dateofbirth: {
      type: Date,
      required: true,
    },
    role: {
      type: String,
      required: false,
      default: "user",
    },
    location: {
      type: String,
      required: false,
    },
  },
  { timestamps: true }
);

userSchema.plugin(AutoIncrement, { inc_field: "userid" });

const User = mongoose.models.User || mongoose.model("User", userSchema);
export default User;
