import { Schema, model } from "mongoose";
const userschema = new Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },
    username: {
        type: String,
        unique: true,
        sparse: true,
        trim: true
    },
    phone: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: false,
        default: null,
    },
    isGoogleUser: {
        type: Boolean,
        default: false,
    },
    role: {
        type: String,
        enum: ["admin", "user"],
        default: "user",
    },
},
    { timestamps: true }
)
export default model('User', userschema)
