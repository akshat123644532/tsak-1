const express = require("express");
const router = express.Router();
const adminController = require("../controllers/adminController");

router.get("/leaves", adminController.getAllLeaves);
router.put("/leave/:leaveId", adminController.updateLeaveStatus);

module.exports = router;