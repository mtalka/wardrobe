require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

app.use(cors());

// Set up the db
mongoose.connect(process.env.DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
});

const db = mongoose.connection;

db.on("error", (error) => console.error(error));
db.once("open", () => console.log("Connected to database"));

app.use(express.json());

app.get("/", (req, res) => {
    res.send("Hello World!");
});

// Routes
const verifyToken = require("./routes/validate-token");

const usersRoute = require("./routes/users");
app.use("/api/users", usersRoute);

const piecesRoute = require("./routes/pieces");
app.use("/api/pieces", verifyToken, piecesRoute);

const outfitsRoute = require("./routes/outfits");
app.use("/api/outfits", verifyToken, outfitsRoute);

const manufacturersRoute = require("./routes/manufacturers");
app.use("/api/manufacturers", verifyToken, manufacturersRoute);

const ownedPiecesRoute = require("./routes/ownedPieces");
app.use("/api/ownedPieces", verifyToken, ownedPiecesRoute);

const authRoute = require("./routes/auth");
app.use("/api/user", authRoute);

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log("Server has started");
});
