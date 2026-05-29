const path = require("path");
const Leave = require(path.join(__dirname, "../models/Leave")); 
const User = require(path.join(__dirname, "../models/User"));

exports.getAllLeaves = async (req, res) => {
    try {
        const leaves = await Leave.find().populate("userId", "name email"); 
        res.status(200).json(leaves);
    } catch (error) {
        console.error(" ADMIN FETCH ERROR:", error);
        res.status(500).json({ message: "Server error while fetching leaves" });
    }
};

exports.updateLeaveStatus = async (req, res) => {
    try {
        const { leaveId } = req.params;
        const { status } = req.body;

        const updatedLeave = await Leave.findByIdAndUpdate(
            leaveId,
            { status },
            { new: true }
        );
        
        if (!updatedLeave) {
            return res.status(404).json({ message: "Leave record not found" });
        }

        res.status(200).json(updatedLeave);
    } catch (error) {
        console.error(" ADMIN UPDATE ERROR:", error);
        res.status(500).json({ message: "Update failed" });
    }
};