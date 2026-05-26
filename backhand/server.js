const express = require("express");
const mongoose = require("mongoose");
const  app = express();
const port = 5050;
const cors = require("cors");

const User = require("./models/User.js");
mongoose.connect("mongodb://127.0.0.1:27017/task1")
.then(() => console.log("MongoDB Connected"))
.catch((err) => console.log(err));

app.use(cors());
app.use(express.json());
app.get("/",(req,res)=>{
    res.send("server is working");
});
app.get("/create", async (req, res) => {

    const user = await User.create({
        user: "akshat",
        email: "solanki@gmail.com"
    });

    res.send(user);
});
app.listen(port,()=>{
    console.log(`server is running on locolhost at  ${port}`);
});
