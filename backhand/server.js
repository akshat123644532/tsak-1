const express = require("express");
const mongoose = require("mongoose");
const app = express();
const port = 5050;

const cors = require("cors");

const User = require("./models/User");
const connectDB = require("./config/db");

app.use(cors());
app.use(express.json());
connectDB();
app.get("/",(req,res)=>{
    res.send("server is working");
});
app.get("/register", async (req, res) => {
    const { name, email, password } = req.body;
    if(!name||!email||!password){
        return res.send("all field are required")
    }
    const user = await User.create({

        name,
        email,
        password
    });

    res.send(user);
});
app.post("/login", async (req, res) => {

    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
        return res.send("User not found");
    }

    if (user.password !== password) {
        return res.send("Wrong password");
    }

    res.send("Login successful");

});
app.listen(port,()=>{
    console.log(`server is running on locolhost at  ${port}`);
});
