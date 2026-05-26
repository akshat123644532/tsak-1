const mongoose = require("mongoose");
const connectDB = async()=>{
try{
await mongoose.connect("mongodb://127.0.0.1:27017/task1")
console.log("mongodb connected and working");
}catch(error){
    console.log(error);
}
};
module.exports = connectDB;
