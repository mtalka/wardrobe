const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ownedPiece = new Schema(
    {
        piece: {
            type: Schema.Types.ObjectId,
            required: true,
            ref: "piece",
        },
        user: {
            type: Schema.Types.ObjectId,
            required: true,
            ref: "user",
        },
        description: {
            type: String,
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("OwnedPiece", ownedPiece);
