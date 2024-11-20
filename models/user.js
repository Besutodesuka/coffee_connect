import mongoose, { Schema } from "mongoose";
const AutoIncrement = require('mongoose-sequence')(mongoose);

const userSchema = new Schema(
    {
        id: {
            type: Number, // Change to Number for auto-incrementing
            required: false,
            unique: true // Ensure the id is unique
        },
        username: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true
        },
        password: {
            type: String,
            required: true
        },
        firstname: {
            type: String,
            required: true
        },
        lastname:{
            type: String,
            required: true
        },
        dateofbirth: {
            type: Date,
            required: true
        },
        role: {
            type: String,
            required: false,
            default: "user"
        },
    },
    { timestamps: true }
);

// userSchema.plugin(AutoIncrement, { inc_field: 'id' });

const User = mongoose.models.User || mongoose.model("User", userSchema);
export default User;
