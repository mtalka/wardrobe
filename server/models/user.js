const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const user = new Schema(
    {
        username: {
            type: String,
            lowercase: true,
            required: [true, "can't be blank"],
            match: [/^[a-zA-Z0-9]+$/, "is invalid"],
            index: true,
        },
        email: {
            type: String,
            select: false,
            lowercase: true,
            required: [true, "can't be blank"],
            match: [/\S+@\S+\.\S+/, "is invalid"],
            index: true,
        },
        password: {
            type: String,
            required: true,
            min: 6,
            max: 1024,
            select: false,
        },
        dateOfBirth: { type: Date },
        description: { type: String },
        following: [
            { type: Schema.Types.ObjectId, required: true, ref: "user" },
        ],
    },
    { timestamps: true }
);

module.exports = mongoose.model("User", user);
