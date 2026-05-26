const express = require("express");
const mongoose = require("mongoose");
const app = express();
const port = 5050;
const jwt = require("jsonwebtoken");
const bycypt = require("bcryptjs");

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
    };
    const hashedPassword = await bycypt.hash(password,10);
    const user = await User.create({

        name,
        email,
        password:hashedPassword
    });

    res.send(user);
});
app.post("/login", async (req, res) => {

    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
        return res.send("User not found");
    }

    const isMtach = await bycypt.compare(password,user.password);
    if(!isMtach){
        return res.send("wrong password");
    }
   const token = jwt.sign(
        { id: user._id },
        "secretkey",
        { expiresIn: "1h" }
    );

    res.send({
        message: "Login successful",
        token
    });

});
app.listen(port,()=>{
    console.log(`server is running on locolhost at  ${port}`);
});
