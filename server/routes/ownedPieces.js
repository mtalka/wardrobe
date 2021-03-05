const express = require("express");
const router = express.Router();

const OwnedPiece = require("../models/ownedPiece");

// Get all ownedPieces
router.get("/", async (req, res) => {
    try {
        const ownedPieces = await OwnedPiece.find();
        res.json(ownedPieces);
    } catch (e) {
        res.status(500).json({ message: e.message });
    }
});

// Get a single ownedPiece
router.get("/:id", getOwnedPiece, (req, res) => {
    res.send(res.ownedPiece);
});

// Create ownedPiece
router.post("/", async (req, res) => {
    const ownedPiece = new OwnedPiece(req.body);
    console.log(ownedPiece);

    try {
        const newOwnedPiece = await ownedPiece.save();
        res.status(201).json(newOwnedPiece);
    } catch (e) {
        res.status(400).json({ message: e.message });
    }
});

// Find an entry by Id middleware
async function getOwnedPiece(req, res, next) {
    let ownedPiece;

    try {
        ownedPiece = await OwnedPiece.findById(req.params.id);
        if (ownedPiece == null) {
            return res.status(404).json({ message: "Cannot find ownedPiece" });
        }
    } catch (e) {
        res.status(500).json({ message: e.message });
    }

    res.ownedPiece = ownedPiece;
    next();
}

module.exports = router;
