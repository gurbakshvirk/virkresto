const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
        },
        phone: {
            type: String,
            required: true,
        },
        username: {
            type: String,
            required: true,
            unique: true,
        },
        role: {
            type: String,
            enum: ["user", "admin"],
            default: "user",
        },
        address: {
            fullName: { type: String, default: "" },
            //   phone: { type: String, default: "" },
            street: { type: String, default: "" },
            city: { type: String, default: "" },
            state: { type: String, default: "" },
            pincode: { type: String, default: "" },
            country: { type: String, default: "" },
        },
        authProvider: {
            type: String,
            enum: ["local", "google", "apple"],
            default: "local",
        },
        isSocialUser: {
            type: Boolean,
            default: false,
        },


    },
    { timestamps: true }
);

const UserModel = mongoose.model("users", UserSchema);
module.exports = UserModel;
