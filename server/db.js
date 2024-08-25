const mongoose=require('mongoose')

const connectDB =async () => {
    try{
        const MONGO_URI="mongodb+srv://sapnango346:sapna_ngo%40123@sapnangocluster.70vvt.mongodb.net/NgoPatients?retryWrites=true&w=majority&appName=SapnaNgoCluster"
       await mongoose.connect( MONGO_URI)
        console.log("Mongodb connected")
    } catch(error){
        console.log("Error is present when establishing the database", err)

    }
}
  
module.exports=connectDB;