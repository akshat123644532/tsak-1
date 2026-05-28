const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../models/User");
const Leave = require("../models/Leave");
const authMiddleware = require("../middleware/authMiddleware");

router.post("/register", async (req, res) => {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }

       
        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ message: "User already registered" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            name,
            email,
            password: hashedPassword
        });

        res.status(201).json({ message: "Registration successful", user });
    } catch (error) {
        res.status(500).json({ message: "Server error during registration" });
    }
});

router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({ message: "User not found" });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).json({ message: "Wrong password" });
        }

        const token = jwt.sign(
            { id: user._id },
            "secretkey", 
            { expiresIn: "1h" }
        );

        res.json({
            message: "Login successful",
            token
        });
    } catch (error) {
        res.status(500).json({ message: "Server error during login" });
    }
});
router.post("/leave/apply", authMiddleware, async (req, res) => {
    try {
        const { leaveType, startDate, endDate, reason } = req.body;

        if (!leaveType || !startDate || !endDate || !reason) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const newLeave = await Leave.create({
            userId: req.user.id, 
            leaveType,
            startDate,
            endDate,
            reason
        });

        res.status(201).json({ message: "Leave applied successfully", leave: newLeave });
    } catch (error) {
        res.status(500).json({ message: "Server error during leave application" });
    }
});
router.get("/home/my-leaves", authMiddleware, async (req, res) => {
    try {
        const myLeaves = await Leave.find({ userId: req.user.id }).sort({ createdAt: -1 });
        res.json({ leaves: myLeaves });
    } catch (error) {
        res.status(500).json({ message: "Server error fetching leaves" });
    }
});
module.exports = router;