const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const outfit = new Schema(
    {
        name: { type: String },
        pieces: [{ type: Schema.Types.ObjectId, required: true, ref: "piece" }],
        created: { type: Date, default: Date.now() },
        owningUser: { type: Schema.Types.ObjectId, ref: "user" },
        isDeleted: {
            type: Boolean,
            default: false,
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Outfit", outfit);
