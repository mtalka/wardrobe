const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const piece = new Schema(
    {
        manufacturer: {
            type: Schema.Types.ObjectId,
            required: true,
            ref: "Manufacturer",
        },
        model: {
            type: String,
            required: true,
        },
        type: {
            type: String,
            required: true,
            enum: [
                "hat",
                "top",
                "bottom",
                "underwear",
                "garment",
                "accessory",
                "shoes",
            ],
        },
        color1: {
            type: String,
            required: true,
            enum: [
                "red",
                "orange",
                "yellow",
                "green",
                "blue",
                "purple",
                "pink",
                "brown",
                "grey",
                "black",
                "white",
                "camo",
                "multi",
            ],
        },
        color2: {
            type: String,
            enum: [
                "red",
                "orange",
                "yellow",
                "green",
                "blue",
                "purple",
                "pink",
                "brown",
                "grey",
                "black",
                "white",
                "camo",
                "multi",
            ],
        },
        description: {
            type: String,
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Piece", piece);
