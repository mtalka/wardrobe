const express = require("express");
const router = express.Router();

const User = require("../models/user");
const OwnedPiece = require("../models/ownedPiece");
const Outfit = require("../models/outfit");

// Get all users
router.get("/", async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (e) {
        res.status(500).json({ message: e.message });
    }
});

// Get a single user
router.get("/:id", getUser, (req, res) => {
    res.send(res.user);
});

// Create user
// router.post("/", async (req, res) => {
//     const user = new User(req.body);
//     console.log(user);

//     try {
//         const newUser = await user.save();
//         res.status(201).json(newUser);
//     } catch (e) {
//         res.status(400).json({ message: e.message });
//     }
// });

// Find an entry by Id middleware
async function getUser(req, res, next) {
    let user;

    try {
        user = await User.findById(req.params.id);
        ownedPieces = await OwnedPiece.find({ user: req.params.id });
        outfits = await Outfit.find({ owningUser: req.params.id });
        // ownedPieces = await OwnedPiece.aggregate([
        //     {
        //         $project: {
        //             items: {
        //                 $filter: {
        //                     input: "$items",
        //                     as: "item",
        //                     cond: { $gte: ["$$item.price", 100] },
        //                 },
        //             },
        //         },
        //     },
        // ]);
        // console.log(ownedPieces);
        // ownedPieces = await OwnedPiece.aggregate([
        //     {
        //         $lookup: {
        //             from: "pieces",
        //             localField: "piece",
        //             foreignField: "_id",
        //             as: "pieceInfo",
        //         },
        //     },
        //     {
        //         $match: {
        //             user: req.params.id,
        //         },
        //     },
        // ]);
        // outfits = await Outfit.aggregate([
        //     {
        //         $lookup: {
        //             from: "pieces",
        //             localField: "pieces",
        //             foreignField: "_id",
        //             as: "outfitPieces",
        //         },
        //     },
        // ]);

        if (user == null) {
            return res.status(404).json({ message: "Cannot find user" });
        }
    } catch (e) {
        res.status(500).json({ message: e.message });
    }

    res.user = { user, ownedPieces, outfits };
    next();
}

module.exports = router;
