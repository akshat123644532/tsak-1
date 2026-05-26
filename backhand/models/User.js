const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    user: String,
    email: String
});

module.exports = mongoose.model("User", userSchema);