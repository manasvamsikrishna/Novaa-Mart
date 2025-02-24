const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect("mongodb://localhost:27017/novaa-mart", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});
const db = mongoose.connection;

db.on("error", console.error.bind(console, "Connection error:"));
db.once("open", () => {
    console.log("Connected to MongoDB!");
});

// User Schema
const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    phone: String,
    address: String,
    email: String,
});

const User = mongoose.model("User", userSchema);

// Sign-Up Route
app.post("/signup", async (req, res) => {
    const { username, password, phone, address, email } = req.body;
    try {
        const existingUser = await User.findOne({ username });
        if (existingUser) return res.status(400).json({ message: "Username already exists!" });
        const newUser = new User({ username, password, phone, address, email });
        await newUser.save();
        res.status(201).json({ success: true, message: `You have successfully signed up ${username}!`, user: newUser });
    } catch (error) {
        res.status(500).json({ message: "Error registering user!" });
    }
});

// Sign-In Route
app.post("/signin", async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await User.findOne({ username });
        if (!user) return res.status(400).json({ message: "Username not found. Please sign up." });
        if (user.password !== password) return res.status(400).json({ message: "Wrong password!" });
        res.status(200).json({ success: true, message: `You have successfully signed in ${username}!`, user });
    } catch (error) {
        res.status(500).json({ message: "Error during sign-in!" });
    }
});
app.get("/user", async (req, res) => {
    const { username } = req.query;

    try {
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(404).json({ message: "User not found!" });
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: "Error fetching user details!" });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});