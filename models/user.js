import mongoose, { Schema } from "mongoose";
import { AutoIncrement } from 'mongoose-sequence'; // Import the plugin

const connection = mongoose.createConnection("your_mongodb_connection_string");

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
        role: {
            type: String,
            required: false,
            default: "user"
        },
    },
    { timestamps: true }
);

userSchema.plugin(AutoIncrement, { id: 'user_seq', inc_field: 'id' });

const User = connection.model("User", userSchema);
export default User;
