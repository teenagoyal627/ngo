const mongoose=require('mongoose')
require("dotenv").config()
const connectDB =async () => {
    try{
        // %40=@
       await mongoose.connect(process.env.MONGO_URI)
        console.log("Mongodb connected")
    } catch(error){
        console.log("Error is present when establishing the database", error)

    }
}
  
module.exports=connectDB;