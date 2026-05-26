const express = require("express");
const  app = express();
const port = 5050;
app.get("/",(req,res)=>{
    res.send("server is working");
});
app.listen(port,()=>{
    console.log(`server is running on locolhost at  ${port}`);
});
