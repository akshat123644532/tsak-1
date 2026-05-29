const mongoose = require("mongoose");

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Local MongoDB Connected Successfully!");
    } catch (error) {
        console.error("DB CONNECTION ERROR:", error);
    }
};

module.exports = connectDB;
