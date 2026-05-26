const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
const port = 5050;

const authRoutes = require("./routes/authRoutes");
const connectDB = require("./config/db");

app.use(cors());
app.use(express.json());

connectDB();

app.get("/", (req, res) => {
    res.send("server is working");
});

app.use("/api/auth", authRoutes);

app.listen(port, () => {
    console.log(`server running on localhost:${port}`);
});