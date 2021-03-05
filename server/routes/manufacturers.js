const express = require("express");
const router = express.Router();

const Manufacturer = require("../models/manufacturer");

// Get all manufacturers
router.get("/", async (req, res) => {
    try {
        const manufacturers = await Manufacturer.find();
        res.json(manufacturers);
    } catch (e) {
        res.status(500).json({ message: e.message });
    }
});

// Get a single manufacturer
router.get("/:id", getManufacturer, (req, res) => {
    res.send(res.manufacturer);
});

// Create manufacturer
router.post("/", async (req, res) => {
    const manufacturer = new Manufacturer(req.body);
    console.log(manufacturer);

    try {
        const newManufacturer = await manufacturer.save();
        res.status(201).json(newManufacturer);
    } catch (e) {
        res.status(400).json({ message: e.message });
    }
});

// Find an entry by Id middleware
async function getManufacturer(req, res, next) {
    let manufacturer;

    try {
        manufacturer = await Manufacturer.findById(req.params.id);
        if (manufacturer == null) {
            return res
                .status(404)
                .json({ message: "Cannot find manufacturer" });
        }
    } catch (e) {
        res.status(500).json({ message: e.message });
    }

    res.manufacturer = manufacturer;
    next();
}

module.exports = router;
